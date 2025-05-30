//DEPENDECIES
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
	useEffect(() => {
		const checkValidation = async () => {
			const validation = new useValidation();
			const isExpired = await validation.validateToken();

			if (isExpired) {
				window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
			}
		};

		checkValidation();
	}, []);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [userData, setUserData] = useState<any>(null);
	const [userRepositories, setUserRepositores] = useState<IRepository[]>([]);
	const [addedRepositories, setAddedRepositories] = useState<IRepository[]>([]);
	const [filteredRepositories, setFilteredRepositories] = useState<
		IRepository[]
	>([]);
	const [selectedRepository, setSelectedRepository] =
		useState<IRepository | null>(null);
	const [branch, setBranch] = useState<string>("");
	const [directory, setDirectory] = useState<string>("/");
	const [isAddingRepo, setIsAddingRepo] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);

	const environment = ENVIRONMENT;

	const refreshAddedRepositories = async () => {
		try {
			const repositories = await RepositoryService.getAddedRepositories();
			const repos = repositories;

			if (environment === EEnvironment.DEV) {
				repos.push(...mockRepositories);
			}

			setAddedRepositories(repos);
			setFilteredRepositories(repos);
		} catch (error) {
			console.error("Error refreshing added repositories:", error);
		}
	};

	const handleAddRepository = async () => {
		if (!selectedRepository || !branch) {
			toast.error("Por favor selecciona un repositorio y especifica una rama.");
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
					: "Error al agregar el repositorio.",
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
				if (!StorageService.getToken() && !window.location.search) {
					setError("You have not logged in yet");
					setLoading(false);
					return;
				}

				const authResult = await AuthService.processUrlParams();

				if (!authResult.sucess) {
					setError(authResult.error);
					setLoading(false);
					return;
				}

				const userData = await ApiService.getUserData();
				setUserData(userData);
				localStorage.setItem("userData", JSON.stringify(userData));
			} catch (error) {
				console.error(`Error: ${error}`);
				setError(`Error : ${error}`);
			} finally {
				setLoading(false);
			}
		};

		const getUserRepositories = async () => {
			const repositories = await RepositoryService.getUserRepositories();
			setUserRepositores(repositories);
		};

		initializeDashboard()
			.then(() => getUserRepositories())
			.then(() => refreshAddedRepositories());
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
					Wait a moment...
				</motion.h1>
				<span className="loading loading-infinity w-50"></span>
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
							Dashboard
						</motion.h1>
						<motion.button
							onClick={() => setShowAddModal(true)}
							className="px-4 py-2 btn btn-info"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Agregar proyecto nuevo
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
							stat={`↑ ${addedRepositories.length} repositorios desde el último mes`}
							title="Proyectos Activos"
						/>
						<DashboardStats
							amount={0}
							stat="Pendiente de implementación"
							title="Visitas totales"
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
							Lista de Proyectos
						</motion.h2>
						<RepositoryFilters
							repositories={addedRepositories}
							onFilterChange={setFilteredRepositories}
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
										No hay proyectos activos
									</h2>
									<p className="text-gray-500">
										Agrega un proyecto nuevo para empezar a trabajar.
									</p>
									<motion.button
										onClick={() => setShowAddModal(true)}
										className="px-4 py-2 btn btn-info"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										Agregar proyecto nuevo
									</motion.button>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.section>

					{/* Modal de selección de repositorio */}
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
