import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import logo from "../../../../public/logo.png";

//COMPONENTS
import NavSection from "../../ui/NavSection";
import NavLink from "../../ui/NavLink";
import { IUser } from "../../../types/interfaces";
import { Link } from "react-router-dom";

function Sidebar({ userData }: { userData: IUser }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<div className="relative">
			<motion.aside
				initial={false}
				animate={{ width: isSidebarOpen ? "16rem" : "4rem" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="bg-base-200 border-r border-base-300/10 py-6 flex flex-col h-screen sticky top-0"
			>
				{/* Logo */}
				<Link to="/" className="decoration-transparent">
					<div className="flex items-center gap-3 font-bold text-lg px-6 mt-[-2rem] mb-[-1rem]">
						<div className="flex items-center justify-center text-primary">
							<img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
						</div>
						<AnimatePresence>
							{isSidebarOpen && (
								<motion.div
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2 }}
									className="flex items-center"
								>
									JustDocIt
									<span className="inline-flex items-center bg-gradient-to-r from-secondary to-primary text-white px-2 py-0.5 rounded-full text-[10px] font-semibold ml-2 uppercase tracking-wider">
										<span className="w-1.5 h-1.5 bg-success rounded-full mr-1 animate-pulse"></span>
										Online
									</span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</Link>

				{/* Navegación */}
				<NavSection title="General" isOpen={isSidebarOpen}>
					<Link to="/dashboard" className="decoration-transparent">
						<NavLink icon="📊" text="Dashboard" isOpen={isSidebarOpen} />
					</Link>
					<Link to="/proyect_docs" className="decoration-transparent">
						<NavLink icon="📑" text="Documentation" isOpen={isSidebarOpen} />
					</Link>
					<NavLink icon="🔄" text="Integraciones" isOpen={isSidebarOpen} />
				</NavSection>

				<NavSection title="Personal" isOpen={isSidebarOpen}>
					<Link to="/user" className="decoration-transparent">
						<NavLink icon="👤" text="Perfil" isOpen={isSidebarOpen} />
					</Link>
					<NavLink icon="⚙️" text="Configuración" isOpen={isSidebarOpen} />
				</NavSection>

				{/* Perfil de usuario */}
				<div className="mt-auto px-6 flex items-center gap-3">
					<div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold overflow-hidden">
						<img src={userData.avatarUrl} alt={userData.username.slice(0, 2)} />
					</div>
					<AnimatePresence>
						{isSidebarOpen && (
							<motion.div
								initial={{ opacity: 0, width: 0 }}
								animate={{ opacity: 1, width: "auto" }}
								exit={{ opacity: 0, width: 0 }}
								transition={{ duration: 0.2 }}
								className="overflow-hidden"
							>
								<div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
									{userData.username}
								</div>
								<div className="text-xs text-base-content/60 whitespace-nowrap overflow-hidden text-ellipsis">
									{userData.email}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Botón de toggle fijo a la sidebar */}
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
			</motion.aside>
		</div>
	);
}

export default Sidebar;
