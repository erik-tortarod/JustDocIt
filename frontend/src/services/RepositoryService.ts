import { API_ROUTES } from "../config/api-routes";
import StorageService from "./StorageService";

class RepositoryService {
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
}

export default RepositoryService;
