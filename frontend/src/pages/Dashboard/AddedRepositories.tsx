import { IRepository } from "../../types/interfaces";

//COMPONENTS
import AddedRepositorie from "./AddedRepositorie";

function AddedRepositories({
	addedRepositories,
}: {
	addedRepositories: IRepository[];
}) {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{addedRepositories.map((repo) => (
				<AddedRepositorie key={repo.id} repo={repo} />
			))}
		</section>
	);
}

export default AddedRepositories;
