// INTERFACES
import { IUser } from "../types/interfaces";
import { ELanguage, ETheme } from "../types/enums";

class UserModel implements IUser {
	jwtToken: string;
	username: string;
	email: string | null;
	avatarUrl: string;
	createdAt: string;
	preferences: {
		language: ELanguage;
		theme: ETheme;
	};

	constructor(data: {
		jwtToken: string;
		username: string;
		email: string | null;
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

	static fromData(data: IUser | any): IUser {
		if (!data) {
			throw new Error("Cannot create user model from null or undefined data");
		}

		return new UserModel({
			jwtToken: data.jwtToken || "",
			username: data.username || "",
			email: data.email || null,
			avatarUrl: data.avatarUrl || "",
			createdAt: data.createdAt || new Date().toISOString(),
			preferences: {
				language: data.preferences.language || ELanguage.ENGLISH,
				theme: data.preferences.theme || ETheme.SYSTEM,
			},
		});
	}
}

export default UserModel;
