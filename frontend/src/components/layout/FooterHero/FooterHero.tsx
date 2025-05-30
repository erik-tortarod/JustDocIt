import logo from "../../../../public/logo.png";
import { motion } from "framer-motion";

function Footer() {
	const containerVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
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
		<motion.footer
			className="Footer bg-base-200 w-screen"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			variants={containerVariants}
		>
			<div className="Footer__container container mx-auto px-4 py-8">
				{/* Main Footer Grid */}
				<div className="Footer__main grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					{/* Branding Section */}
					<motion.div
						className="Footer__branding md:col-span-1 lg:col-span-1 flex flex-col"
						variants={itemVariants}
					>
						<div className="Footer__logo-row flex items-center gap-1.5 mb-3">
							<motion.div
								className="Footer__logo text-primary text-lg"
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.5 }}
							>
								<img
									src={logo}
									alt="Logo imagen"
									className="Footer__logo-img w-10"
								/>
							</motion.div>
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
							{["X", "G", "in", "f"].map((social, index) => (
								<motion.a
									key={social}
									href="#"
									className="Footer__social w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
									whileHover={{ scale: 1.2, rotate: 360 }}
									whileTap={{ scale: 0.9 }}
									transition={{ duration: 0.3 }}
								>
									{social}
								</motion.a>
							))}
						</div>
					</motion.div>

					<motion.div
						className="Footer__links flex justify-around w-[70vw] mt-5"
						variants={itemVariants}
					>
						{/* Product Links */}
						<div className="Footer__product flex flex-col md:pt-0">
							<h3 className="Footer__title font-semibold text-sm mb-3">
								Producto
							</h3>
							<div className="Footer__list flex flex-col gap-2">
								{["Características", "Precios", "Actualizaciones"].map(
									(item) => (
										<motion.a
											key={item}
											href="#"
											className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
											whileHover={{ x: 5 }}
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 10,
											}}
										>
											{item}
										</motion.a>
									),
								)}
							</div>
						</div>
						{/* Resources Links */}
						<div className="Footer__resources flex flex-col pt-0 md:pt-0">
							<h3 className="Footer__title font-semibold text-sm mb-3">
								Recursos
							</h3>
							<div className="Footer__list flex flex-col gap-2">
								{["Documentación", "Guías", "Soporte"].map((item) => (
									<motion.a
										key={item}
										href="#"
										className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
										whileHover={{ x: 5 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 10,
										}}
									>
										{item}
									</motion.a>
								))}
							</div>
						</div>
						{/* Company Links */}
						<div className="Footer__company flex flex-col pt-0 md:pt-0">
							<h3 className="Footer__title font-semibold text-sm mb-3">
								Compañía
							</h3>
							<div className="Footer__list flex flex-col gap-2">
								{["Sobre nosotros", "Contacto"].map((item) => (
									<motion.a
										key={item}
										href="#"
										className="Footer__item text-base-content/70 hover:text-base-content transition-colors text-xs"
										whileHover={{ x: 5 }}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 10,
										}}
									>
										{item}
									</motion.a>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				{/* Footer Bottom */}
				<motion.div
					className="Footer__bottom pt-4 border-t border-base-300 flex flex-col md:flex-row justify-between gap-3"
					variants={itemVariants}
				>
					<div className="Footer__copyright text-base-content/70 text-xs">
						© 2025 JustDocIt. Todos los derechos reservados.
					</div>
					<div className="Footer__legal flex flex-wrap gap-4">
						{["Términos de servicio", "Política de privacidad", "Cookies"].map(
							(item) => (
								<motion.a
									key={item}
									href="#"
									className="Footer__legal-item text-base-content/70 text-xs hover:text-base-content transition-colors"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{item}
								</motion.a>
							),
						)}
					</div>
				</motion.div>
			</div>
		</motion.footer>
	);
}

export default Footer;
