import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import SelectBtn from "../../components/common/SelectBtn";

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

	useEffect(() => {
		const documentRepositoryByLanguage = async () => {
			if (selectedLanguage) {
				setLoading(true);
				await DocumentationService.scanRepositoryByLanguage(
					selectedLanguage,
					repo.githubId,
				);
			}
			setLoading(false);
		};

		documentRepositoryByLanguage();
	}, [selectedLanguage]);

	return (
		<div className="project-card bg-base-800 shadow-md rounded-lg border border-base-700 transition-all hover:translate-y-[-5px] hover:shadow-xl">
			<div className="project-header p-6 flex justify-between items-start">
				<div>
					<div className="project-name text-lg font-semibold mb-2 flex items-center gap-2 text-content-100">
						{repo.name}
					</div>
					<div className="project-repo text-content-400 text-sm flex items-center gap-2">
						<span>📦</span>
						<a href={repo.htmlUrl} className="hover:text-accent-400">
							{repo.htmlUrl.replace("https://", "")}
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
					{loading && (
						<div className="flex items-center gap-2">
							<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-accent-400"></div>
							<span className="text-sm text-content-300">Procesando...</span>
						</div>
					)}
					<div className="">
						<SelectBtn
							children={availableLanguages}
							title="Documentar"
							setState={setSelectedLanguage}
						/>
					</div>
				</div>
			</div>
		</div>
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
