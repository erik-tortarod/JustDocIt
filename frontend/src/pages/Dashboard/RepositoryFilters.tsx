import { useState, useEffect } from "react";
import { IRepository } from "../../types/interfaces";

interface RepositoryFiltersProps {
	repositories: IRepository[];
	onFilterChange: (filteredRepos: IRepository[]) => void;
	onSearchChange: (searchTerm: string) => void;
}

type SortOption = "none" | "stars-desc" | "languages-asc" | "languages-desc";

function RepositoryFilters({
	repositories,
	onFilterChange,
	onSearchChange,
}: RepositoryFiltersProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
	const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState<SortOption>("none");

	useEffect(() => {
		// Get unique languages from repositories
		const languages = Array.from(
			new Set(repositories.flatMap((repo) => repo.documentedLanguages || [])),
		).sort();
		setAvailableLanguages(languages);
	}, [repositories]);

	useEffect(() => {
		// Create a Map to store unique repositories by githubId+branch
		const uniqueReposMap = new Map<string, IRepository>();

		// First filter the repositories
		let filteredRepos = [...repositories];

		// Apply search filter
		if (searchTerm) {
			filteredRepos = filteredRepos.filter(
				(repo) =>
					(repo.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
					(repo.description || "")
						.toLowerCase()
						.includes(searchTerm.toLowerCase()),
			);
		}

		// Apply language filter
		if (selectedLanguage !== "all") {
			if (selectedLanguage === "none") {
				filteredRepos = filteredRepos.filter(
					(repo) =>
						!repo.documentedLanguages || repo.documentedLanguages.length === 0,
				);
			} else if (selectedLanguage === "with") {
				filteredRepos = filteredRepos.filter(
					(repo) =>
						repo.documentedLanguages && repo.documentedLanguages.length > 0,
				);
			} else {
				filteredRepos = filteredRepos.filter((repo) =>
					repo.documentedLanguages?.includes(selectedLanguage),
				);
			}
		}

		// Store unique repositories in the Map using githubId+branch as key
		filteredRepos.forEach((repo) => {
			if (repo.githubId) {
				const uniqueKey = `${repo.githubId}-${repo.branch || "default"}`;
				if (!uniqueReposMap.has(uniqueKey)) {
					uniqueReposMap.set(uniqueKey, repo);
				}
			}
		});

		// Convert Map values back to array
		let uniqueFilteredRepos = Array.from(uniqueReposMap.values());

		// Apply sorting only if a sort option is selected
		if (sortBy !== "none") {
			uniqueFilteredRepos = uniqueFilteredRepos.sort((a, b) => {
				const aStars = Number(a.stars ?? 0);
				const bStars = Number(b.stars ?? 0);
				const aLanguages = Number(a.documentedLanguages?.length ?? 0);
				const bLanguages = Number(b.documentedLanguages?.length ?? 0);

				switch (sortBy) {
					case "stars-desc":
						return bStars - aStars;
					case "languages-asc":
						return aLanguages - bLanguages;
					case "languages-desc":
						return bLanguages - aLanguages;
					default:
						return 0;
				}
			});
		}

		onFilterChange(uniqueFilteredRepos);
	}, [searchTerm, selectedLanguage, sortBy, repositories]);

	return (
		<div className="flex flex-wrap gap-4 mb-6">
			<div className="flex-1 min-w-[200px]">
				<input
					type="text"
					placeholder="Buscar repositorios..."
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						onSearchChange(e.target.value);
					}}
				/>
			</div>
			<div className="min-w-[150px]">
				<select
					className="w-full px-4 py-2 bg-base-100 text-base-content border rounded-lg focus:outline-info focus:ring-2 focus:ring-primary"
					value={selectedLanguage}
					onChange={(e) => setSelectedLanguage(e.target.value)}
				>
					<option value="all" className="bg-base-100 text-base-content">
						Todos los lenguajes
					</option>
					<option value="none" className="bg-base-100 text-base-content">
						Sin lenguaje
					</option>
					<option value="with" className="bg-base-100 text-base-content">
						Con lenguaje
					</option>
					{availableLanguages.map((lang) => (
						<option
							key={lang}
							value={lang}
							className="bg-base-100 text-base-content"
						>
							{lang}
						</option>
					))}
				</select>
			</div>
			<div className="min-w-[200px]">
				<select
					className="w-full px-4 py-2 bg-base-100 text-base-content border rounded-lg focus:outline-info focus:ring-2 focus:ring-primary"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value as SortOption)}
				>
					<option value="none" className="bg-base-100 text-base-content">
						Ordenar por...
					</option>
					<option value="stars-desc" className="bg-base-100 text-base-content">
						Estrellas (mayor a menor)
					</option>
					<option
						value="languages-desc"
						className="bg-base-100 text-base-content"
					>
						Lenguajes (más a menos)
					</option>
					<option
						value="languages-asc"
						className="bg-base-100 text-base-content"
					>
						Lenguajes (menos a más)
					</option>
				</select>
			</div>
		</div>
	);
}

export default RepositoryFilters;
