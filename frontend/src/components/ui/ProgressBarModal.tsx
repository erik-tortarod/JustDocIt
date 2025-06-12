import { useState, useEffect } from "react";

interface ProgressBarModalProps {
	isOpen: boolean;
	onClose: () => void;
	repoSize: number;
	language: string;
	isProcessing: boolean;
	onComplete?: () => void;
}

const ProgressBarModal = ({
	isOpen,
	onClose,
	repoSize,
	language,
	isProcessing,
	onComplete,
}: ProgressBarModalProps) => {
	const [progress, setProgress] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const [statusMessage, setStatusMessage] = useState("Iniciando...");
	const [elapsedTime, setElapsedTime] = useState(0);

	const baseSpeed = {
		veryFast: 50,
		fast: 100,
		normal: 200,
		slow: 300,
		verySlow: 450,
	};

	// Para ajustar la velocidad global, modifica este valor
	// 1 = normal, < 1 = más rápido, > 1 = más lento
	const speedFactor = 1;

	// Función para formatear el tiempo en minutos y segundos
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	useEffect(() => {
		if (isOpen) {
			// Reiniciar estado cuando se abre el modal
			setProgress(0);
			setIsCompleted(false);
			setStatusMessage("Iniciando...");
			setElapsedTime(0);

			// Iniciar el seguimiento del progreso
			startProgressTracking(repoSize, language);

			// Iniciar el contador de tiempo
			const timer = setInterval(() => {
				setElapsedTime((prev) => prev + 1);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [isOpen, repoSize, language]);

	// Cuando cambia isProcessing de true a false, significa que el proceso terminó realmente
	useEffect(() => {
		if (isOpen && !isProcessing && progress >= 99) {
			// Solo completamos si estamos en 99% o más y el proceso real ha terminado
			completeProgress();
		}
	}, [isProcessing, isOpen, progress]);

	// Función para obtener el intervalo de tiempo según el progreso actual
	const getIntervalForProgress = (
		currentProgress: number,
		size: number,
	): number => {
		// Determinar categoría del repo
		const isSmallRepo = size < 100;
		const isLargeRepo = size > 2000;

		// Velocidad base según el tamaño del repositorio
		let interval: number;

		if (isSmallRepo) {
			interval = baseSpeed.fast;
		} else if (isLargeRepo) {
			interval = baseSpeed.slow;
		} else {
			interval = baseSpeed.normal;
		}

		// Ajustar según la etapa del progreso
		if (currentProgress < 30) {
			// Inicio: más rápido
			return interval * 0.8 * speedFactor;
		} else if (currentProgress < 60) {
			// Medio: velocidad normal
			return interval * speedFactor;
		} else if (currentProgress < 85) {
			// Avanzado: un poco más lento
			return interval * 1.3 * speedFactor;
		} else {
			// Final: mucho más lento
			return interval * 1.8 * speedFactor;
		}
	};

	// Función que simula el seguimiento del progreso
	const startProgressTracking = (size: number, lang: string) => {
		// Determinar categoría del repo
		const isSmallRepo = size < 100;

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

		let currentProgress = 0;

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

				// Calcular siguiente intervalo basado en el progreso actual
				const nextInterval = getIntervalForProgress(currentProgress, size);

				// Programar siguiente actualización
				setTimeout(updateProgress, nextInterval);
			} else if (currentProgress >= 99) {
				// Quedarse en 99% hasta que isProcessing cambie a false
				setProgress(99);
				setStatusMessage("Esperando finalización del proceso...");

				// No hacemos nada más aquí, esperamos a que el proceso real termine
				// Esto se detectará en el useEffect que observa isProcessing
			}
		};

		// Iniciar actualización de progreso
		setTimeout(updateProgress, 100);
	};

	const completeProgress = () => {
		setProgress(100);
		setIsCompleted(true);
		setStatusMessage("¡Documentación completada!");

		// Notificar que se ha completado
		if (onComplete) {
			onComplete();
		}

		// Cerrar automáticamente el modal después de mostrar el éxito
		setTimeout(() => {
			onClose();
		}, 2000);
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
					<div className="flex items-center gap-2">
						<span className="text-sm text-base-content/70">
							{formatTime(elapsedTime)}
						</span>
						<span className="text-sm font-semibold text-base-content">
							{progress}%
						</span>
					</div>
				</div>

				<div className="w-full bg-base-300 rounded-full h-2.5 mb-4">
					<div
						className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${
							isCompleted ? "bg-success" : "bg-primary"
						}`}
						style={{ width: `${progress}%` }}
					></div>
				</div>

				{isCompleted && (
					<div className="mt-4 p-3 bg-success/10 border border-success text-success rounded-md text-sm">
						Documentación finalizada. ¡Puedes acceder a los resultados ahora!
					</div>
				)}
			</div>
		</div>
	);
};

export default ProgressBarModal;
