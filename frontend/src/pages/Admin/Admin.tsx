import LdapLoginForm from "./LdapLoginForm";
import AdminContent from "./AdminContent";
import { useState, useEffect } from "react";
import AuthService from "@/services/AuthService";
import StorageService from "@/services/StorageService";
import { API_ROUTES } from "@/config/api-routes";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import { motion } from "framer-motion";

function Admin() {
   const [authenticated, setAuthenticated] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | undefined>(undefined);
   const [userData, setUserData] = useState<any>(null);

   useEffect(() => {
      const initializeAdmin = async () => {
         try {
            // Get user data from localStorage
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
               setUserData(JSON.parse(storedUserData));
            }

            // Verificar autenticación LDAP
            const ldapResponse = await fetch(API_ROUTES.AUTH.LDAP, {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${StorageService.getToken()}`,
               },
            });

            if (!ldapResponse.ok) {
               setAuthenticated(false);
               setLoading(false);
               return;
            }

            const ldapData = await ldapResponse.json();
            if (ldapData.authenticated) {
               setAuthenticated(true);
            } else {
               setAuthenticated(false);
            }
         } catch (error) {
            console.error(`Error: ${error}`);
            setError(`Error : ${error}`);
         } finally {
            setLoading(false);
         }
      };

      initializeAdmin();
   }, []);

   if (loading) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex justify-center items-center">
            <div className="text-center">
               <span className="loading loading-infinity loading-lg text-primary"></span>
               <p className="mt-4 text-lg text-base-content">
                  Loading admin panel...
               </p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex justify-center items-center">
            <div className="bg-base-100 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
               <div className="text-error text-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-12 w-12 mx-auto mb-4"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                     />
                  </svg>
                  <p className="text-xl font-semibold">{error}</p>
               </div>
            </div>
         </div>
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
            <div className="container mx-auto px-4 py-8">
               <div className="max-w-4xl mx-auto">
                  {!authenticated ? (
                     <div className="bg-base-100 rounded-xl shadow-2xl p-8">
                        <div className="text-center mb-8">
                           <h1 className="text-3xl font-bold text-primary mb-2">
                              Admin Panel
                           </h1>
                           <p className="text-base-content/70">
                              Please authenticate to access the admin panel
                           </p>
                        </div>
                        <LdapLoginForm authentication={setAuthenticated} />
                     </div>
                  ) : (
                     <div className="bg-base-100 rounded-xl shadow-2xl p-8">
                        <div className="text-center mb-8">
                           <h1 className="text-3xl font-bold text-primary mb-2">
                              Admin Panel
                           </h1>
                           <p className="text-base-content/70">
                              Welcome to the admin dashboard
                           </p>
                        </div>
                        <AdminContent />
                     </div>
                  )}
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
}

export default Admin;
