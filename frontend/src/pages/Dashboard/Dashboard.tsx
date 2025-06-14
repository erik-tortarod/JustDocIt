//DEPENDECIES
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

//SERVICES
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import StorageService from "../../services/StorageService";
import RepositoryService from "../../services/RepositoryService";

//COMPONENTS
import AddedRepositories from "./AddedRepositories";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import DashboardStats from "./DashboardStats";
import RepositoryFilters from "./RepositoryFilters";
import AddRepositoryModal from "./AddRepositoryModal";

//INTERFACES
import { IRepository } from "../../types/interfaces";

//MOCK
import { mockRepositories } from "../../fixtures/mockData";

//ENUMS
import { API_ROUTES, ENVIRONMENT } from "../../config/api-routes";
import { EEnvironment } from "../../types/enums";

//HOOKS
import useValidation from "../../hooks/useValidation";

function Dashboard() {
   const { t } = useTranslation();

   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | undefined>(undefined);
   const [userData, setUserData] = useState<any>(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedRepository, setSelectedRepository] =
      useState<IRepository | null>(null);
   const [branch, setBranch] = useState<string>("");
   const [directory, setDirectory] = useState<string>("/");
   const [isAddingRepo, setIsAddingRepo] = useState<boolean>(false);
   const [showAddModal, setShowAddModal] = useState<boolean>(false);
   const [userVisits, setUserVisits] = useState<number>(0);
   const [filteredRepositories, setFilteredRepositories] = useState<
      IRepository[]
   >([]);

   const environment = ENVIRONMENT;

   // Query para los repositorios añadidos
   const { data: addedRepositories = [], refetch: refreshAddedRepositories } =
      useQuery({
         queryKey: ["addedRepositories"],
         queryFn: async () => {
            const repositories = await RepositoryService.getAddedRepositories();
            if (environment === EEnvironment.DEV) {
               return [...repositories, ...mockRepositories];
            }
            return repositories;
         },
         staleTime: 1000 * 60 * 5, // 5 minutos
      });

   // Query para los repositorios del usuario
   const { data: userRepositories = [] } = useQuery({
      queryKey: ["userRepositories"],
      queryFn: () => RepositoryService.getUserRepositories(),
      staleTime: 1000 * 60 * 5, // 5 minutos
   });

   // Actualizar filteredRepositories cuando cambien addedRepositories
   useEffect(() => {
      setFilteredRepositories(addedRepositories);
   }, [addedRepositories]);

   const handleAddRepository = async () => {
      if (!selectedRepository || !branch) {
         toast.error(
            "Por favor selecciona un repositorio y especifica una rama."
         );
         return;
      }

      setIsAddingRepo(true);
      try {
         await RepositoryService.addRepository(selectedRepository.id, branch);
         toast.success("Repositorio agregado correctamente.");
         setSelectedRepository(null);
         setBranch("");
         setDirectory("/");
         setShowAddModal(false);
         await refreshAddedRepositories();
      } catch (error) {
         toast.error(
            error instanceof Error
               ? error.message
               : "Error al agregar el repositorio."
         );
      } finally {
         setIsAddingRepo(false);
      }
   };

   const handleCloseModal = () => {
      setShowAddModal(false);
      setSelectedRepository(null);
      setBranch("");
      setDirectory("/");
   };

   useEffect(() => {
      const initializeDashboard = async () => {
         try {
            const authResult = await AuthService.processUrlParams();

            if (!authResult.sucess) {
               window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
               return;
            }

            if (!StorageService.getToken()) {
               window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
               return;
            }

            const validation = new useValidation();
            const isValid = await validation.validateToken();

            if (!isValid) {
               window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
               return;
            }

            const userData = await ApiService.getUserData();
            setUserData(userData);
            localStorage.setItem("userData", JSON.stringify(userData));

            const url = API_ROUTES.DOCS.USER_VISITS.replace(
               "**user_id**",
               userData.id
            );
            const response = await fetch(url);
            const visitsData = await response.json();
            setUserVisits(visitsData);
         } catch (error) {
            console.error(`Error: ${error}`);
            window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
         } finally {
            setLoading(false);
         }
      };

      initializeDashboard();
   }, []);

   if (loading) {
      return (
         <motion.div
            className="flex justify-center items-center h-screen w-screen flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
         >
            <motion.h1
               initial={{ y: -20 }}
               animate={{ y: 0 }}
               transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
               }}
            >
               Wait a moment...
            </motion.h1>
            <span className="loading loading-infinity w-50"></span>
         </motion.div>
      );
   }

   if (error) {
      return (
         <motion.div
            className="flex justify-center items-center h-screen w-screen flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
         >
            <motion.h1
               initial={{ y: -20 }}
               animate={{ y: 0 }}
               transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
               }}
            >
               {error}
            </motion.h1>
         </motion.div>
      );
   }

   return (
      <motion.div
         className="flex w-screen"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
      >
         <Sidebar userData={userData} />
         <motion.div
            className="flex-1 transition-all duration-300 ease-in-out pl-16 md:pl-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
         >
            <div className="px-8 pt-8">
               <motion.section
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
               >
                  <motion.h1
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.5, delay: 0.4 }}
                  >
                     {t("dashboard.title")}
                  </motion.h1>
                  <motion.button
                     onClick={() => setShowAddModal(true)}
                     className="px-4 py-2 btn btn-info"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     {t("dashboard.addNewProject")}
                  </motion.button>
               </motion.section>

               <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
               >
                  <DashboardStats
                     amount={addedRepositories.length}
                     stat={t("dashboard.projectsInDocumentation")}
                     title={t("dashboard.projectList")}
                  />
                  <DashboardStats
                     amount={userVisits}
                     stat={t("dashboard.totalViews")}
                     title={t("dashboard.views")}
                  />
               </motion.div>

               <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
               >
                  <motion.h2
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.7 }}
                  >
                     {t("dashboard.projectList")}
                  </motion.h2>
                  <RepositoryFilters
                     repositories={addedRepositories}
                     onFilterChange={setFilteredRepositories}
                     onSearchChange={setSearchTerm}
                  />
                  <AnimatePresence mode="wait">
                     {filteredRepositories.length > 0 ? (
                        <motion.div
                           key="repositories"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.3 }}
                        >
                           <AddedRepositories
                              addedRepositories={filteredRepositories}
                              refreshRepositories={refreshAddedRepositories}
                              searchTerm={searchTerm}
                           />
                        </motion.div>
                     ) : (
                        <motion.div
                           key="empty"
                           className="flex flex-col justify-center items-center h-full gap-4"
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ duration: 0.3 }}
                        >
                           <h2 className="text-2xl font-bold">
                              {t("dashboard.noActiveProjects")}
                           </h2>
                           <p className="text-gray-500">
                              {t("dashboard.addProjectMessage")}
                           </p>
                           <motion.button
                              onClick={() => setShowAddModal(true)}
                              className="px-4 py-2 btn btn-info"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                           >
                              {t("dashboard.addNewProject")}
                           </motion.button>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.section>

               <AnimatePresence>
                  {showAddModal && (
                     <AddRepositoryModal
                        userRepositories={userRepositories}
                        refreshAddedRepositories={refreshAddedRepositories}
                        selectedRepository={selectedRepository}
                        onSelectRepository={setSelectedRepository}
                        branch={branch}
                        onBranchChange={setBranch}
                        directory={directory}
                        onDirectoryChange={setDirectory}
                        isAddingRepo={isAddingRepo}
                        onAddRepository={handleAddRepository}
                        onClose={handleCloseModal}
                     />
                  )}
               </AnimatePresence>
            </div>
         </motion.div>
      </motion.div>
   );
}

export default Dashboard;
