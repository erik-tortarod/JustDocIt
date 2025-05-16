import { useState, useEffect } from "react";
import { IRepository } from "../../types/interfaces";

//COMPONENTS
import AddedRepositorie from "./AddedRepositorie";

function AddedRepositories({
	addedRepositories,
}: {
	addedRepositories: IRepository[];
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const reposPerPage = 4;

	// Reset page when repositories change (due to filtering)
	useEffect(() => {
		setCurrentPage(1);
	}, [addedRepositories]);

	// Calculate total pages
	const totalPages = Math.max(
		1,
		Math.ceil(addedRepositories.length / reposPerPage),
	);

	// Ensure current page is valid
	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	// Calculate pagination indexes
	const indexOfLastRepo = Math.min(
		currentPage * reposPerPage,
		addedRepositories.length,
	);
	const indexOfFirstRepo = Math.max(0, indexOfLastRepo - reposPerPage);
	const currentRepos = addedRepositories.slice(
		indexOfFirstRepo,
		indexOfLastRepo,
	);

	// Change page
	const paginate = (pageNumber: number) => {
		const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
		setCurrentPage(validPageNumber);
	};

	return (
		<div className="pb-20">
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
				{currentRepos.map((repo) => (
					<AddedRepositorie
						key={`${repo.githubId}-${repo.branch}`}
						repo={repo}
					/>
				))}
			</section>

			{totalPages > 1 && (
				<div className="flex justify-center gap-2 mt-4">
					<button
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
						className={`px-3 py-1 rounded ${
							currentPage === 1
								? "bg-gray-200 text-gray-500 cursor-not-allowed"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						Anterior
					</button>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
						<button
							key={number}
							onClick={() => paginate(number)}
							className={`px-3 py-1 rounded ${
								currentPage === number
									? "bg-blue-500 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							{number}
						</button>
					))}
					<button
						onClick={() => paginate(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={`px-3 py-1 rounded ${
							currentPage === totalPages
								? "bg-gray-200 text-gray-500 cursor-not-allowed"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						Siguiente
					</button>
				</div>
			)}
		</div>
	);
}

export default AddedRepositories;
