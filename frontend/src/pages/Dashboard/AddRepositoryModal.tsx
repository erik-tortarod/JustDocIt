import { IRepository } from "../../types/interfaces";
import RepositorieList from "./RepositorieList";
import { useState } from "react";

interface AddRepositoryModalProps {
	userRepositories: IRepository[];
	refreshAddedRepositories: () => Promise<void>;
	selectedRepository: IRepository | null;
	onSelectRepository: (repo: IRepository | null) => void;
	branch: string;
	onBranchChange: (branch: string) => void;
	directory: string;
	onDirectoryChange: (directory: string) => void;
	isAddingRepo: boolean;
	onAddRepository: () => void;
	onClose: () => void;
}

function AddRepositoryModal({
	userRepositories,
	refreshAddedRepositories,
	selectedRepository,
	onSelectRepository,
	branch,
	onBranchChange,
	directory,
	onDirectoryChange,
	isAddingRepo,
	onAddRepository,
	onClose,
}: AddRepositoryModalProps) {
	const [activeTab, setActiveTab] = useState<"list" | "config">("list");

	const handleModalClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleSelectRepository = (repo: IRepository | null) => {
		onSelectRepository(repo);
		if (repo) {
			setActiveTab("config");
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-500 p-4"
			onClick={handleModalClick}
		>
			<div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 hover:bg-base-300 text-base-content/70 hover:text-base-content transition-colors duration-200"
					aria-label="Cerrar modal"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Tabs for mobile */}
				<div className="lg:hidden flex border-b border-gray-700">
					<button
						className={`flex-1 py-3 text-sm font-medium ${
							activeTab === "list"
								? "text-primary border-b-2 border-primary"
								: "text-gray-400 hover:text-gray-300"
						}`}
						onClick={() => setActiveTab("list")}
					>
						Repositorios
					</button>
					<button
						className={`flex-1 py-3 text-sm font-medium ${
							activeTab === "config"
								? "text-primary border-b-2 border-primary"
								: "text-gray-400 hover:text-gray-300"
						}`}
						onClick={() => setActiveTab("config")}
						disabled={!selectedRepository}
					>
						Configuración
					</button>
				</div>

				<div className="p-3 sm:p-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
						{/* Lista de repositorios - visible en móvil solo cuando activeTab es 'list' */}
						<div
							className={`border border-gray-700 rounded-lg p-3 sm:p-4 ${
								activeTab === "list" ? "block" : "hidden lg:block"
							}`}
						>
							<RepositorieList
								userRepositories={userRepositories}
								refreshAddedRepositories={refreshAddedRepositories}
								onSelectRepository={handleSelectRepository}
								selectedRepository={selectedRepository}
							/>
						</div>

						{/* Configuración - visible en móvil solo cuando activeTab es 'config' */}
						<div
							className={`border border-gray-700 rounded-lg p-3 sm:p-4 ${
								activeTab === "config" ? "block" : "hidden lg:block"
							}`}
						>
							{selectedRepository ? (
								<div className="space-y-3 sm:space-y-4">
									<div className="p-3 sm:p-4 bg-gray-800 rounded-lg">
										<h4 className="font-medium text-sm sm:text-base">
											{selectedRepository.name}
										</h4>
										<p className="text-xs sm:text-sm text-gray-400 mt-1">
											{selectedRepository.description}
										</p>
									</div>
									<div>
										<label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
											Rama
										</label>
										<input
											className="w-full p-2 text-sm sm:text-base border border-gray-700 rounded bg-gray-800"
											placeholder={selectedRepository.defaultBranch || "main"}
											value={branch}
											onChange={(e) => onBranchChange(e.target.value)}
											required
										/>
									</div>
									<div>
										<label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
											Directorio (opcional)
										</label>
										<input
											className="w-full p-2 text-sm sm:text-base border border-gray-700 rounded bg-gray-800"
											placeholder="/"
											value={directory}
											onChange={(e) => onDirectoryChange(e.target.value)}
										/>
									</div>
									<button
										className={`w-full py-2 text-sm sm:text-base bg-purple-700 text-white rounded hover:bg-purple-600 ${
											isAddingRepo ? "opacity-70 cursor-not-allowed" : ""
										}`}
										onClick={onAddRepository}
										disabled={isAddingRepo}
									>
										{isAddingRepo ? "Agregando..." : "Agregar Repositorio"}
									</button>
								</div>
							) : (
								<div className="text-center text-gray-500 py-6 sm:py-8 text-sm sm:text-base">
									Selecciona un repositorio de la lista para configurarlo
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddRepositoryModal;
