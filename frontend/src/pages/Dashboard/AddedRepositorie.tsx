import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import SelectBtn from "../../components/common/SelectBtn";
import ProgressBarModal from "../../components/ui/ProgressBarModal";
import RepositorySettingsModal from "./RepositorySettingsModal"; // Importamos el nuevo modal

// INTERFACES
import { IRepository } from "../../types/interfaces";

// SERVICES
import DocumentationService from "../../services/DocumentationService";

// UTILS
import { replaceLanguageByIcon } from "../../utils/replaceLanguageByIcon";
import {
	generateContrastingTextColor,
	generateRandomColor,
} from "../../utils/generateRandomColor";

/**
 * Component for displaying an added repository.
 * @param repo - The repository to display.
 */
function AddedRepositorie({ repo }: { repo: IRepository }) {
	console.log(repo);
	const availableLanguages = ["TYPESCRIPT"];

	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [loading, setLoading] = useState(false);
	const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
	const [processingComplete, setProcessingComplete] = useState(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // Estado para el modal de configuración

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
					);
					setProcessingComplete(true);
				} catch (error) {
					console.error("Error documentando repositorio:", error);
					setProcessingComplete(true);
				} finally {
					setLoading(false);
				}
			}
		};

		documentRepositoryByLanguage();
	}, [selectedLanguage]);

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

	const branchColor = generateRandomColor();
	const textColor = generateContrastingTextColor(branchColor);

	return (
		<>
			<div className="project-card bg-base-800 shadow-md rounded-lg border border-base-700 transition-all hover:translate-y-[-5px] hover:shadow-xl">
				<div className="project-header p-6 flex justify-between items-start">
					<div>
						<div className="project-name text-lg font-semibold mb-2 flex items-center gap-2 text-content-100">
							{repo.name?.slice(0, 20) + "..."}
							{repo.branch && (
								<span
									className="px-2 py-1   text-accent-400 text-xs rounded-md border border-accent-400/30"
									style={{
										backgroundColor: branchColor,
										color: textColor,
										borderColor: textColor,
									}}
								>
									<span className="mr-1">🌿</span>
									{repo.branch}
								</span>
							)}
						</div>
						<div className="project-repo text-content-400 text-sm flex items-center gap-2">
							<span>📦</span>
							<a href={repo.htmlUrl} className="hover:text-accent-400">
								{repo.htmlUrl?.replace("https://", "") ?? "URL not available"}
							</a>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{/* Botón de configuración (3 puntos) */}
						<button
							onClick={handleOpenSettings}
							className="p-2 text-content-400 hover:text-content-100 hover:bg-base-700 rounded-md transition-colors"
							aria-label="Configuración del repositorio"
						>
							<span className="text-lg">. . .</span>
						</button>
					</div>
				</div>

				<div className="project-content px-6 pb-6">
					<div className="project-stats flex gap-4 mb-4">
						<div className="project-stat flex flex-col">
							<div className="project-stat-value font-semibold text-content-100">
								{repo.documentedLanguages?.length || 0}
							</div>
							<div className="project-stat-label text-xs text-content-400">
								Lenguajes
							</div>
						</div>
						<div className="project-stat flex flex-col">
							<div className="project-stat-value font-semibold text-content-100">
								{repo.stargazersCount || 0}
							</div>
							<div className="project-stat-label text-xs text-content-400">
								Estrellas
							</div>
						</div>
						<div className="project-stat flex flex-col">
							<div className="project-stat-value font-semibold text-content-100">
								{repo.forksCount || 0}
							</div>
							<div className="project-stat-label text-xs text-content-400">
								Forks
							</div>
						</div>
					</div>

					<div className="project-description mb-4">
						<p className="text-content-300 text-sm">
							{repo.description || "No description provided"}
						</p>
					</div>
				</div>

				<div className="project-footer bg-base-900 p-4 flex justify-between items-center border-t border-base-700">
					<div className="documented-languages flex gap-2">
						{repo.documentedLanguages && repo.documentedLanguages.length > 0 ? (
							repo.documentedLanguages.map((language) => (
								<Link
									key={language}
									to={`/documentation/${repo.id}/${language}`}
									className="p-2 bg-base-700 rounded-md hover:bg-base-600 transition-colors text-content-200"
								>
									{renderLanguageIcon(language)}
								</Link>
							))
						) : (
							<span className="text-sm text-content-400 italic">
								No hay documentación disponible
							</span>
						)}
					</div>

					<div className="flex items-center gap-3">
						<div className="">
							<SelectBtn
								ref={selectBtnRef}
								children={availableLanguages}
								title="Documentar"
								setState={handleSetLanguage}
							/>
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
