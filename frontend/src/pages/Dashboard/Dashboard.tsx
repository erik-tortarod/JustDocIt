//DEPENDECIES
import { useState, useEffect } from "react";

//SERVICES
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import StorageService from "../../services/StorageService";
import RepositoryService from "../../services/RepositoryService";

function Dashboard() {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | undefined>(undefined);
   const [userData, setUserData] = useState<any>(null);
   const [userRepositories, setUserRepositores] = useState<any>();

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

      initializeDashboard().then(() => getUserRepositories());
   }, []);

   if (loading) {
      return <div>Cargando ...</div>;
   }

   if (error) {
      return (
         <div>
            <h1>Error</h1>
            <button>Volver al login</button>
         </div>
      );
   }

   return (
      <div>
         <h1>Dashboard</h1>
         <section>
            <h2>Datos del Usuario</h2>
            <ul>
               <li>
                  <img src={userData.avatarUrl} alt="" />
               </li>
               <li>
                  <strong>Email:</strong> {userData?.email}
               </li>
               <li>
                  <strong>Username:</strong> {userData?.username}
               </li>
            </ul>
         </section>
         <section>
            <h2>Repositorios</h2>
            <ul>
               {userRepositories?.map((repo: any) => (
                  <li key={repo.id}>
                     <p>
                        <strong>{repo.name}</strong> -{" "}
                        {repo.description || "Sin descripción"}
                        {repo.private && "🔒"}
                     </p>
                  </li>
               ))}
            </ul>
         </section>
      </div>
   );
}

export default Dashboard;
