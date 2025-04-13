import { ELanguage, ETheme } from "./enums";

export interface IUser {
	jwtToken: string;
	username: string;
	email: string | null;
	avatarUrl: string;
	createdAt: string;
	preferences: IPreferences;
}

interface IPreferences {
	language: ELanguage;
	theme: ETheme;
}

export interface IRepository {
	id: number;
	githubId: string;
	name: string;
	private: boolean;
	htmlUrl: string;
	description: string | null;
	size: number;
	defaultBranch: string;
	visibility: string;
}

export interface ICodeDocumentation {
	id: string;
	repositoryId: string;
	filePath: string;
	language: ELanguage;
	content: ICodeDocumentationContent;
}

export interface ICodeDocumentationContent {
	classes: ICodeClass[];
	functions: ICodeFunction[];
	interfaces: ICodeInterface[];
	variables: ICodeVariable[];
}

export interface ICodeClass {
	name: string;
	description: string | null;
	properties: ICodeProperty[];
	methods: ICodeMethod[];
}

export interface ICodeProperty {
	name: string;
	type: string;
	description: string | null;
}

export interface ICodeMethod {
	name: string;
	signature: string;
	description: string | null;
	parameters: ICodeParameter[];
	returnType: string;
	returnDescription: string | null;
	examples: string[];
}

export interface ICodeParameter {
	name: string;
	type: string;
	description: string | null;
}

export interface ICodeFunction {
	name: string;
	signature: string;
	description: string | null;
	parameters: ICodeParameter[];
	returnType: string;
	returnDescription: string | null;
	examples: string[];
}

export interface ICodeInterface {
	name: string;
	description: string | null;
	properties: ICodeProperty[];
	methods: ICodeMethod[];
}

export interface ICodeVariable {
	name: string;
	type: string;
	description: string | null;
}
