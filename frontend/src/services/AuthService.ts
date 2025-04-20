//SERVICES
import ApiService from "./ApiService";
import StorageService from "./StorageService";

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

				// Remove query params from the URL
				window.history.replaceState({}, document.title, "/dashboard");

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
}

export default AuthService;
