import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface INavLinkProps {
	icon: ReactNode;
	text: string;
	active?: boolean;
	href?: string;
	isOpen: boolean;
}

function NavLink({
	icon,
	text,
	active = false,
	href = "#",
	isOpen,
}: INavLinkProps) {
	return (
		<div>
			<a
				href={href}
				className={`flex items-center gap-3 py-2 px-6 decoration-transparent text-base-content/70 hover:text-base-content hover:bg-primary/10 transition-all relative decoration-none ${
					active
						? "text-base-content bg-primary/10 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary"
						: ""
				}`}
			>
				<span className="text-xl">{icon}</span>
				<AnimatePresence>
					{isOpen && (
						<motion.span
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							exit={{ opacity: 0, width: 0 }}
							transition={{ duration: 0.2 }}
						>
							{text}
						</motion.span>
					)}
				</AnimatePresence>
			</a>
		</div>
	);
}

export default NavLink;
