import { IRepository } from "../../types/interfaces";
import RepositorieList from "./RepositorieList";

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
	const handleModalClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-500"
			onClick={handleModalClick}
		>
			<div className="bg-base-100 rounded-lg shadow-xl w-[80%] max-w-6xl max-h-[80vh] overflow-hidden relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 hover:bg-base-300 text-base-content/70 hover:text-base-content transition-colors duration-200"
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
				<div className="p-6">
					<div className="grid grid-cols-2 gap-6">
						<div className="border border-gray-700 rounded-lg p-4">
							<RepositorieList
								userRepositories={userRepositories}
								refreshAddedRepositories={refreshAddedRepositories}
								onSelectRepository={onSelectRepository}
								selectedRepository={selectedRepository}
							/>
						</div>
						<div className="border border-gray-700 rounded-lg p-4">
							{selectedRepository ? (
								<div className="space-y-4">
									<div className="p-4 bg-gray-800 rounded-lg">
										<h4 className="font-medium">{selectedRepository.name}</h4>
										<p className="text-sm text-gray-400 mt-1">
											{selectedRepository.description}
										</p>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">
											Rama
										</label>
										<input
											className="w-full p-2 border border-gray-700 rounded bg-gray-800"
											placeholder={selectedRepository.defaultBranch || "main"}
											value={branch}
											onChange={(e) => onBranchChange(e.target.value)}
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">
											Directorio (opcional)
										</label>
										<input
											className="w-full p-2 border border-gray-700 rounded bg-gray-800"
											placeholder="/"
											value={directory}
											onChange={(e) => onDirectoryChange(e.target.value)}
										/>
									</div>
									<button
										className={`w-full py-2 bg-purple-700 text-white rounded hover:bg-purple-600 ${
											isAddingRepo ? "opacity-70 cursor-not-allowed" : ""
										}`}
										onClick={onAddRepository}
										disabled={isAddingRepo}
									>
										{isAddingRepo ? "Agregando..." : "Agregar Repositorio"}
									</button>
								</div>
							) : (
								<div className="text-center text-gray-500 py-8">
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
