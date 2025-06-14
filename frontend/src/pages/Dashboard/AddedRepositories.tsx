import { useState, useEffect } from "react";
import { IRepository } from "../../types/interfaces";

//COMPONENTS
import AddedRepositorie from "./AddedRepositorie";

function AddedRepositories({
	addedRepositories,
	refreshRepositories,
	searchTerm = "",
}: {
	addedRepositories: IRepository[];
	refreshRepositories: () => Promise<void>;
	searchTerm?: string;
}) {
	const visibleReposFactor = 4;

	const [visibleRepos, setVisibleRepos] = useState(visibleReposFactor);

	// Reset visible repos when repositories change (due to filtering)
	useEffect(() => {
		setVisibleRepos(visibleReposFactor);
	}, [addedRepositories]);

	useEffect(() => {
		localStorage.setItem(
			"addedRepositoriesLength",
			JSON.stringify(addedRepositories.length),
		);
	}, [addedRepositories]);

	const currentRepos = addedRepositories.slice(0, visibleRepos);
	const hasMoreRepos = visibleRepos < addedRepositories.length;

	const loadMore = () => {
		setVisibleRepos((prev) => prev + visibleReposFactor);
	};

	return (
		<div className="">
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
				{currentRepos.map((repo) => (
					<AddedRepositorie
						key={`${repo.githubId}-${repo.branch}`}
						repo={repo}
						onDocumentationComplete={refreshRepositories}
						searchTerm={searchTerm}
					/>
				))}
			</section>

			{hasMoreRepos && (
				<div className="flex justify-center mt-4">
					<button onClick={loadMore} className="px-6 py-2 btn btn-success">
						Cargar más
					</button>
				</div>
			)}
		</div>
	);
}

export default AddedRepositories;
