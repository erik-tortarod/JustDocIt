import { IRepository } from "../types/interfaces";

class RepositoryModel implements IRepository {
	id: number;
	name: string;
	private: boolean;
	html_url: string;
	description: string | null;
	size: number;
	default_branch: string;
	visibility: string;

	constructor(data: {
		id: number;
		name: string;
		private: boolean;
		html_url: string;
		description: string | null;
		size: number;
		default_branch: string;
		visibility: string;
	}) {
		this.id = data.id;
		this.name = data.name;
		this.private = data.private;
		this.html_url = data.html_url;
		this.description = data.description;
		this.size = data.size;
		this.default_branch = data.default_branch;
		this.visibility = data.visibility;
	}

	static fromData(data: IRepository | any): IRepository {
		return new RepositoryModel({
			id: data.id,
			name: data.name,
			private: data.private,
			html_url: data.html_url,
			description: data.description,
			size: data.size,
			default_branch: data.default_branch,
			visibility: data.visibility,
		});
	}
}

export default RepositoryModel;
