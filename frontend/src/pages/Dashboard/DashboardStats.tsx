import { motion } from "framer-motion";

function DashboardStats({
	title,
	amount,
	stat,
}: {
	title: string;
	amount: number;
	stat: string;
}) {
	return (
		<motion.article
			className="border border-base-content rounded p-6 py-2 pt-0 w-full"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
		>
			<motion.h2
				className="text-sm mb-2 text-base-content"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{title}
			</motion.h2>
			<motion.h3
				className="text-3xl font-bold mb-2"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{amount}
			</motion.h3>
			<motion.h3
				className="text-sm flex items-center"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			>
				{stat}
			</motion.h3>
		</motion.article>
	);
}

export default DashboardStats;
