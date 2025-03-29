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

			if (!userId || !accessToken) {
				return {
					sucess: false,
					error: `Some params are missing`,
				};
			}

			const jwtToken = await ApiService.getTokenFromCredentials(
				userId,
				accessToken,
			);

			StorageService.setToken(jwtToken);

			window.history.replaceState({}, document.title, "/dashboard");

			return { sucess: true };
		} catch (error) {
			return {
				sucess: false,
				error: `Error: ${String(error)}`,
			};
		}
	}

	static logout(): void {
		StorageService.removeToken();
		window.location.href = "/";
	}
}

export default AuthService;
