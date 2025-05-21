import { EEnvironment } from "../types/enums";

const API_BASE_URL = "http://localhost:8080";
const DOCS_BASE_URL = "http://localhost:8082";

export const ENVIRONMENT = EEnvironment.PROD;

export const API_ROUTES = Object.freeze({
	AUTH: {
		LOGIN: `${API_BASE_URL}/api/oauth2/authorization/github`,
		USER: `${API_BASE_URL}/api/user`,
		TOKEN: `${API_BASE_URL}/auth/token`,
		LDAP: `${API_BASE_URL}/api/auth/verify`,
		VALIDATE: `${API_BASE_URL}/token/info`,
	},
	DOCS: {
		REPOSITORIES: `${DOCS_BASE_URL}/api/github-repositories`,
		ADD_REPOSITORY: `${DOCS_BASE_URL}/api/add-repository`,
		LIST_REPOSITORIES: `${DOCS_BASE_URL}/api/user-repositories`,
		SCAN_REPOSITORY: `${DOCS_BASE_URL}/api/documentation/scan`,
		GET_DOCUMENTATION: `${DOCS_BASE_URL}/api/documentation/repository`,
		GET_FILE_DOCUMENTATION: `${DOCS_BASE_URL}/api/documentation/file`,
		DELETE_REPOSITORY: `${DOCS_BASE_URL}/api/delete-repository`,
		ACTIVITIES: `${DOCS_BASE_URL}/api/activities`,
	},
});
