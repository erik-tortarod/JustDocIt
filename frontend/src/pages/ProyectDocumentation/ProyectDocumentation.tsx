import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { guideContent } from "./GuideContent";
import { typescriptDocs } from "./docs/typescript";
import { javascriptDocs } from "./docs/javascript";
import { javaDocs } from "./docs/java";
import { pythonDocs } from "./docs/python";
import { LanguageDocs } from "./types";

const ProyectDocumentation = () => {
	const [activeTab, setActiveTab] = useState("guide");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const languageDocs: LanguageDocs = {
		typescript: typescriptDocs,
		javascript: javascriptDocs,
		java: javaDocs,
		python: pythonDocs,
	};

	const allDocs = {
		guide: guideContent,
		...languageDocs,
	};

	return (
		<div className="flex h-screen w-screen bg-base-100">
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				docs={allDocs}
			/>
			<MainContent activeTab={activeTab} docs={allDocs} />
		</div>
	);
};

export default ProyectDocumentation;
