import { ArrowLeft, Home } from "lucide-react";

function NotFound() {
	return (
		<div className="w-screen min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-16">
			{/* Contenedor principal con efecto de tarjeta */}
			<div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-8 text-center relative overflow-hidden">
				{/* Decoración de fondo */}
				<div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-100 rounded-full opacity-50"></div>
				<div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>

				{/* Círculo de error */}
				<div className="relative mx-auto mb-6 w-32 h-32 rounded-full bg-red-50 flex items-center justify-center border-4 border-red-100 pt-12">
					<h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
						404
					</h1>
				</div>

				{/* Mensaje principal */}
				<h2 className="text-2xl font-bold text-gray-800 mb-3">
					¡Ups! Página no encontrada
				</h2>
				<p className="text-gray-600 mb-8">
					Lo sentimos, pero la página que estás buscando no existe o ha sido
					movida.
				</p>

				{/* Botones de navegación */}
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<button
						onClick={() => window.history.back()}
						className="btn btn-outline border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
					>
						<ArrowLeft size={18} />
						<span>Volver atrás</span>
					</button>
					<a
						href="/"
						className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
					>
						<Home size={18} />
						<span>Ir al inicio</span>
					</a>
				</div>
			</div>

			{/* Mensaje adicional */}
			<p className="mt-6 text-sm text-gray-500">
				¿Necesitas ayuda?{" "}
				<a href="/contact" className="text-indigo-600 hover:underline">
					Contáctanos
				</a>
			</p>
		</div>
	);
}

export default NotFound;
