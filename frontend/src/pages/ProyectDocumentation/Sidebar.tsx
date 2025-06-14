import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowLeft } from "lucide-react";
import { LanguageDocs } from "./types";
import { Link } from "react-router-dom";

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
		<div className="relative absolute">
			<motion.div
				initial={false}
				animate={{ width: isSidebarOpen ? "16rem" : "4rem" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="bg-base-200 border-r border-base-300 shadow-lg p-4 h-screen flex flex-col"
			>
				<div className="space-y-4 flex-1">
					{Object.entries(docs).map(([lang, doc]) => (
						<motion.button
							key={lang}
							onClick={() => setActiveTab(lang)}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
								activeTab === lang
									? "bg-primary text-primary-content shadow-md"
									: "hover:bg-base-300"
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

				{/* Back Button */}
				<Link to="/dashboard" className="mt-auto w-full">
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="w-full flex items-center space-x-2 p-3 rounded-lg bg-base-300 hover:bg-base-400 transition-colors"
					>
						<ArrowLeft className="h-5 w-5" />
						<AnimatePresence>
							{isSidebarOpen && (
								<motion.span
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2 }}
									className="whitespace-nowrap overflow-hidden"
								>
									Volver al Dashboard
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</Link>
			</motion.div>

			<motion.button
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				className="absolute -right-4 top-6 bg-base-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10 border border-base-300"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				initial={false}
				animate={{ rotate: isSidebarOpen ? 0 : 180 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<ChevronLeft className="h-5 w-5 text-base-content" />
			</motion.button>
		</div>
	);
};
