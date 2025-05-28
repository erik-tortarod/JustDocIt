import { ELanguage, ETheme } from "./enums";

/**
 * Represents a user in the system.
 */
export interface IUser {
	jwtToken: string;
	username: string;
	email: string | null;
	avatarUrl: string;
	createdAt: string;
	preferences: IPreferences;
}

/**
 * Represents user preferences.
 */
interface IPreferences {
	language: ELanguage;
	theme: ETheme;
}

/**
 * Represents a repository.
 */
export interface IRepository {
	id: number;
	githubId?: string;
	name?: string;
	private?: boolean;
	htmlUrl?: string;
	description?: string | null;
	size?: number;
	defaultBranch?: string;
	visibility?: string;
	documentedLanguages?: string[];
	stars?: string;
	updatedAt?: string;
	forks?: string;
	forksCount?: number;
	stargazersCount?: string;
	branch?: string;
}

/**
 * Represents code documentation for a repository.
 */
export interface ICodeDocumentation {
	id: string;
	repositoryId: string;
	repositoryName: string;
	filePath: string;
	language: ELanguage;
	content: ICodeDocumentationContent;
}

/**
 * Represents the content of code documentation.
 */
export interface ICodeDocumentationContent {
	classes: ICodeClass[];
	functions: ICodeFunction[];
	interfaces: ICodeInterface[];
	variables: ICodeVariable[];
}

/**
 * Represents a class in the code documentation.
 */
export interface ICodeClass {
	name: string;
	description: string | null;
	properties: ICodeProperty[];
	methods: ICodeMethod[];
}

/**
 * Represents a property of a class or interface.
 */
export interface ICodeProperty {
	name: string;
	type: string;
	description: string | null;
}

/**
 * Represents a method of a class or interface.
 */
export interface ICodeMethod {
	name: string;
	signature: string;
	description: string | null;
	parameters: ICodeParameter[];
	returnType: string;
	returnDescription: string | null;
	examples: string[];
}

/**
 * Represents a parameter of a method or function.
 */
export interface ICodeParameter {
	name: string;
	type: string;
	description: string | null;
}

/**
 * Represents a function in the code documentation.
 */
export interface ICodeFunction {
	name: string;
	signature: string;
	description: string | null;
	parameters: ICodeParameter[];
	returnType: string;
	returnDescription: string | null;
	examples: string[];
}

/**
 * Represents an interface in the code documentation.
 */
export interface ICodeInterface {
	name: string;
	description: string | null;
	properties: ICodeProperty[];
	methods: ICodeMethod[];
}

/**
 * Represents a variable in the code documentation.
 */
export interface ICodeVariable {
	name: string;
	type: string;
	description: string | null;
}
