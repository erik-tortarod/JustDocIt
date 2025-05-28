//DEPENDENCIES
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//PAGES
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Documentation from "./pages/Documentation/Documentation";
import Admin from "./pages/Admin/Admin";
import User from "./pages/User/User";
import ProyectDocumentation from "./pages/ProyectDocumentation/ProyectDocumentation";
import { useEffect } from "react";

function App() {
	useEffect(() => {
		const checkTheme = () => {
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme) {
				document.documentElement.setAttribute("data-theme", savedTheme);
			} else {
				const defaultTheme = "light";
				localStorage.setItem("theme", defaultTheme);
				document.documentElement.setAttribute("data-theme", defaultTheme);
			}
		};
		checkTheme();
	}, []);

	return (
		<>
			<Toaster position="top-right" />
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route
					path="/documentation/:id/:language"
					element={<Documentation />}
				/>
				<Route path="/proyect_docs" element={<ProyectDocumentation />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</>
	);
}

export default App;
