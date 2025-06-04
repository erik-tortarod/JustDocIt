import { useFeatures, useSteps } from "../../data/featuresData";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { API_ROUTES } from "@/config/api-routes";

/**
 * Component for displaying application features and how it works.
 */
function Features() {
	const { t } = useTranslation();
	const features = useFeatures();
	const steps = useSteps();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<section className="mx-auto py-20 px-4 w-screen">
			<motion.h2
				className="text-3xl font-bold text-center mb-16 relative"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<span className="relative inline-block">
					{t("features.title")}
					<motion.span
						className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-30"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					/>
				</span>
			</motion.h2>

			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-16"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
			>
				{features.map((feature, index) => (
					<motion.div
						key={index}
						variants={itemVariants}
						className="bg-base-200 p-8 rounded-lg border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
						whileHover={{ scale: 1.02 }}
					>
						<motion.div
							className="w-12 h-12 bg-primary/20 text-primary flex items-center justify-center rounded-xl text-2xl mb-6"
							whileHover={{ rotate: 360 }}
							transition={{ duration: 0.5 }}
						>
							{feature.icon}
						</motion.div>
						<h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
						<p className="text-base-content/70">{feature.description}</p>
					</motion.div>
				))}
			</motion.div>

			{/* How it works section */}
			<div className="mt-32 mb-12">
				<motion.h2
					className="text-3xl font-bold text-center mb-16 relative"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<span className="relative inline-block">
						{t("features.howItWorks.title")}
						<motion.span
							className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-30"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 0.8, delay: 0.3 }}
						/>
					</span>
				</motion.h2>

				<motion.div
					className="max-w-3xl mx-auto relative"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{/* Vertical timeline line */}
					<motion.div
						className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-secondary opacity-30"
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						transition={{ duration: 1, delay: 0.5 }}
					/>

					<div className="space-y-16">
						{steps.map((step, index) => (
							<motion.div
								key={index}
								className="flex gap-8"
								variants={itemVariants}
							>
								<motion.div
									className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center font-bold text-xl z-10 flex-shrink-0"
									whileHover={{ scale: 1.1 }}
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 10,
									}}
								>
									{step.number}
								</motion.div>
								<div className="pt-2">
									<h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
									<p className="text-base-content/70">
										{step.description}{" "}
										<span className="text-primary">{step.highlight}</span>,
										{step.number === 1 &&
											t("features.howItWorks.step1.additional")}
										{step.number === 2 &&
											t("features.howItWorks.step2.additional")}
										{step.number === 3 &&
											t("features.howItWorks.step3.additional")}
										{step.number === 4 &&
											t("features.howItWorks.step4.additional")}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			{/* CTA Section */}
			<motion.div
				className="mt-32 text-center"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
			>
				<h2 className="text-4xl font-bold mb-6">{t("features.cta.title")}</h2>
				<p className="text-lg text-base-content/70 mb-10 max-w-2xl mx-auto">
					{t("features.cta.description")}
				</p>
				<div
					className="flex gap-6 justify-center"
					onClick={() => {
						window.location.href = API_ROUTES.AUTH.LOGIN;
					}}
				>
					<motion.button
						className="btn btn-primary btn-lg"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{t("features.cta.startFree")}
					</motion.button>
				</div>
			</motion.div>
		</section>
	);
}

export default Features;
