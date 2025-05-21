import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { LanguageDocs } from "./types";

interface SidebarProps {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isOpen: boolean) => void;
	activeTab: string;
	setActiveTab: (tab: string) => void;
	docs: LanguageDocs;
}

export const Sidebar = ({
	isSidebarOpen,
	setIsSidebarOpen,
	activeTab,
	setActiveTab,
	docs,
}: SidebarProps) => {
	return (
		<div className="relative">
			<motion.div
				initial={false}
				animate={{ width: isSidebarOpen ? "16rem" : "4rem" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="bg-white dark:bg-gray-800 shadow-lg p-4 h-screen"
			>
				<div className="space-y-4">
					{Object.entries(docs).map(([lang, doc]) => (
						<motion.button
							key={lang}
							onClick={() => setActiveTab(lang)}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
								activeTab === lang
									? "bg-blue-500 text-white shadow-md"
									: "hover:bg-gray-100 dark:hover:bg-gray-700"
							}`}
						>
							<span className="text-2xl">{doc.emoji}</span>
							<AnimatePresence>
								{isSidebarOpen && (
									<motion.span
										initial={{ opacity: 0, width: 0 }}
										animate={{ opacity: 1, width: "auto" }}
										exit={{ opacity: 0, width: 0 }}
										transition={{ duration: 0.2 }}
										className="whitespace-nowrap overflow-hidden"
									>
										{doc.title}
									</motion.span>
								)}
							</AnimatePresence>
						</motion.button>
					))}
				</div>
			</motion.div>

			<motion.button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="absolute -right-4 top-6 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200 dark:border-gray-700"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				initial={false}
				animate={{ rotate: isSidebarOpen ? 0 : 180 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
			</motion.button>
		</div>
	);
};
