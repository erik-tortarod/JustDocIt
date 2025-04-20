import { API_ROUTES } from "../config/api-routes";
import ApiService from "./ApiService";
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
		try {
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
               Error scanning the repositorie by language ${response.status}	
            `);
			}

			return await response.json();
		} catch (error) {
			await ApiService.getTokenFromCredentials(
				StorageService.getUserId()!,
				StorageService.getAccessToken()!,
			);
			this.scanRepositoryByLanguage(language, repositoryId);
		}
	}

	/**
	 * Retrieves documentation for a specific repository and language.
	 * @param id - The ID of the repository.
	 * @param language - The programming language of the documentation.
	 * @returns A promise resolving to the documentation data.
	 */
	static async getRepository(id: string, language: string): Promise<any> {
		try {
			const url =
				API_ROUTES.DOCS.GET_DOCUMENTATION +
				`?repositoryId=${id}&language=${language.toUpperCase()}`;

			const response = await fetch(url, {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error(`
               Error getting the repositorie ${response.status}	
            `);
			}

			return await response.json();
		} catch (error) {
			await ApiService.getTokenFromCredentials(
				StorageService.getUserId()!,
				StorageService.getAccessToken()!,
			);
			return this.getRepository(id, language);
		}
	}
}

export default DocumentationService;
