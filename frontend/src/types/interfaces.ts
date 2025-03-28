import { ELanguage, ETheme } from "./enums";

export interface IUser {
	jwtToken: string;
	username: string;
	email: string;
	avatarUrl: string;
	createdAt: string;
	preferences: IPreferences;
}

interface IPreferences {
	language: ELanguage;
	theme: ETheme;
}
