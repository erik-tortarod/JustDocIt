import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import SelectBtn from "../../components/common/SelectBtn";
import ProgressBarModal from "../../components/ui/ProgressBarModal"; // Importamos el modal de progreso

// INTERFACES
import { IRepository } from "../../types/interfaces";

// SERVICES
import DocumentationService from "../../services/DocumentationService";

// UTILS
import { replaceLanguageByIcon } from "../../utils/replaceLanguageByIcon";

/**
 * Component for displaying an added repository.
 * @param repo - The repository to display.
 */
function AddedRepositorie({ repo }: { repo: IRepository }) {
	const availableLanguages = ["TYPESCRIPT"];

	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [loading, setLoading] = useState(false);
	const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
	const [processingComplete, setProcessingComplete] = useState(false);

	// Referencia al selectBtn
	const selectBtnRef = useRef(null);

	useEffect(() => {
		const documentRepositoryByLanguage = async () => {
			if (selectedLanguage) {
				setLoading(true);
				setIsProgressModalOpen(true); // Abrimos el modal de progreso
				setProcessingComplete(false); // Reiniciamos el estado de procesamiento

				try {
					// Realizar la petición para documentar el repositorio
					await DocumentationService.scanRepositoryByLanguage(
						selectedLanguage,
						repo.githubId ?? "",
					);

					// La petición se completó, actualizamos el estado
					setProcessingComplete(true);
				} catch (error) {
					console.error("Error documentando repositorio:", error);
					setProcessingComplete(true); // Aunque haya error, marcamos como completado
				} finally {
					setLoading(false);
				}
			}
		};

		documentRepositoryByLanguage();
	}, [selectedLanguage]);

	// Manejar cierre del modal
	const handleCloseProgressModal = () => {
		// Solo permitimos cerrar el modal si el proceso ha terminado o si estamos cancelando
		if (processingComplete || !loading) {
			setIsProgressModalOpen(false);
			setSelectedLanguage(""); // Reset del lenguaje seleccionado
		}
	};

	// Manejar finalización
	const handleProcessComplete = () => {
		// Aquí podríamos hacer algo cuando el proceso termine completamente
		// como actualizar la lista de lenguajes documentados
		console.log("Proceso de documentación completado para:", selectedLanguage);
	};

	// Función para configurar el lenguaje seleccionado
	const handleSetLanguage = (language: string) => {
		setSelectedLanguage(language);
	};

	return (
		<>
			<div className="project-card bg-base-800 shadow-md rounded-lg border border-base-700 transition-all hover:translate-y-[-5px] hover:shadow-xl">
				<div className="project-header p-6 flex justify-between items-start">
					<div>
						<div className="project-name text-lg font-semibold mb-2 flex items-center gap-2 text-content-100">
							{repo.name}
						</div>
						<div className="project-repo text-content-400 text-sm flex items-center gap-2">
							<span>📦</span>
							<a href={repo.htmlUrl} className="hover:text-accent-400">
								{repo.htmlUrl?.replace("https://", "") ?? "URL not available"}
							</a>
						</div>
					</div>
					<div
						className={`project-status px-2 py-1 rounded-md text-xs font-medium cursor-pointer ${
							repo.documentedLanguages?.length
								? "bg-success-900 text-success-300"
								: "bg-warning-900 text-warning-300"
						}`}
					>
						{repo.documentedLanguages?.length ? ". . ." : "Pendiente"}
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
