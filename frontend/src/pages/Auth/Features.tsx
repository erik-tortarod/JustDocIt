import { useFeatures, useSteps } from "../../data/featuresData";
import { useTranslation } from "react-i18next";

/**
 * Component for displaying application features and how it works.
 */
function Features() {
	const { t } = useTranslation();
	const features = useFeatures();
	const steps = useSteps();

	return (
		<section className="mx-auto py-20 px-4 w-screen ">
			<h2 className="text-3xl font-bold text-center mb-16 relative">
				<span className="relative inline-block">
					{t("features.title")}
					<span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-30"></span>
				</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-16">
				{features.map((feature, index) => (
					<div
						key={index}
						className="bg-base-200 p-8 rounded-lg border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
					>
						<div className="w-12 h-12 bg-primary/20 text-primary flex items-center justify-center rounded-xl text-2xl mb-6">
							{feature.icon}
						</div>
						<h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
						<p className="text-base-content/70">{feature.description}</p>
					</div>
				))}
			</div>

			{/* How it works section */}
			<div className="mt-32 mb-12">
				<h2 className="text-3xl font-bold text-center mb-16 relative">
					<span className="relative inline-block">
						{t("features.howItWorks.title")}
						<span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-30"></span>
					</span>
				</h2>

				<div className="max-w-3xl mx-auto relative">
					{/* Vertical timeline line */}
					<div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-secondary opacity-30"></div>

					<div className="space-y-16">
						{steps.map((step, index) => (
							<div key={index} className="flex gap-8">
								<div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center font-bold text-xl z-10 flex-shrink-0">
									{step.number}
								</div>
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
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="mt-32 text-center">
				<h2 className="text-4xl font-bold mb-6">{t("features.cta.title")}</h2>
				<p className="text-lg text-base-content/70 mb-10 max-w-2xl mx-auto">
					{t("features.cta.description")}
				</p>
				<div className="flex gap-6 justify-center">
					<button className="btn btn-primary btn-lg">
						{t("features.cta.startFree")}
					</button>
					<button className="btn btn-outline btn-lg">
						{t("features.cta.viewPremium")}
					</button>
				</div>
			</div>
		</section>
	);
}

export default Features;
