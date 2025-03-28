import { API_ROUTES } from "../../config/api-routes";

function Auth() {
   const userLogin = () => {
      window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
   };

   return (
      <div>
         <button onClick={userLogin} className="btn btn-primary">
            Login
         </button>
      </div>
   );
}

export default Auth;
