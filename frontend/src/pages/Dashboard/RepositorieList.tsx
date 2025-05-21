import { useState } from "react";
import { IRepository } from "../../types/interfaces";

interface RepositorieListProps {
	userRepositories: IRepository[];
	refreshAddedRepositories: () => Promise<void>;
	onSelectRepository: (repo: IRepository | null) => void;
	selectedRepository: IRepository | null;
}

function RepositorieList({
	userRepositories,
	selectedRepository,
	onSelectRepository,
}: RepositorieListProps) {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSelectRepo = (repo: IRepository) => {
		if (repo.id === selectedRepository?.id) {
			onSelectRepository(null);
		} else {
			onSelectRepository(repo);
		}
	};

	// Filtrar repositorios por término de búsqueda
	const filteredRepositories = userRepositories.filter(
		(repo) =>
			(repo.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(repo.description &&
				repo.description.toLowerCase().includes(searchTerm.toLowerCase())),
	);

	return (
		<div className="h-full flex flex-col">
			{/* Barra de búsqueda de repositorios */}
			<div className="relative mb-3 flex-none">
				<input
					type="text"
					placeholder="Buscar repositorio..."
					className="w-full p-2 pl-8 border border-gray-700 rounded bg-gray-800 text-white"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<span className="absolute left-2 top-2 text-gray-400">🔍</span>
			</div>

			{/* Lista de repositorios */}
			<div className="flex-1 overflow-y-auto max-h-[600px] pr-1">
				<div className="border border-gray-700 rounded">
					{filteredRepositories.length > 0 ? (
						filteredRepositories.map((repo: IRepository) => (
							<div
								key={repo.id}
								className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors ${
									selectedRepository?.id === repo.id
										? "bg-purple-900 bg-opacity-20 border-l-4 border-l-purple-500"
										: ""
								}`}
								onClick={() => handleSelectRepo(repo)}
							>
								<div className="flex justify-between items-start">
									<div>
										<div className="flex items-center">
											<span className="text-xl mr-2">📦</span>
											<span className="font-medium">{repo.name}</span>
											{repo.private && (
												<span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded-full">
													🔒 Privado
												</span>
											)}
										</div>

										<p className="text-xs text-gray-400 mt-1 ml-7">
											{repo.description || "Sin descripción"}
										</p>

										<div className="flex mt-2 ml-7 text-xs text-gray-500">
											<div className="mr-4 flex items-center">
												<span className="mr-1">⭐</span>
												<span>{repo.stargazersCount || 0}</span>
											</div>
											<div className="mr-4 flex items-center">
												<span className="mr-1">🔄</span>
												<span>{repo.forksCount || 0}</span>
											</div>
											<div className="flex items-center">
												<span className="mr-1">📅</span>
												<span>
													Actualizado hace {repo.updatedAt || "poco tiempo"}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="p-4 text-center text-gray-500">
							No se encontraron repositorios
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default RepositorieList;
