import { useState, useRef } from "react";
import RepositoryService from "../../services/RepositoryService";
import { IRepository } from "../../types/interfaces";

function RepositorieList({
	userRepositories,
	refreshAddedRepositories,
}: {
	userRepositories: IRepository[];
	refreshAddedRepositories: () => Promise<void>;
}) {
	const [selectedRepo, setSelectedRepo] = useState<IRepository | null>(null);
	const [branch, setBranch] = useState<string>("");
	const [directory, setDirectory] = useState<string>("/");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const configSectionRef = useRef<HTMLDivElement>(null);

	const handleAddRepository = async () => {
		if (!selectedRepo || !branch) {
			alert("Por favor selecciona un repositorio y especifica una rama.");
			return;
		}

		setIsLoading(true);
		try {
			await RepositoryService.addRepository(selectedRepo.id, branch);
			alert("Repositorio agregado correctamente.");
			setSelectedRepo(null);
			setBranch("");
			setDirectory("/");
			await refreshAddedRepositories(); // Refresh the list of added repositories
		} catch (error) {
			alert("Error al agregar el repositorio.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelectRepo = (repo: IRepository) => {
		if (repo.id === selectedRepo?.id) {
			setSelectedRepo(null);
			setDirectory("/");
		} else {
			setSelectedRepo(repo);
			setDirectory("/");

			// Hacer scroll hasta la sección de configuración con una pequeña animación
			setTimeout(() => {
				configSectionRef.current?.scrollIntoView({ behavior: "smooth" });
			}, 100);
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

			{/* Contenedor principal con scroll único */}
			<div className="flex-1 overflow-y-auto pr-1">
				{/* Lista de repositorios */}
				{(!selectedRepo || filteredRepositories.length === 0) && (
					<div className="border border-gray-700 rounded mb-4">
						{filteredRepositories.length > 0 ? (
							filteredRepositories.map((repo: IRepository) => (
								<div
									key={repo.id}
									className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors ${
										selectedRepo?.id === repo.id
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
													<span>{repo.stars || 0}</span>
												</div>
												<div className="flex items-center">
													<span className="mr-1">🔄</span>
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
				)}

				{/* Configuración de repositorio seleccionado */}
				{selectedRepo && (
					<div
						ref={configSectionRef}
						className="border border-gray-700 rounded p-4 mb-2"
					>
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-medium">Configuración de Repositorio</h3>
							<button
								className="text-xs text-gray-400 hover:text-white"
								onClick={() => setSelectedRepo(null)}
							>
								Volver a la lista ↑
							</button>
						</div>

						<div className="p-3 bg-gray-800 rounded-lg border border-gray-700 mb-4">
							<div className="flex items-center">
								<span className="text-xl mr-2">📦</span>
								<span className="font-medium">{selectedRepo.name}</span>
								{selectedRepo.private && (
									<span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded-full">
										🔒 Privado
									</span>
								)}
							</div>
							<p className="text-xs text-gray-400 mt-1 ml-7">
								{selectedRepo.description || "Sin descripción"}
							</p>
						</div>

						<div className="mb-3">
							<label className="block text-sm font-medium mb-1">Rama</label>
							<input
								className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
								value={branch}
								onChange={(e) => setBranch(e.target.value)}
								placeholder={selectedRepo.defaultBranch || "main"}
								required
							/>
							<p className="text-xs text-gray-500 mt-1">
								Especifica la rama del repositorio que deseas documentar
							</p>
						</div>

						<div className="mb-2">
							<label className="block text-sm font-medium mb-1">
								Directorio (opcional)
							</label>
							<input
								type="text"
								className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
								placeholder="/"
								value={directory}
								onChange={(e) => setDirectory(e.target.value)}
							/>
							<p className="text-xs text-gray-500 mt-1">
								Deja "/" para usar el directorio raíz
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Botón fijo en la parte inferior, fuera del área de scroll */}
			<div className="flex-none mt-3 pt-3 border-t border-gray-700">
				{selectedRepo ? (
					<div className="flex justify-between items-center">
						<div className="text-sm text-gray-400">
							{selectedRepo.name} • {branch}
						</div>
						<button
							className={`btn px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600 ${
								isLoading ? "opacity-70 cursor-not-allowed" : ""
							}`}
							onClick={handleAddRepository}
							disabled={isLoading}
						>
							{isLoading ? "Agregando..." : "Agregar Repositorio"}
						</button>
					</div>
				) : (
					<div className="text-sm text-gray-500 text-center">
						Selecciona un repositorio para continuar
					</div>
				)}
			</div>
		</div>
	);
}

export default RepositorieList;
