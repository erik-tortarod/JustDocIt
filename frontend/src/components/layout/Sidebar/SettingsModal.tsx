import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ThemeButton from "../../ui/ThemeButton";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const themes = [
	{ name: "light", label: "Claro" },
	{ name: "dark", label: "Oscuro" },
	{ name: "autumn", label: "Otoño" },
	{ name: "dim", label: "Dim" },
	{ name: "abyss", label: "Abismo" },
];

const languages = [
	{ code: "es", label: "Español 🇪🇸" },
	{ code: "en", label: "English 🇺🇸" },
];

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const { i18n } = useTranslation();
	const [activeTab, setActiveTab] = useState<"theme" | "language">("theme");
	const [currentTheme, setCurrentTheme] = useState(() => {
		return document.documentElement.getAttribute("data-theme") || "light";
	});

	const handleThemeChange = (theme: string) => {
		document.documentElement.setAttribute("data-theme", theme);
		setCurrentTheme(theme);
		localStorage.setItem("theme", theme);
	};

	const handleLanguageChange = (language: string) => {
		i18n.changeLanguage(language);
		localStorage.setItem("language", language);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				className="relative bg-base-100 rounded-lg shadow-xl w-[90%] max-w-md p-4 sm:p-6 mx-4"
			>
				<div className="flex justify-between items-center mb-4 sm:mb-6">
					<h2 className="text-lg sm:text-xl font-bold">Configuración</h2>
					<button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
						✕
					</button>
				</div>

				<div className="tabs tabs-boxed mb-4">
					<button
						className={`tab ${activeTab === "theme" ? "tab-active" : ""}`}
						onClick={() => setActiveTab("theme")}
					>
						Tema
					</button>
					<button
						className={`tab ${activeTab === "language" ? "tab-active" : ""}`}
						onClick={() => setActiveTab("language")}
					>
						Idioma
					</button>
				</div>

				<AnimatePresence mode="wait">
					{activeTab === "theme" && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="grid grid-cols-1 sm:grid-cols-2 gap-3"
						>
							{themes.map((theme) => (
								<ThemeButton
									key={theme.name}
									theme={theme.name}
									label={theme.label}
									isSelected={currentTheme === theme.name}
									onClick={() => handleThemeChange(theme.name)}
								/>
							))}
						</motion.div>
					)}
					{activeTab === "language" && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="grid grid-cols-1 gap-3"
						>
							{languages.map((language) => (
								<button
									key={language.code}
									onClick={() => handleLanguageChange(language.code)}
									className={`btn btn-lg w-full transition-all duration-200 ${
										i18n.language === language.code
											? "btn-primary shadow-lg scale-[1.02]"
											: "btn-ghost hover:bg-base-200"
									}`}
								>
									<div className="flex items-center justify-center gap-3">
										<span className="text-2xl">
											{language.label.split(" ")[1]}
										</span>
										<span className="text-lg font-medium">
											{language.label.split(" ")[0]}
										</span>
									</div>
								</button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}

export default SettingsModal;
