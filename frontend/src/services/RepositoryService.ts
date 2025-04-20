import { API_ROUTES } from "../config/api-routes";
import ApiService from "./ApiService";
import StorageService from "./StorageService";

/**
 * Servicio para gestionar las operaciones relacionadas con repositorios de GitHub.
 * Proporciona métodos para obtener y manipular información de repositorios.
 */
class RepositoryService {
	/**
	 * Obtiene la lista de repositorios del usuario autenticado.
	 * Requiere que el token JWT esté almacenado.
	 *
	 * @returns Una promesa que resuelve a la lista de repositorios del usuario
	 * @throws Error si no hay token o si la solicitud falla
	 */
	static async getUserRepositories(): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const response = await fetch(API_ROUTES.DOCS.REPOSITORIES, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Error fetching the user repositories ${response.status}`,
			);
		}

		return await response.json();
	}

	static async addRepository(githubRepoId: number): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const response = await fetch(API_ROUTES.DOCS.ADD_REPOSITORY, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				githubRepoId: String(githubRepoId),
			}),
		});

		if (!response.ok) {
			throw new Error(`
				Error adding the repository to the dashboard ${response.status}	
			`);
		}

		return await response.json();
	}

	static async getAddedRepositories(): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const response = await fetch(API_ROUTES.DOCS.LIST_REPOSITORIES, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`
				Error listing the user added repositories	
			`);
		}

		return await response.json();
	}
}

export default RepositoryService;
