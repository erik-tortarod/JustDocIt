import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import SelectBtn from "../../components/common/SelectBtn";
import ProgressBarModal from "../../components/ui/ProgressBarModal";
import RepositorySettingsModal from "./RepositorySettingsModal";
import HighlighSubString from "../../components/common/HighlighSubString";

// INTERFACES
import { IRepository } from "../../types/interfaces";

// SERVICES
import DocumentationService from "../../services/DocumentationService";

// UTILS
import { replaceLanguageByIcon } from "../../utils/replaceLanguageByIcon";

/**
 * Component for displaying an added repository.
 * @param repo - The repository to display.
 * @param onDocumentationComplete - Callback function to be called when documentation is complete.
 * @param searchTerm - The search term to highlight in the repository name.
 */
function AddedRepositorie({
	repo,
	onDocumentationComplete,
	searchTerm = "",
}: {
	repo: IRepository;
	onDocumentationComplete?: () => void;
	searchTerm?: string;
}) {
	const availableLanguages = ["TYPESCRIPT", "PYTHON", "PHP"];

	// Filter out already documented languages
	const filteredLanguages = availableLanguages.filter(
		(lang) => !repo.documentedLanguages?.includes(lang),
	);

	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [loading, setLoading] = useState(false);
	const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
	const [processingComplete, setProcessingComplete] = useState(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

	// Referencia al selectBtn
	const selectBtnRef = useRef(null);

	useEffect(() => {
		const documentRepositoryByLanguage = async () => {
			if (selectedLanguage) {
				setLoading(true);
				setIsProgressModalOpen(true);
				setProcessingComplete(false);

				try {
					await DocumentationService.scanRepositoryByLanguage(
						selectedLanguage,
						repo.githubId ?? "",
						repo.branch,
					);
					setProcessingComplete(true);
					onDocumentationComplete?.(); // Notify parent when documentation is complete
				} catch (error) {
					console.error("Error documentando repositorio:", error);
					setProcessingComplete(true);
				} finally {
					setLoading(false);
				}
			}
		};

		documentRepositoryByLanguage();
	}, [selectedLanguage, repo.githubId, repo.branch]);

	const handleCloseProgressModal = () => {
		if (processingComplete || !loading) {
			setIsProgressModalOpen(false);
			setSelectedLanguage("");
		}
	};

	const handleProcessComplete = () => {
		console.log("Proceso de documentación completado para:", selectedLanguage);
	};

	const handleSetLanguage = (language: string) => {
		setSelectedLanguage(language);
	};

	// Funciones para manejar el modal de configuración (solo visual)
	const handleOpenSettings = () => {
		setIsSettingsModalOpen(true);
	};

	const handleCloseSettings = () => {
		setIsSettingsModalOpen(false);
	};

	const handleRefresh = async () => {
		if (onDocumentationComplete) {
			onDocumentationComplete();
		}
	};

	return (
		<>
			<div className="bg-base-200 rounded-xl border border-base-700 transition-all hover:translate-y-[-5px] hover:shadow-xl">
				<div className="project-header p-6 flex justify-between items-start">
					<div className="flex-1 min-w-0">
						<div className="project-name text-lg font-semibold mb-2 flex items-center gap-2 text-base-content">
							<div className="truncate">
								<HighlighSubString text={repo.name} search={searchTerm} />
							</div>
							{repo.branch && (
								<span className="px-2 py-1 text-xs rounded-md badge badge-accent shrink-0">
									<span className="mr-1">🌿</span>
									{repo.branch}
								</span>
							)}
						</div>
						<div className="project-repo text-base-content/70 text-sm flex items-center gap-2">
							<span className="shrink-0">📦</span>
							<a
								href={repo.htmlUrl}
								className="hover:text-primary transition-colors truncate"
							>
								{repo.htmlUrl?.replace("https://", "") ?? "URL not available"}
							</a>
						</div>
						<div className="flex items-center gap-4 mt-2 text-sm text-base-content/70">
							<span className="flex items-center gap-1">
								<span>⭐</span>
								{repo.stargazersCount || 0}
							</span>
							<span className="flex items-center gap-1">
								<span>🔄</span>
								{repo.forksCount || 0}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-2 ml-4 shrink-0">
						<button
							onClick={handleOpenSettings}
							className="p-2 text-base-content/70 hover:text-base-content hover:bg-base-300 rounded-md transition-colors"
							aria-label="Configuración del repositorio"
						>
							<span className="text-lg">. . .</span>
						</button>
					</div>
				</div>

				<div className="project-content px-6 pb-6">
					<div className="project-stats flex gap-4 mb-4">
						<div className="project-stat flex flex-col">
							<div className="project-stat-value font-semibold text-primary">
								{repo.documentedLanguages?.length || 0}
							</div>
							<div className="project-stat-label text-xs text-base-content/60">
								Lenguajes
							</div>
						</div>
						<div className="project-stat flex flex-col">
							<div className="project-stat-value font-semibold text-primary">
								{repo.stargazersCount || 0}
							</div>
							<div className="project-stat-label text-xs text-base-content/60">
								Estrellas
							</div>
						</div>
						<div className="project-stat flex flex-col">
							<div className="project-stat-value font-semibold text-primary">
								{repo.forksCount || 0}
							</div>
							<div className="project-stat-label text-xs text-base-content/60">
								Forks
							</div>
						</div>
					</div>

					<div className="project-description mb-4">
						<p className="text-base-content/70 text-sm">
							<HighlighSubString
								text={repo.description || "No description provided"}
								search={searchTerm}
							/>
						</p>
					</div>
				</div>

				<div className="project-footer bg-base-300/50 p-4 flex justify-between items-center border-t border-base-700">
					<div className="documented-languages flex gap-2">
						{repo.documentedLanguages && repo.documentedLanguages.length > 0 ? (
							repo.documentedLanguages.map((language) => (
								<Link
									key={language}
									to={`/documentation/${repo.id}/${language}`}
									className="p-2 bg-base-200 rounded-md hover:bg-base-300 transition-colors text-base-content/70 hover:text-base-content"
								>
									{renderLanguageIcon(language)}
								</Link>
							))
						) : (
							<div className="flex items-center gap-2">
								<div
									aria-label="warning"
									className="status status-warning"
								></div>
								<span className="text-sm text-base-content/60 italic">
									No hay documentación disponible
								</span>
							</div>
						)}
					</div>

					<div className="flex items-center gap-3">
						<div className="">
							{filteredLanguages.length > 0 ? (
								<SelectBtn
									ref={selectBtnRef}
									children={filteredLanguages}
									title="Documentar"
									setState={handleSetLanguage}
								/>
							) : (
								<div className="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-md">
									<span className="text-lg">✅</span>
									<span className="text-sm text-base-content/70">
										Todos los lenguajes documentados
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Modal de barra de progreso */}
			<ProgressBarModal
				isOpen={isProgressModalOpen}
				onClose={handleCloseProgressModal}
				repoSize={repo.size || 1000}
				language={selectedLanguage}
				isProcessing={loading}
				onComplete={handleProcessComplete}
			/>

			{/* Modal de configuración del repositorio */}
			<RepositorySettingsModal
				isOpen={isSettingsModalOpen}
				onClose={handleCloseSettings}
				repository={repo}
				refreshRepositories={handleRefresh}
			/>
		</>
	);
}

/**
 * Renders an icon for a given programming language.
 * @param language - The programming language.
 * @returns A JSX element representing the language icon.
 */
function renderLanguageIcon(language: string) {
	const IconComponent = replaceLanguageByIcon(language);
	return IconComponent ? <IconComponent /> : <span>{language}</span>;
}

export default AddedRepositorie;
