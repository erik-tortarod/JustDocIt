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
	name: string;
	private: boolean;
	html_url: string;
	description: string | null;
	size: number;
	default_branch: string;
	visibility: string;
}
