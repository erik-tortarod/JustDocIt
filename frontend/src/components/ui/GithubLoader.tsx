import { useState, useEffect } from "react";

const GithubProgressBar = ({ repoSize, lenguaje }) => {
   const [progress, setProgress] = useState(0);
   const [isCompleted, setIsCompleted] = useState(false);
   const [statusMessage, setStatusMessage] = useState("Iniciando...");

   useEffect(() => {
      // Iniciar el seguimiento del progreso
      startProgressTracking(repoSize, lenguaje);
   }, [repoSize, lenguaje]);

   // Función que simula el seguimiento del progreso
   const startProgressTracking = (size, lang) => {
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
         const nextMilestone = milestones.find(
            (m) => m.percent > currentProgress
         );

         if (nextMilestone && currentProgress < 99) {
            // Actualizar progreso
            currentProgress += 1;
            setProgress(currentProgress);

            // Actualizar mensaje al llegar a un hito
            if (milestones.some((m) => m.percent === currentProgress)) {
               setStatusMessage(
                  milestones.find((m) => m.percent === currentProgress).message
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
      };

      // Iniciar actualización de progreso
      setTimeout(updateProgress, 100);
   };

   return (
      <div className="w-full max-w-md p-4">
         <div className="mb-1 flex justify-between items-center">
            <span className="text-sm text-gray-700">{statusMessage}</span>
            <span className="text-sm font-semibold text-gray-700">
               {progress}%
            </span>
         </div>

         <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
               className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                  isCompleted ? "bg-green-500" : "bg-blue-600"
               }`}
               style={{ width: `${progress}%` }}
            ></div>
         </div>

         {isCompleted && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
               Documentación finalizada. ¡Puedes acceder a los resultados ahora!
            </div>
         )}
      </div>
   );
};

export default GithubProgressBar;
