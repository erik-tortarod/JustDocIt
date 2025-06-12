import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import GuideContent from "./GuideContent";
import { typescriptDocs } from "./docs/typescript";
import { javascriptDocs } from "./docs/javascript";
import { javaDocs } from "./docs/java";
import { pythonDocs } from "./docs/python";
import { LanguageDocs } from "./types";

const ProyectDocumentation = () => {
	const [activeTab, setActiveTab] = useState("guide");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	useEffect(() => {
		// Function to check screen size and update sidebar state
		const checkScreenSize = () => {
			if (window.innerWidth < 1024) {
				// lg breakpoint in Tailwind
				setIsSidebarOpen(false);
			} else {
				setIsSidebarOpen(true);
			}
		};

		// Check on initial load
		checkScreenSize();

		// Add event listener for window resize
		window.addEventListener("resize", checkScreenSize);

		// Cleanup event listener
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const languageDocs: LanguageDocs = {
		typescript: typescriptDocs,
		javascript: javascriptDocs,
		java: javaDocs,
		python: pythonDocs,
	};

	const allDocs = {
		guide: GuideContent(),
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
