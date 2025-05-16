import { useState, useEffect } from "react";
import { IRepository } from "../../types/interfaces";

interface RepositoryFiltersProps {
   repositories: IRepository[];
   onFilterChange: (filteredRepos: IRepository[]) => void;
}

function RepositoryFilters({
   repositories,
   onFilterChange,
}: RepositoryFiltersProps) {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
   const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

   useEffect(() => {
      // Get unique languages from repositories
      const languages = Array.from(
         new Set(repositories.flatMap((repo) => repo.documentedLanguages || []))
      ).sort();
      setAvailableLanguages(languages);
   }, [repositories]);

   useEffect(() => {
      // Create a Map to store unique repositories by githubId
      const uniqueReposMap = new Map<string, IRepository>();

      // First filter the repositories
      let filteredRepos = [...repositories];

      // Apply search filter
      if (searchTerm) {
         filteredRepos = filteredRepos.filter((repo) =>
            (repo.name || "").toLowerCase().includes(searchTerm.toLowerCase())
         );
      }

      // Apply language filter
      if (selectedLanguage !== "all") {
         filteredRepos = filteredRepos.filter((repo) =>
            repo.documentedLanguages?.includes(selectedLanguage)
         );
      }

      // Store unique repositories in the Map
      filteredRepos.forEach((repo) => {
         if (repo.githubId && !uniqueReposMap.has(repo.githubId)) {
            uniqueReposMap.set(repo.githubId, repo);
         }
      });

      // Convert Map values back to array
      const uniqueFilteredRepos = Array.from(uniqueReposMap.values());

      onFilterChange(uniqueFilteredRepos);
   }, [searchTerm, selectedLanguage, repositories]);

   return (
      <div className="flex flex-wrap gap-4 mb-6">
         <div className="flex-1 min-w-[200px]">
            <input
               type="text"
               placeholder="Buscar repositorios..."
               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="min-w-[150px]">
            <select
               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={selectedLanguage}
               onChange={(e) => setSelectedLanguage(e.target.value)}
            >
               <option value="all">Todos los lenguajes</option>
               {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                     {lang}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
}

export default RepositoryFilters;
