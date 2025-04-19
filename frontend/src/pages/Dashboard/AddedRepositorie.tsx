import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//COMPONENTS
import SelectBtn from "../../components/common/SelectBtn";

//INTERFACES
import { IRepository } from "../../types/interfaces";

//SERVICES
import DocumentationService from "../../services/DocumentationService";

//UTILS
import { replaceLanguageByIcon } from "../../utils/replaceLanguageByIcon";

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
		<div key={repo.id}>
			<h2>{repo.name}</h2>
			<p>{repo.description || "No description provided"}</p>
			<a href={repo.htmlUrl}>Ver en Github</a>
			<SelectBtn
				children={availableLanguages}
				title="Select a Language"
				setState={setSelectedLanguage}
			/>
			{repo.documentedLanguages &&
				repo.documentedLanguages.map((language) => (
					<Link key={language} to={`/documentation/${repo.id}/${language}`}>
						{renderLanguageIcon(language)}
					</Link>
				))}
			{loading && (
				<div className="flex justify-center items-center">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
					<p>loading...</p>
				</div>
			)}
		</div>
	);
}

function renderLanguageIcon(language: string) {
	const IconComponent = replaceLanguageByIcon(language);
	return IconComponent ? <IconComponent /> : <span>{language}</span>;
}

export default AddedRepositorie;
