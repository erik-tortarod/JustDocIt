//SERVICES
import StorageService from "./StorageService";
import { API_ROUTES } from "../config/api-routes";

/**
 * Servicio para gestionar la autenticación de usuarios.
 * Maneja el flujo de autenticación de OAuth, almacenamiento de tokens y cierre de sesión.
 */
class AuthService {
	/**
	 * Procesa los parámetros de URL tras la redirección desde GitHub OAuth.
	 * Si encuentra parámetros válidos, obtiene un token JWT y lo almacena.
	 * Si no hay parámetros, verifica si existe un token almacenado previamente.
	 *
	 * @returns Objeto que indica si el proceso fue exitoso y un mensaje de error opcional
	 */
	static async processUrlParams(): Promise<{
		sucess: boolean;
		error?: string;
	}> {
		try {
			// Get URL params
			const params = new URLSearchParams(window.location.search);
			const jwtToken = params.get("jwtToken");

			if (jwtToken) {
				StorageService.setToken(jwtToken);
				// Remove query params from the URL without forcing a redirect
				window.history.replaceState(
					{},
					document.title,
					window.location.pathname,
				);
				return { sucess: true };
			}

			// No URL params
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

	/**
	 * Verifica si el usuario está autenticado.
	 *
	 * @returns true si existe un token JWT almacenado, false en caso contrario
	 */
	static isAuthenticated(): boolean {
		return StorageService.getToken() !== null;
	}

	/**
	 * Cierra la sesión del usuario eliminando el token JWT almacenado
	 * y redirigiendo a la página principal.
	 */
	static logout(): void {
		StorageService.removeToken();
		window.location.href = "/";
	}

	/**
	 * Inicia el proceso de autenticación redirigiendo al usuario a la página de login.
	 */
	static login(): void {
		window.location.href = API_ROUTES.AUTH.LOGIN;
	}
}

export default AuthService;
