import { useState, useEffect } from "react";

interface ProgressBarModalProps {
	isOpen: boolean;
	onClose: () => void;
	repoSize: number;
	language: string;
}

const ProgressBarModal = ({
	isOpen,
	onClose,
	repoSize,
	language,
}: ProgressBarModalProps) => {
	const [progress, setProgress] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const [statusMessage, setStatusMessage] = useState("Iniciando...");

	useEffect(() => {
		if (isOpen) {
			// Reiniciar estado cuando se abre el modal
			setProgress(0);
			setIsCompleted(false);
			setStatusMessage("Iniciando...");

			// Iniciar el seguimiento del progreso
			startProgressTracking(repoSize, language);
		}
	}, [isOpen, repoSize, language]);

	// Función que simula el seguimiento del progreso
	const startProgressTracking = (size: number, lang: string) => {
		// Determinar categoría del repo
		const isSmallRepo = size < 100;
		const isLargeRepo = size > 2000;

		// Establecer hitos de progreso adaptados al tamaño
		const milestones = [
			{
				percent: isSmallRepo ? 20 : 10,
				message: "Conectando con GitHub...",
			},
			{
				percent: isSmallRepo ? 40 : 25,
				message: "Analizando estructura del repositorio...",
			},
			{
				percent: isSmallRepo ? 70 : 50,
				message: `Procesando archivos de ${lang}...`,
			},
			{
				percent: isSmallRepo ? 85 : 75,
				message: "Generando documentación...",
			},
			{ percent: 95, message: "Finalizando..." },
			{ percent: 99, message: "Casi listo..." },
		];

		// Ajustar velocidad según tamaño
		const progressInterval = isSmallRepo ? 50 : isLargeRepo ? 150 : 100;
		let currentProgress = 0;
		let startTime = Date.now();

		// Función para actualizar el progreso gradualmente
		const updateProgress = () => {
			// Encontrar el próximo hito
			const nextMilestone = milestones.find((m) => m.percent > currentProgress);

			if (nextMilestone && currentProgress < 99) {
				// Actualizar progreso
				currentProgress += 1;
				setProgress(currentProgress);

				// Actualizar mensaje al llegar a un hito
				if (milestones.some((m) => m.percent === currentProgress)) {
					setStatusMessage(
						milestones.find((m) => m.percent === currentProgress)!.message,
					);
				}

				// Calcular siguiente intervalo - más lento cerca del final
				const nextInterval =
					currentProgress > 90 ? progressInterval * 1.5 : progressInterval;

				// Programar siguiente actualización
				setTimeout(updateProgress, nextInterval);
			} else if (currentProgress >= 99) {
				// Mantener en 99% hasta recibir confirmación real
				waitForCompletion();
			}
		};

		// Simular espera de finalización real
		const waitForCompletion = () => {
			// Para repos pequeños, asegurarse de que se vea por un tiempo mínimo
			const elapsedTime = Date.now() - startTime;
			const minDisplayTime = 1200; // 1.2 segundos mínimo

			if (isSmallRepo && elapsedTime < minDisplayTime) {
				setTimeout(() => {
					completeProgress();
				}, minDisplayTime - elapsedTime);
			} else {
				// Para repos normales o grandes, simular tiempo de finalización variable
				const completionTime = Math.min(size * 2, 3000); // Máximo 3 segundos de espera en 99%
				setTimeout(completeProgress, completionTime);
			}
		};

		// Finalizar el progreso
		const completeProgress = () => {
			setProgress(100);
			setIsCompleted(true);
			setStatusMessage("¡Documentación completada!");

			// Cerrar automáticamente el modal después de completar
			setTimeout(() => {
				onClose();
			}, 1500);
		};

		// Iniciar actualización de progreso
		setTimeout(updateProgress, 100);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-base-100 border border-base-300 rounded-lg shadow-xl w-full max-w-md p-6">
				<div className="text-center mb-4">
					<h3 className="text-lg font-semibold text-base-content mb-1">
						Documentando repositorio
					</h3>
					<p className="text-base-content/70 text-sm">
						Generando documentación para {language}
					</p>
				</div>

				<div className="mb-2 flex justify-between items-center">
					<span className="text-sm text-base-content/70">{statusMessage}</span>
					<span className="text-sm font-semibold text-base-content">
						{progress}%
					</span>
				</div>

				<div className="w-full bg-base-300 rounded-full h-2.5 mb-4">
					<div
						className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${
							isCompleted ? "bg-success" : "bg-primary"
						}`}
						style={{ width: `${progress}%` }}
					></div>
				</div>

				{isCompleted ? (
					<div className="mt-4 p-3 bg-success/10 border border-success text-success rounded-md text-sm">
						Documentación finalizada. ¡Puedes acceder a los resultados ahora!
					</div>
				) : (
					<div className="flex justify-end mt-4">
						<button
							onClick={onClose}
							className="px-4 py-2 text-sm bg-base-200 text-base-content rounded-md hover:bg-base-300 transition-colors"
						>
							Cancelar
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProgressBarModal;
