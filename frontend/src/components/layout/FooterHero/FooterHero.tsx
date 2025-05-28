import logo from "../../../../public/logo.png";

function Footer() {
	return (
		<footer className="Footer bg-base-200 w-screen ">
			<div className="Footer__container container mx-auto px-4 py-8">
				{/* Main Footer Grid */}
				<div className="Footer__main grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					{/* Branding Section */}
					<div className="Footer__branding md:col-span-1 lg:col-span-1 flex flex-col">
						<div className="Footer__logo-row flex items-center gap-1.5 mb-3">
							<div className="Footer__logo text-primary text-lg">
								<img
									src={logo}
									alt="Logo imagen"
									className="Footer__logo-img w-10"
								/>
							</div>
							<div className="Footer__brandname font-semibold text-base">
								JustDocIt
							</div>
						</div>

						<p className="Footer__description text-base-content/70 text-xs mb-4">
							Plataforma 100% online para generar documentación profesional de
							código sin necesidad de instalaciones. Conecta con GitHub,
							documenta y comparte.
						</p>

						<div className="Footer__socials flex gap-2">
							<a
								href="#"
								className="Footer__social w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
							>
								X
							</a>
							<a
								href="#"
								className="Footer__social w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
							>
								G
							</a>
							<a
								href="#"
								className="Footer__social w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
							>
								in
							</a>
							<a
								href="#"
								className="Footer__social w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
							>
								f
							</a>
						</div>
					</div>

					<div className="Footer__links flex justify-around w-[70vw] mt-5 ">
						{/* Product Links */}
						<div className="Footer__product flex flex-col md:pt-0">
							<h3 className="Footer__title font-semibold text-sm mb-3">
								Producto
							</h3>
							<div className="Footer__list flex flex-col gap-2">
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Características
								</a>
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Precios
								</a>
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Actualizaciones
								</a>
							</div>
						</div>
						{/* Resources Links */}
						<div className="Footer__resources flex flex-col pt-0 md:pt-0">
							<h3 className="Footer__title font-semibold text-sm mb-3">
								Recursos
							</h3>
							<div className="Footer__list flex flex-col gap-2">
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Documentación
								</a>
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Guías
								</a>
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Soporte
								</a>
							</div>
						</div>
						{/* Company Links */}
						<div className="Footer__company flex flex-col pt-0 md:pt-0">
							<h3 className="Footer__title font-semibold text-sm mb-3">
								Compañía
							</h3>
							<div className="Footer__list flex flex-col gap-2">
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Sobre nosotros
								</a>
								<a
									href="#"
									className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
								>
									Contacto
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className="Footer__bottom pt-4 border-t border-base-300 flex flex-col md:flex-row justify-between gap-3">
					<div className="Footer__copyright text-base-content/70 text-xs">
						© 2025 JustDocIt. Todos los derechos reservados.
					</div>
					<div className="Footer__legal flex flex-wrap gap-4">
						<a
							href="#"
							className="Footer__legal-item text-base-content/70 text-xs hover:text-base-content transition-colors"
						>
							Términos de servicio
						</a>
						<a
							href="#"
							className="Footer__legal-item text-base-content/70 text-xs hover:text-base-content transition-colors"
						>
							Política de privacidad
						</a>
						<a
							href="#"
							className="Footer__legal-item text-base-content/70 text-xs hover:text-base-content transition-colors"
						>
							Cookies
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
