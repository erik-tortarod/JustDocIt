//DEPENDENCIES
import { Route, Routes } from "react-router-dom";

//PAGES
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/notfound" element={<NotFound />} />
		</Routes>
	);
}

export default App;
