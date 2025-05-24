import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface INavSectionProps {
	title: string;
	children: ReactNode;
	isOpen: boolean;
}

function NavSection({ title, children, isOpen }: INavSectionProps) {
	return (
		<div className="mb-8">
			<AnimatePresence>
				{isOpen && (
					<motion.h3
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="text-xs uppercase text-base-content/60 font-semibold px-6 mb-2 mt-4"
					>
						{title}
					</motion.h3>
				)}
			</AnimatePresence>
			<nav className="flex flex-col gap-1">{children}</nav>
		</div>
	);
}

export default NavSection;
