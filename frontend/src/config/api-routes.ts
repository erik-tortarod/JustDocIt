import { EEnvironment } from "../types/enums";

const API_BASE_URL = "http://localhost:8080";
const DOCS_BASE_URL = "http://localhost:8082";

export const ENVIRONMENT = EEnvironment.DEV;

export const API_ROUTES = Object.freeze({
	AUTH: {
		LOGIN: `${API_BASE_URL}/api/oauth2/authorization/github`,
		USER: `${API_BASE_URL}/api/user`,
		TOKEN: `${API_BASE_URL}/auth/token`,
	},
	DOCS: {
		REPOSITORIES: `${DOCS_BASE_URL}/api/github-repositories`,
		ADD_REPOSITORY: `${DOCS_BASE_URL}/api/add-repository`,
		LIST_REPOSITORIES: `${DOCS_BASE_URL}/api/user-repositories`,
		SCAN_REPOSITORIE_BY_LANGUAGE: `${DOCS_BASE_URL}/api/documentation/scan`,
		GET_DOCUMENTATION: `${DOCS_BASE_URL}/api/documentation/repository`,
	},
});
