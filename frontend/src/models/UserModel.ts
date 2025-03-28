// INTERFACES
import { IUser } from "../types/interfaces";
import { ELanguage, ETheme } from "../types/enums";

class UserModel implements IUser {
	jwtToken: string;
	username: string;
	email: string;
	avatarUrl: string;
	createdAt: string;
	preferences: {
		language: ELanguage;
		theme: ETheme;
	};

	constructor(data: {
		jwtToken: string;
		username: string;
		email: string;
		avatarUrl: string;
		createdAt: string;
		preferences: {
			language: string;
			theme: string;
		};
	}) {
		this.jwtToken = data.jwtToken;
		this.username = data.username;
		this.email = data.email;
		this.avatarUrl = data.avatarUrl;
		this.createdAt = data.createdAt;
		this.preferences = {
			language: (data.preferences.language as ELanguage) || ELanguage.ENGLISH,
			theme: (data.preferences.theme as ETheme) || ETheme.SYSTEM,
		};
	}
}

export default UserModel;
