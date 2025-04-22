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
	 * @returns A promise resolving to the scan result.
	 */
	static async scanRepositoryByLanguage(
		language: string,
		repositoryId: string,
	): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const url =
			API_ROUTES.DOCS.SCAN_REPOSITORIE_BY_LANGUAGE +
			`?repositoryId=${repositoryId}&language=${language}`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`
               Error scanning the repository by language ${response.status}	
            `);
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
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const url =
			API_ROUTES.DOCS.GET_DOCUMENTATION +
			`?repositoryId=${id}&language=${language.toUpperCase()}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`
               Error getting the repository ${response.status}	
            `);
		}

		return await response.json();
	}
}

export default DocumentationService;
