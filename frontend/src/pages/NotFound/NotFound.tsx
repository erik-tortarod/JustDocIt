import { ArrowLeft, Home } from "lucide-react";

function NotFound() {
   return (
      <div className="w-screen min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-16">
         {/* Contenedor principal con efecto de tarjeta */}
         <div className="max-w-lg w-full bg-base-100 rounded-xl shadow-xl p-8 text-center relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 rounded-full opacity-50"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-secondary/10 rounded-full opacity-50"></div>

            {/* Círculo de error */}
            <div className="relative mx-auto mb-6 w-32 h-32 rounded-full bg-error/10 flex items-center justify-center border-4 border-error/20 pt-12">
               <h1 className="text-6xl font-bold text-error">404</h1>
            </div>

            {/* Mensaje principal */}
            <h2 className="text-2xl font-bold text-base-content mb-3">
               ¡Ups! Página no encontrada
            </h2>
            <p className="text-base-content/70 mb-8">
               Lo sentimos, pero la página que estás buscando no existe o ha
               sido movida.
            </p>

            {/* Botones de navegación */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
               <button
                  onClick={() => window.history.back()}
                  className="btn btn-outline btn-primary"
               >
                  <ArrowLeft size={18} />
                  <span>Volver atrás</span>
               </button>
               <a href="/" className="btn btn-primary">
                  <Home size={18} />
                  <span>Ir al inicio</span>
               </a>
            </div>
         </div>

         {/* Mensaje adicional */}
         <p className="mt-6 text-sm text-base-content/70">
            ¿Necesitas ayuda?{" "}
            <a href="/contact" className="text-primary hover:underline">
               Contáctanos
            </a>
         </p>
      </div>
   );
}

export default NotFound;
