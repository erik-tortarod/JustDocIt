import { IRepository } from "../../types/interfaces";

function AddedRepositories({
	addedRepositories,
}: {
	addedRepositories: IRepository[];
}) {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{addedRepositories.map((repo) => (
				<div key={repo.id}>
					<h2>{repo.name}</h2>
					<p>{repo.description || "No description provided"}</p>
					<p>Url: {repo.htmlUrl}</p>
				</div>
			))}
		</section>
	);
}

export default AddedRepositories;
