import { IRepository } from "../../types/interfaces";

//COMPONENTS
import AddedRepositorie from "./AddedRepositorie";

function AddedRepositories({
	addedRepositories,
}: {
	addedRepositories: IRepository[];
}) {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
			{addedRepositories.map((repo) => (
				<AddedRepositorie key={repo.githubId} repo={repo} />
			))}
		</section>
	);
}

export default AddedRepositories;
