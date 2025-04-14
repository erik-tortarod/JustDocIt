import logo from "../../../../public/logo.png";

function Footer() {
   return (
      <footer className="bg-base-200 w-screen ">
         <div className="container mx-auto px-4 py-8">
            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
               {/* Branding Section */}
               <div className="md:col-span-1 lg:col-span-1 flex flex-col">
                  <div className="flex items-center gap-1.5 mb-3">
                     <div className="text-primary text-lg">
                        <img src={logo} alt="Logo imagen" className="w-10" />
                     </div>
                     <div className="font-semibold text-base">JustDocIt</div>
                  </div>

                  <p className="text-base-content/70 text-xs mb-4">
                     Plataforma 100% online para generar documentación
                     profesional de código sin necesidad de instalaciones.
                     Conecta con GitHub, documenta y comparte.
                  </p>

                  <div className="flex gap-2">
                     <a
                        href="#"
                        className="w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
                     >
                        X
                     </a>
                     <a
                        href="#"
                        className="w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
                     >
                        G
                     </a>
                     <a
                        href="#"
                        className="w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
                     >
                        in
                     </a>
                     <a
                        href="#"
                        className="w-7 h-7 bg-base-300 rounded-full flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white transition-colors text-xs"
                     >
                        f
                     </a>
                  </div>
               </div>

               <div className="flex justify-around w-[70vw] mt-5 ">
                  {/* Product Links */}
                  <div className="flex flex-col md:pt-0">
                     <h3 className="font-semibold text-sm mb-3">Producto</h3>
                     <div className="flex flex-col gap-2">
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Características
                        </a>
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Precios
                        </a>
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Actualizaciones
                        </a>
                     </div>
                  </div>
                  {/* Resources Links */}
                  <div className="flex flex-col pt-0 md:pt-0">
                     <h3 className="font-semibold text-sm mb-3">Recursos</h3>
                     <div className="flex flex-col gap-2">
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Documentación
                        </a>
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Guías
                        </a>
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Soporte
                        </a>
                     </div>
                  </div>
                  {/* Company Links */}
                  <div className="flex flex-col pt-0 md:pt-0">
                     <h3 className="font-semibold text-sm mb-3">Compañía</h3>
                     <div className="flex flex-col gap-2">
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Sobre nosotros
                        </a>
                        <a
                           href="#"
                           className="text-base-content/70 hover:text-base-content transition-colors text-xs"
                        >
                           Contacto
                        </a>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Bottom */}
            <div className="pt-4 border-t border-base-300 flex flex-col md:flex-row justify-between gap-3">
               <div className="text-base-content/70 text-xs">
                  © 2025 JustDocIt. Todos los derechos reservados.
               </div>
               <div className="flex flex-wrap gap-4">
                  <a
                     href="#"
                     className="text-base-content/70 text-xs hover:text-base-content transition-colors"
                  >
                     Términos de servicio
                  </a>
                  <a
                     href="#"
                     className="text-base-content/70 text-xs hover:text-base-content transition-colors"
                  >
                     Política de privacidad
                  </a>
                  <a
                     href="#"
                     className="text-base-content/70 text-xs hover:text-base-content transition-colors"
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
