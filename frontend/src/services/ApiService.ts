//ROUTES
import { API_ROUTES } from "../config/api-routes";

//SERVICES
import StorageService from "./StorageService";

/**
 * Servicio para manejar todas las comunicaciones con la API del backend.
 * Proporciona métodos para gestionar autenticación y obtención de datos.
 */
class ApiService {

	/**
	 * Obtiene un token JWT desde el servidor utilizando las credenciales del usuario.
	 * 
	 * @param userId - ID único del usuario en GitHub
	 * @param accessToken - Token de acceso proporcionado por GitHub OAuth
	 * @returns Una promesa que resuelve al token JWT generado por el servidor
	 * @throws Error si la solicitud falla
	 */
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

	/**
	 * Obtiene los datos del usuario autenticado desde el servidor.
	 * Requiere que el token JWT esté almacenado.
	 * 
	 * @returns Una promesa que resuelve a los datos del usuario
	 * @throws Error si no hay token o si la solicitud falla
	 */
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
