//ROUTES
import { API_ROUTES } from "../config/api-routes";

//SERVICES
import StorageService from "./StorageService";

class ApiService {
	static async getTokenFromCredentials(
		userId: string,
		accessToken: string,
	): Promise<string> {
		const response = await fetch(API_ROUTES.AUTH.TOKEN, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				id: userId,
				accessToken: accessToken,
			}),
		});

		if (!response.ok) {
			throw new Error(`Error fetching the token ${response.status}`);
		}

		return await response.text();
	}

	static async getUserData(): Promise<any> {
		const token = StorageService.getToken();

		if (!token) {
			throw new Error(`No authentication token`);
		}

		const response = await fetch(API_ROUTES.AUTH.USER, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching the user data ${response.status}`);
		}

		return await response.json();
	}
}

export default ApiService;
