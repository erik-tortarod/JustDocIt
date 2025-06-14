//DEPENDENCIES
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//PAGES
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Documentation from "./pages/Documentation/Documentation";
import Admin from "./pages/Admin/Admin";
import User from "./pages/User/User";
import ProyectDocumentation from "./pages/ProyectDocumentation/ProyectDocumentation";
import LiveDocumentation from "./pages/LiveDocumentation/LiveDocumentation";
import { useEffect } from "react";

const queryClient = new QueryClient();

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
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-right" />
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route
					path="/documentation/:id/:language"
					element={<Documentation />}
				/>
				<Route path="/proyect_docs" element={<ProyectDocumentation />} />
				<Route path="/live_docs" element={<LiveDocumentation />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
