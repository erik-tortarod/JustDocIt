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
			className="bg-base-200 rounded-xl border border-base-700 transition-all hover:translate-y-[-5px] hover:shadow-xl p-6 w-full relative overflow-hidden"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -mr-16 -mt-16"></div>
			<div className="relative z-10">
				<motion.h2
					className="text-sm font-medium text-base-content/70 uppercase tracking-wider mb-4"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					{title}
				</motion.h2>
				<motion.h3
					className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{amount.toLocaleString()}
				</motion.h3>
				<motion.p
					className="text-sm text-base-content/60"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{stat}
				</motion.p>
			</div>
		</motion.article>
	);
}

export default DashboardStats;
