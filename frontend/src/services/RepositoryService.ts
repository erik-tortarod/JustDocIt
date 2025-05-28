import { API_ROUTES } from "../config/api-routes";
import StorageService from "./StorageService";

/**
 * Service for managing GitHub repository operations.
 * Provides methods for fetching and manipulating repository information.
 */
class RepositoryService {
	/**
	 * Gets the list of user's GitHub repositories.
	 * Requires JWT token to be stored.
	 *
	 * @returns A promise resolving to the list of user's repositories
	 * @throws Error if no token or if request fails
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

	/**
	 * Adds a repository to the user's dashboard.
	 * @param githubRepoId - The GitHub repository ID.
	 * @param branch - The branch to track.
	 * @returns A promise resolving to the added repository data.
	 */
	static async addRepository(
		githubRepoId: number,
		branch: string,
	): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const url = new URL(API_ROUTES.DOCS.ADD_REPOSITORY);
		url.searchParams.append("githubRepoId", String(githubRepoId));
		url.searchParams.append("branch", branch);

		const response = await fetch(url.toString(), {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		if (
			!response.ok ||
			data.message === "Repository with this branch already exists"
		) {
			throw new Error(
				data.message ||
					`Error adding the repository to the dashboard ${response.status}`,
			);
		}

		return data;
	}

	/**
	 * Gets the list of repositories added to the user's dashboard.
	 * @returns A promise resolving to the list of added repositories.
	 */
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
			throw new Error(`Error listing the user added repositories`);
		}

		return await response.json();
	}

	/**
	 * Deletes a repository from the user's dashboard.
	 * @param repositoryId - The ID of the repository to delete.
	 */
	static async deleteRepository(repositoryId: number): Promise<void> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const url = new URL(API_ROUTES.DOCS.DELETE_REPOSITORY);
		url.searchParams.append("repositoryId", String(repositoryId));

		const response = await fetch(url.toString(), {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error deleting the repository ${response.status}`);
		}
	}

	/**
	 * Gets a specific repository by its ID.
	 * @param repositoryId - The ID of the repository to fetch.
	 * @returns A promise resolving to the repository data.
	 */
	static async getRepositoryById(repositoryId: number): Promise<any> {
		const url = new URL(API_ROUTES.DOCS.LIST_REPOSITORIES);
		url.searchParams.append("repositoryId", String(repositoryId));

		const response = await fetch(url.toString(), {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error(`Error fetching repository ${response.status}`);
		}

		const repositories = await response.json();
		return repositories.find((repo: any) => repo.id === repositoryId);
	}
}

export default RepositoryService;
