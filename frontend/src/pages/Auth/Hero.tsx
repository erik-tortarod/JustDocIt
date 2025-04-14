import { API_ROUTES } from "../../config/api-routes";

function Hero() {
	const userLogin = () => {
		window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
	};

	return (
		<section className="py-8 px-4 w-screen">
			<div className="flex flex-col lg:flex-row gap-12 items-center px-4">
				{/* Hero Content - Left Side */}
				<div className="flex-1">
					<h1 className="text-5xl font-bold leading-tight mb-6">
						Genera{" "}
						<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
							documentación profesional
						</span>{" "}
						sin instalaciones
					</h1>

					<p className="text-lg text-base-content/70 mb-8">
						JustDocIt es una plataforma 100% online que documenta tu código con
						un solo clic. Conecta tu repositorio de GitHub, selecciona tu
						lenguaje de programación y obtén documentación profesional lista
						para compartir.
					</p>

					<div className="flex gap-4 mb-16">
						<button className="btn btn-primary" onClick={userLogin}>
							Comienza Ahora
						</button>
						<button className="btn btn-outline">Ver Demo</button>
					</div>

					{/* Stats Section */}
					<div className="flex justify-between items-center gap-8">
						<div className="text-center">
							<div className="text-4xl font-bold text-primary mb-2">99.9%</div>
							<div className="text-sm text-base-content/70">
								Tiempo de actividad
								<br />
								garantizado
							</div>
						</div>

						<div className="text-center">
							<div className="text-4xl font-bold text-primary mb-2">15K+</div>
							<div className="text-sm text-base-content/70">
								Repositorios
								<br />
								documentados
							</div>
						</div>

						<div className="text-center">
							<div className="text-4xl font-bold text-primary mb-2">12</div>
							<div className="text-sm text-base-content/70">
								Lenguajes
								<br />
								soportados
							</div>
						</div>
					</div>
				</div>

				{/* Hero Image - Right Side */}
				<div className="flex-1">
					<div className="bg-base-200 rounded-lg overflow-hidden shadow-2xl border border-base-300">
						{/* Browser Header */}
						<div className="bg-base-300 p-3 flex items-center gap-4">
							<div className="flex gap-2">
								<div className="w-3 h-3 rounded-full bg-error"></div>
								<div className="w-3 h-3 rounded-full bg-warning"></div>
								<div className="w-3 h-3 rounded-full bg-success"></div>
							</div>

							<div className="bg-base-100/10 rounded px-3 py-1 text-xs flex items-center gap-1">
								<div className="w-3 h-3 rounded-full bg-primary"></div>
								<span>JustDocIt - Documentación</span>
							</div>

							<div className="flex-1 bg-base-100/20 rounded px-3 py-1 text-xs flex items-center">
								<span className="text-success mr-2">🔒</span>
								<span>justdocit.io/documentation/miproyecto</span>
							</div>
						</div>

						{/* Code Window */}
						<div className="p-6 font-mono text-sm">
							<div className="text-base-content/50">/**</div>
							<div className="text-base-content/50"> * @class Proyecto</div>
							<div className="text-base-content/50">
								{" "}
								* @description Gestiona la integración con GitHub
							</div>
							<div className="text-base-content/50"> */</div>
							<div>
								<span className="text-secondary">class</span>{" "}
								<span className="text-primary">Proyecto</span> {"{"}
							</div>
							<div>
								&nbsp;&nbsp;
								<span className="text-primary">constructor</span>() {"{"}
							</div>
							<div>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<span className="text-secondary">this</span>.
								<span className="text-error">docs</span> ={" "}
								<span className="text-secondary">new</span>{" "}
								<span className="text-primary">JustDocIt</span>();
							</div>
							<div>&nbsp;&nbsp;{"}"}</div>
							<div></div>
							<div>
								&nbsp;&nbsp;
								<span className="text-primary">generarDocs</span>() {"{"}
							</div>
							<div>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<span className="text-secondary">return</span>{" "}
								<span className="text-secondary">this</span>.
								<span className="text-error">docs</span>.
								<span className="text-primary">build</span>();
							</div>
							<div>&nbsp;&nbsp;{"}"}</div>
							<div>{"}"}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
