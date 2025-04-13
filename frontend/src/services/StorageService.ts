const STORAGE_KEYS = {
	JWT_TOKEN: "jwtToken",
	USER_PREFERENCES: "userPreferences",
	USER_ID: "userId",
	ACCESS_TOKEN: "accessToken",
};

/**
 * Servicio para gestionar el almacenamiento local del navegador.
 * Proporciona métodos para guardar, recuperar y eliminar datos persistentes.
 */
class StorageService {
	static getToken = (): string | null => {
		return localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
	};
	static setToken = (token: string): void => {
		localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
	};
	static removeToken = (): void => {
		localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
	};

	//User ID
	static getUserId = (): string | null => {
		return localStorage.getItem(STORAGE_KEYS.USER_ID);
	};
	static setUserId = (id: string): void => {
		localStorage.setItem(STORAGE_KEYS.USER_ID, id);
	};
	static removeUserId = (): void => {
		localStorage.removeItem(STORAGE_KEYS.USER_ID);
	};

	//Access Token
	static getAccessToken = (): string | null => {
		return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
	};
	static setAccessToken = (token: string): void => {
		localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
	};
	static removeAccessToken = (): void => {
		localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
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
