const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = Object.freeze({
	AUTH: {
		LOGIN: `${API_BASE_URL}/oauth2/authorization/github`,
		USER: `${API_BASE_URL}/api/user`,
	},
});
