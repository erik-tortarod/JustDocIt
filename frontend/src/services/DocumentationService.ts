import { API_ROUTES } from "../config/api-routes";
import StorageService from "./StorageService";

/**
 * Service for handling documentation-related operations.
 */
class DocumentationService {
	/**
	 * Scans a repository for documentation by language.
	 * @param language - The programming language to scan for.
	 * @param repositoryId - The ID of the repository to scan.
	 * @param branch - Optional branch name to scan.
	 * @returns A promise resolving to the scan result.
	 */
	static async scanRepositoryByLanguage(
		language: string,
		repositoryId: string,
		branch?: string,
	): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const url = new URL(API_ROUTES.DOCS.SCAN_REPOSITORY);
		url.searchParams.append("repositoryId", repositoryId);
		url.searchParams.append("language", language);
		if (branch) {
			url.searchParams.append("branch", branch);
		}

		const response = await fetch(url.toString(), {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Error scanning the repository by language ${response.status}`,
			);
		}

		return await response.json();
	}

	/**
	 * Retrieves documentation for a specific repository and language.
	 * @param id - The ID of the repository.
	 * @param language - The programming language of the documentation.
	 * @returns A promise resolving to the documentation data.
	 */
	static async getRepository(id: string, language: string): Promise<any> {
		const url = new URL(API_ROUTES.DOCS.GET_DOCUMENTATION);
		url.searchParams.append("repositoryId", id);
		url.searchParams.append("language", language.toUpperCase());

		const response = await fetch(url.toString(), {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error(
				`Error getting the repository documentation ${response.status}`,
			);
		}

		return await response.json();
	}

	/**
	 * Retrieves documentation for a specific file in a repository.
	 * @param repositoryId - The ID of the repository.
	 * @param filePath - The path of the file in the repository.
	 * @returns A promise resolving to the file documentation data.
	 */
	static async getFileDocumentation(
		repositoryId: string,
		filePath: string,
	): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const url = new URL(API_ROUTES.DOCS.GET_FILE_DOCUMENTATION);
		url.searchParams.append("repositoryId", repositoryId);
		url.searchParams.append("filePath", filePath);

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Error getting the file documentation ${response.status}`,
			);
		}

		return await response.json();
	}
}

export default DocumentationService;
