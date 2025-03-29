//SERVICES
import ApiService from "./ApiService";
import StorageService from "./StorageService";

class AuthService {
	static async processUrlParams(): Promise<{
		sucess: boolean;
		error?: string;
	}> {
		try {
			//get url params
			const params = new URLSearchParams(window.location.search);
			const userId = params.get("userId");
			const accessToken = params.get("accessToken");

			if (userId && accessToken) {
				const jwtToken = await ApiService.getTokenFromCredentials(
					userId,
					accessToken,
				);

				StorageService.setToken(jwtToken);

				window.history.replaceState({}, document.title, "/dashboard");

				return { sucess: true };
			}

			//no url params
			const savedToken = StorageService.getToken();
			if (savedToken) {
				return { sucess: true };
			}

			return {
				sucess: false,
				error: `No authentication info available`,
			};
		} catch (error) {
			return {
				sucess: false,
				error: `Error: ${String(error)}`,
			};
		}
	}

	static isAuthenticated(): boolean {
		return StorageService.getToken() !== null;
	}

	static logout(): void {
		StorageService.removeToken();
		window.location.href = "/";
	}
}

export default AuthService;
