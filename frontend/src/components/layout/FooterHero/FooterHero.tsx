import logo from "../../../../public/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Github, Linkedin, Facebook, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type LegalModalType =
   | "Términos de servicio"
   | "Política de privacidad"
   | "Cookies";

interface LegalContent {
   title: string;
   content: string[];
}

interface LegalContentMap {
   [key: string]: LegalContent;
}

function Footer() {
   const [activeModal, setActiveModal] = useState<LegalModalType | null>(null);
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
   }, []);

   const containerVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.15,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 15 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            ease: "easeOut",
         },
      },
   };

   const modalVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: {
            duration: 0.3,
            ease: "easeOut",
         },
      },
      exit: {
         opacity: 0,
         scale: 0.8,
         transition: {
            duration: 0.2,
            ease: "easeIn",
         },
      },
   };

   const legalContent: LegalContentMap = {
      "Términos de servicio": {
         title: "Términos de Servicio",
         content: [
            "JustDocIt es una plataforma gratuita y de código abierto diseñada para ayudar a desarrolladores a documentar su código de manera eficiente.",
            "Al utilizar nuestro servicio, aceptas:",
            "- Usar la plataforma de manera ética y responsable",
            "- No realizar acciones que puedan dañar la plataforma o a otros usuarios",
            "- Respetar los derechos de autor y licencias de los proyectos que documentes",
            "- Contribuir a mejorar la comunidad de desarrolladores",
            "Nos reservamos el derecho de modificar estos términos en cualquier momento, notificando a los usuarios de cambios significativos.",
         ],
      },
      "Política de privacidad": {
         title: "Política de Privacidad",
         content: [
            "En JustDocIt, valoramos tu privacidad. Nuestra política es simple y transparente:",
            "- No recopilamos datos personales innecesarios",
            "- Solo almacenamos la información esencial para el funcionamiento del servicio",
            "- No compartimos ni vendemos datos de usuarios",
            "- No utilizamos cookies de seguimiento",
            "- Los datos de autenticación de GitHub se utilizan únicamente para acceder a tus repositorios",
            "- Puedes solicitar la eliminación de tus datos en cualquier momento",
            "Tu privacidad es importante para nosotros y nos comprometemos a mantenerla.",
         ],
      },
      Cookies: {
         title: "Política de Cookies",
         content: [
            "JustDocIt utiliza un mínimo de cookies esenciales:",
            "- Cookies de sesión para mantener tu sesión activa",
            "- Cookies de preferencias para recordar tu configuración",
            "No utilizamos cookies de seguimiento, publicidad o análisis.",
            "Todas las cookies que utilizamos son necesarias para el funcionamiento básico de la plataforma y no recopilan información personal.",
         ],
      },
   };

   return (
      <motion.footer
         className="Footer bg-base-200/95 backdrop-blur-sm w-screen"
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-100px" }}
         variants={containerVariants}
      >
         <div className="Footer__container container mx-auto px-6 py-12">
            {/* Main Footer Content */}
            <div className="Footer__main flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
               {/* Branding Section */}
               <motion.div
                  className="Footer__branding flex flex-col items-center"
                  variants={itemVariants}
               >
                  <div className="Footer__logo-row flex items-center gap-3 mb-5">
                     <motion.div
                        className="Footer__logo text-primary"
                        whileHover={{
                           rotate: 360,
                           scale: 1.05,
                           transition: { duration: 0.6, ease: "easeInOut" },
                        }}
                     >
                        <img
                           src={logo}
                           alt="Logo imagen"
                           className="Footer__logo-img w-14 h-14 object-contain drop-shadow-sm"
                        />
                     </motion.div>
                     <div className="Footer__brandname font-semibold text-2xl tracking-tight">
                        JustDocIt
                     </div>
                  </div>

                  <p className="Footer__description text-base-content/75 text-sm mb-8 leading-relaxed">
                     Plataforma 100% online para generar documentación
                     profesional de código sin necesidad de instalaciones.
                     Conecta con GitHub, documenta y comparte.
                  </p>

                  <div className="Footer__socials flex gap-5">
                     {[
                        { icon: <Twitter size={20} />, label: "Twitter" },
                        { icon: <Github size={20} />, label: "GitHub" },
                        { icon: <Linkedin size={20} />, label: "LinkedIn" },
                        { icon: <Facebook size={20} />, label: "Facebook" },
                     ].map((social) => (
                        <motion.a
                           key={social.label}
                           href="#"
                           className="Footer__social w-10 h-10 bg-base-300/80 hover:bg-primary/90 rounded-full flex items-center justify-center text-base-content/70 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                           whileHover={{
                              scale: 1.1,
                              rotate: 360,
                              transition: { duration: 0.5, ease: "easeInOut" },
                           }}
                           whileTap={{ scale: 0.95 }}
                           aria-label={social.label}
                        >
                           {social.icon}
                        </motion.a>
                     ))}
                  </div>
               </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div
               className="Footer__bottom pt-6 border-t border-base-300/50 flex flex-col md:flex-row justify-between items-center gap-5"
               variants={itemVariants}
            >
               <div className="Footer__copyright text-base-content/70 text-sm">
                  © 2025 JustDocIt. Todos los derechos reservados.
               </div>
               <div className="Footer__legal flex flex-wrap justify-center gap-6">
                  {[
                     "Términos de servicio",
                     "Política de privacidad",
                     "Cookies",
                  ].map((item) => (
                     <motion.button
                        key={item}
                        onClick={() => setActiveModal(item as LegalModalType)}
                        className="Footer__legal-item text-base-content/70 text-sm hover:text-primary transition-colors"
                        whileHover={{
                           scale: 1.05,
                           transition: { duration: 0.3, ease: "easeOut" },
                        }}
                        whileTap={{ scale: 0.98 }}
                     >
                        {item}
                     </motion.button>
                  ))}
               </div>
            </motion.div>
         </div>

         {/* Legal Modals */}
         {mounted &&
            createPortal(
               <AnimatePresence>
                  {activeModal && (
                     <>
                        {/* Backdrop */}
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
                           onClick={() => setActiveModal(null)}
                        />
                        {/* Modal */}
                        <motion.div
                           variants={modalVariants}
                           initial="hidden"
                           animate="visible"
                           exit="exit"
                           className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-base-100 rounded-lg shadow-2xl p-6 z-[10000] border border-base-300/20"
                           style={{
                              boxShadow:
                                 "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                           }}
                        >
                           <div className="flex justify-between items-start mb-4">
                              <h2 className="text-xl font-semibold">
                                 {legalContent[activeModal].title}
                              </h2>
                              <button
                                 onClick={() => setActiveModal(null)}
                                 className="p-1 hover:bg-base-200 rounded-full transition-colors"
                              >
                                 <X size={20} />
                              </button>
                           </div>
                           <div className="space-y-3 text-base-content/80 text-sm">
                              {legalContent[activeModal].content.map(
                                 (paragraph: string, index: number) => (
                                    <p key={index} className="leading-relaxed">
                                       {paragraph}
                                    </p>
                                 )
                              )}
                           </div>
                        </motion.div>
                     </>
                  )}
               </AnimatePresence>,
               document.body
            )}
      </motion.footer>
   );
}

export default Footer;
