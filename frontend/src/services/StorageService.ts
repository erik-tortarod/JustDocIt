const STORAGE_KEYS = {
	JWT_TOKEN: "jwtToken",
	USER_PREFERENCES: "userPreferences",
};

/**
 * Servicio para gestionar el almacenamiento local del navegador.
 * Proporciona métodos para guardar, recuperar y eliminar datos persistentes.
 */
class StorageService {
	//JWT Token
	static getToken = (): string | null => {
		return localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
	};
	static setToken = (token: string): void => {
		localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
	};
	static removeToken = (): void => {
		localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
	};

	//User Preferences
	static saveUserPreferences = (preferences: any): void => {
		localStorage.setItem(
			STORAGE_KEYS.USER_PREFERENCES,
			JSON.stringify(preferences),
		);
	};
	static getUserPreferences = (): any | null => {
		const preferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
		return preferences ? JSON.parse(preferences) : null;
	};

	//Clear All
	static clearAll = (): void => {
		localStorage.clear();
	};
}

export default StorageService;
