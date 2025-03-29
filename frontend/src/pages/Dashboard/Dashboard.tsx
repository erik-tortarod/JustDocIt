//DEPENDECIES
import { useState, useEffect } from "react";

//SERVICES
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import StorageService from "../../services/StorageService";

function Dashboard() {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [userData, setUserData] = useState<any>(null);

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

		initializeDashboard();
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
			<pre>{JSON.stringify(userData, null, 2)}</pre>
		</div>
	);
}

export default Dashboard;
