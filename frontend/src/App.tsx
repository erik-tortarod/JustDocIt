//DEPENDENCIES
import { Route, Routes } from "react-router-dom";

//PAGES
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Documentation from "./pages/Documentation/Documentation";
import Admin from "./pages/Admin/Admin";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/documentation/:id/:language" element={<Documentation />} />
			<Route path="/notfound/:id" element={<NotFound />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
	);
}

export default App;
