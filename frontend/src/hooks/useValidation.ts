import { API_ROUTES } from "@/config/api-routes";

class useValidation {
	#jwtToken: string;

	constructor() {
		this.#jwtToken = localStorage.getItem("jwtToken") || "";
	}

	async validateToken() {
		if (!this.#jwtToken) {
			return true;
		}

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

		return result.isExpired;
	}
}

export default useValidation;
