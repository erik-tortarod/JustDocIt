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
