//DEPENDECIES
import { useState, useEffect } from "react";

//SERVICES
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";
import StorageService from "../../services/StorageService";
import RepositoryService from "../../services/RepositoryService";

//COMPONENTS
import AddedRepositories from "./AddedRepositories";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import DashboardStats from "./DashboardStats";
import RepositoryFilters from "./RepositoryFilters";
import AddRepositoryModal from "./AddRepositoryModal";

//INTERFACES
import { IRepository } from "../../types/interfaces";

//MOCK
import { mockRepositories } from "../../fixtures/mockData";

//ENUMS
import { API_ROUTES, ENVIRONMENT } from "../../config/api-routes";
import { EEnvironment } from "../../types/enums";

//HOOKS
import useValidation from "../../hooks/useValidation";

function Dashboard() {
	useEffect(() => {
		const checkValidation = async () => {
			const validation = new useValidation();
			const isExpired = await validation.validateToken();

			if (isExpired) {
				window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
			}
		};

		checkValidation();
	}, []);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [userData, setUserData] = useState<any>(null);
	const [userRepositories, setUserRepositores] = useState<IRepository[]>([]);
	const [addedRepositories, setAddedRepositories] = useState<IRepository[]>([]);
	const [filteredRepositories, setFilteredRepositories] = useState<
		IRepository[]
	>([]);
	const [selectedRepository, setSelectedRepository] =
		useState<IRepository | null>(null);
	const [branch, setBranch] = useState<string>("");
	const [directory, setDirectory] = useState<string>("/");
	const [isAddingRepo, setIsAddingRepo] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);

	const environment = ENVIRONMENT;

	const refreshAddedRepositories = async () => {
		try {
			const repositories = await RepositoryService.getAddedRepositories();
			const repos = repositories;

			if (environment === EEnvironment.DEV) {
				repos.push(...mockRepositories);
			}

			setAddedRepositories(repos);
			setFilteredRepositories(repos);
		} catch (error) {
			console.error("Error refreshing added repositories:", error);
		}
	};

	const handleAddRepository = async () => {
		if (!selectedRepository || !branch) {
			alert("Por favor selecciona un repositorio y especifica una rama.");
			return;
		}

		setIsAddingRepo(true);
		try {
			await RepositoryService.addRepository(selectedRepository.id, branch);
			alert("Repositorio agregado correctamente.");
			setSelectedRepository(null);
			setBranch("");
			setDirectory("/");
			setShowAddModal(false);
			await refreshAddedRepositories();
		} catch (error) {
			alert("Error al agregar el repositorio.");
		} finally {
			setIsAddingRepo(false);
		}
	};

	const handleCloseModal = () => {
		setShowAddModal(false);
		setSelectedRepository(null);
		setBranch("");
		setDirectory("/");
	};

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
				localStorage.setItem("userData", JSON.stringify(userData));
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

		initializeDashboard()
			.then(() => getUserRepositories())
			.then(() => refreshAddedRepositories());
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
		<div className="flex w-screen">
			<Sidebar userData={userData} />
			<div className="flex-1 transition-all duration-300 ease-in-out">
				<div className="px-8 pt-8">
					<section className="flex justify-between items-center">
						<h1>Dashboard</h1>
						<button
							onClick={() => setShowAddModal(true)}
							className="px-4 py-2 btn btn-info"
						>
							Agregar proyecto nuevo
						</button>
					</section>
					<div className="grid grid-cols-3 gap-6 py-8">
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
						<RepositoryFilters
							repositories={addedRepositories}
							onFilterChange={setFilteredRepositories}
						/>
						<AddedRepositories addedRepositories={filteredRepositories} />
					</section>

					{/* Modal de selección de repositorio */}
					{showAddModal && (
						<AddRepositoryModal
							userRepositories={userRepositories}
							refreshAddedRepositories={refreshAddedRepositories}
							selectedRepository={selectedRepository}
							onSelectRepository={setSelectedRepository}
							branch={branch}
							onBranchChange={setBranch}
							directory={directory}
							onDirectoryChange={setDirectory}
							isAddingRepo={isAddingRepo}
							onAddRepository={handleAddRepository}
							onClose={handleCloseModal}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
