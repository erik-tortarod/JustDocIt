import { motion } from "framer-motion";
import { BookOpen, Code2, FileText, Github } from "lucide-react";
import { DocContent } from "./types";

export const guideContent: DocContent = {
	emoji: "📚",
	title: "Guía de Uso",
	description:
		"Aprende a utilizar Just Doc It y sus características principales",
	sections: [
		{
			title: "¿Cómo Usar Just Doc It?",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{[
						{
							icon: <Github className="h-6 w-6" />,
							title: "Conecta tu Repositorio",
							description:
								"Autentícate con GitHub para acceder a tus repositorios públicos y privados.",
						},
						{
							icon: <Code2 className="h-6 w-6" />,
							title: "Selecciona el Lenguaje",
							description:
								"Elige entre TypeScript, JavaScript o Java para ver ejemplos específicos de documentación.",
						},
						{
							icon: <FileText className="h-6 w-6" />,
							title: "Aprende las Mejores Prácticas",
							description:
								"Explora ejemplos detallados de cómo documentar clases, interfaces, métodos y más.",
						},
						{
							icon: <BookOpen className="h-6 w-6" />,
							title: "Genera tu Documentación",
							description:
								"Aplica lo aprendido en tu código y genera documentación profesional automáticamente.",
						},
					].map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
						>
							<div className="flex items-center space-x-4 mb-4">
								<div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
									{step.icon}
								</div>
								<h3 className="text-lg font-semibold">{step.title}</h3>
							</div>
							<p className="text-gray-600 dark:text-gray-300">
								{step.description}
							</p>
						</motion.div>
					))}
				</div>
			),
			explanation:
				"Sigue estos pasos para comenzar a documentar tu código de manera profesional.",
		},
		{
			title: "Características Principales",
			content: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{[
						{
							title: "Multi-lenguaje",
							description: "Soporte para TypeScript, JavaScript y Java",
						},
						{
							title: "Integración con GitHub",
							description: "Accede y documenta tus repositorios directamente",
						},
						{
							title: "Actualizaciones en Tiempo Real",
							description:
								"Tu documentación se mantiene sincronizada con tu código",
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
						>
							<h3 className="font-semibold mb-2">{feature.title}</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			),
			explanation:
				"Descubre las características que hacen de Just Doc It la herramienta perfecta para tu documentación.",
		},
	],
};
