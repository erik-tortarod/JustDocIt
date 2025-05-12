//DEPENDENCIES
import { Route, Routes } from "react-router-dom";

//PAGES
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Documentation from "./pages/Documentation/Documentation";
import Admin from "./pages/Admin/Admin";
import User from "./pages/User/User";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Auth />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route
            path="/documentation/:id/:language"
            element={<Documentation />}
         />
         <Route path="*" element={<NotFound />} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/user" element={<User />} />
      </Routes>
   );
}

export default App;
