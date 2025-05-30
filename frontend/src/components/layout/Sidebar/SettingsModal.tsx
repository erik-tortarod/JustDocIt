import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const [activeTab, setActiveTab] = useState<"theme" | "language">("theme");
	const [currentTheme, setCurrentTheme] = useState(() => {
		return document.documentElement.getAttribute("data-theme") || "light";
	});

	const handleThemeChange = (theme: string) => {
		document.documentElement.setAttribute("data-theme", theme);
		setCurrentTheme(theme);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				className="relative bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6"
			>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold">Configuración</h2>
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
							className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto"
						>
							{themes.map((theme) => (
								<button
									key={theme.name}
									onClick={() => handleThemeChange(theme.name)}
									className={`btn btn-outline ${
										currentTheme === theme.name ? "btn-primary" : ""
									}`}
								>
									{theme.label}
								</button>
							))}
						</motion.div>
					)}
					{activeTab === "language" && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="text-center py-8"
						>
							<p className="text-base-content/60">
								La selección de idioma estará disponible próximamente.
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}

export default SettingsModal;
