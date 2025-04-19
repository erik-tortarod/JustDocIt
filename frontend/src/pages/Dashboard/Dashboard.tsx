//DEPENDECIES
import { useState, useEffect } from "react";

//SERVICES
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import StorageService from "../../services/StorageService";
import RepositoryService from "../../services/RepositoryService";

//COMPONENTS
import RepositorieList from "./RepositorieList";
import AddedRepositories from "./AddedRepositories";
import ModalBtn from "../../components/common/ModalBtn";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import DashboardStats from "./DashboardStats";

//INTERFACES
import { IRepository } from "../../types/interfaces";
import { EEnvironment } from "../../types/enums";

//MOCK
import { mockRepositories } from "../../fixtures/mockData";

function Dashboard() {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [userData, setUserData] = useState<any>(null);
	const [userRepositories, setUserRepositores] = useState<IRepository[]>([]);
	const [addedRepositories, setAddedRepositories] = useState<IRepository[]>([]);

	const environment: EEnvironment = import.meta.env.VITE_ENVIROMENT;

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

		const getAddedRepositories = async () => {
			const repositories = await RepositoryService.getAddedRepositories();
			setAddedRepositories(repositories);
			if (environment === EEnvironment.DEV) {
				setAddedRepositories((prev) => [...prev, ...mockRepositories]);
			}
		};

		initializeDashboard()
			.then(() => getUserRepositories())
			.then(() => getAddedRepositories());

		// Configurar actualización automática de addedRepositories
		const intervalId = setInterval(() => {
			getAddedRepositories();
		}, 10000); // Actualizar cada 10 segundos

		return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
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
		<div className="grid grid-cols-5 w-screen">
			<Sidebar />
			<div className="col-start-2 col-span-4 ps-16 pt-8 pe-8">
				<section className="flex justify-between items-center">
					<h1>Dashboard</h1>
					<ModalBtn
						btnText="Agregar proyecto nuevo"
						content={<RepositorieList userRepositories={userRepositories} />}
						id="modal"
						title="Selecciona un repositorio"
					/>
				</section>
				<div className="grid grid-cols-3 gap-6 pe-8 py-8">
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
				</div>
				<section>
					<h2>Lista de Proyectos</h2>
					<AddedRepositories addedRepositories={addedRepositories} />
				</section>
			</div>
		</div>
	);
}

export default Dashboard;
