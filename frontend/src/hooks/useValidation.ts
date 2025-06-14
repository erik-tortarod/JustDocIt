import { API_ROUTES } from "@/config/api-routes";

class useValidation {
	#jwtToken: string;

	constructor() {
		this.#jwtToken = localStorage.getItem("jwtToken") || "";
	}

	async validateToken() {
		if (!this.#jwtToken) {
			return false;
		}

		try {
			const response = await fetch(
				`${API_ROUTES.AUTH.VALIDATE}?token=${this.#jwtToken}`,
				{
					method: "GET",
				},
			);

			if (!response.ok) {
				return false;
			}

			const result = await response.json();
			return !result.isExpired; // Return true if token is valid, false if expired
		} catch (error) {
			console.error("Error validating token:", error);
			return false;
		}
	}
}

export default useValidation;
