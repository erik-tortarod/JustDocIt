import { API_ROUTES } from "../config/api-routes";
import StorageService from "./StorageService";

class ActivityService {
	static async postActivity(data: {
		description: string;
		category: string;
	}) {
		try {
			const url = API_ROUTES.DOCS.ACTIVITIES;
			const token = StorageService.getToken();

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	static async getActivities() {
		try {
			const url = API_ROUTES.DOCS.ACTIVITIES;
			const token = StorageService.getToken();

			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			console.log(data);
			return data;
		} catch (e) {
			console.error(e);
			return [];
		}
	}
}

export default ActivityService;
