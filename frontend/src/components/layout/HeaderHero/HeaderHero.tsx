import { LanguageIcon } from "../../../assets/images/svg/LanguageIcon";
import { MenuIcon } from "../../../assets/images/svg/MenuIcon";
import logo from "../../../../public/logo.png";
import UserProfile from "../../ui/UserProfile";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeButton from "../../ui/ThemeButton";
import { motion, AnimatePresence } from "framer-motion";

function HeaderHero() {
   const { t, i18n } = useTranslation();
   const [theme, setTheme] = useState(() => {
      return localStorage.getItem("theme") || "light";
   });
   const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
   const [showMobileMenu, setShowMobileMenu] = useState(false);

   const handleThemeChange = (newTheme: string) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      setIsThemeDropdownOpen(false);
   };

   const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const newLanguage = e.target.value;
      i18n.changeLanguage(newLanguage);
      localStorage.setItem("language", newLanguage);
   };

   useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
   }, [theme]);

   const themes = [
      { name: "light", label: "Claro" },
      { name: "dark", label: "Oscuro" },
      { name: "autumn", label: "Otoño" },
      { name: "dim", label: "Dim" },
      { name: "abyss", label: "Abismo" },
   ];

   const dropdownVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.2,
            ease: "easeOut",
         },
      },
      exit: {
         opacity: 0,
         y: -10,
         transition: {
            duration: 0.2,
            ease: "easeIn",
         },
      },
   };

   return (
      <motion.div
         className="HeaderHero navbar shadow-sm shadow-gray-100/10 w-screen h-16"
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
         <div className="HeaderHero__start navbar-start">
            <div className="relative">
               <motion.button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="btn btn-ghost lg:hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
               >
                  <MenuIcon />
               </motion.button>
               {showMobileMenu && (
                  <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-base-100 p-3 shadow-xl ring-1 ring-base-300"
                  >
                     <ul className="menu menu-sm gap-1">
                        <motion.li whileHover={{ scale: 1.02 }}>
                           <Link
                              to="/proyect_docs"
                              className="HeaderHero__dropdown-link rounded-lg px-3 py-1.5 text-base font-medium hover:bg-base-200 flex items-center gap-2"
                              onClick={() => setShowMobileMenu(false)}
                           >
                              <span className="w-2 h-2 rounded-full bg-primary text-xl"></span>
                              {t("header.documentation")}
                           </Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }}>
                           <Link
                              to="/live_docs"
                              className="HeaderHero__dropdown-link rounded-lg px-3 py-1.5 text-base font-medium hover:bg-base-200 flex items-center gap-2"
                              onClick={() => setShowMobileMenu(false)}
                           >
                              <span className="w-2 h-2 rounded-full bg-accent text-xl"></span>
                              Live Docs
                           </Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }}>
                           <Link
                              to="/dashboard"
                              className="HeaderHero__dropdown-link rounded-lg px-3 py-1.5 text-base font-medium hover:bg-base-200 flex items-center gap-2"
                              onClick={() => setShowMobileMenu(false)}
                           >
                              <span className="w-2 h-2 rounded-full bg-secondary text-xl"></span>
                              {t("header.dashboard")}
                           </Link>
                        </motion.li>
                     </ul>
                  </motion.div>
               )}
            </div>
            <motion.a
               className="HeaderHero__brand btn btn-ghost text-xl"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
               <motion.img
                  src={logo}
                  alt="Logo image"
                  className="HeaderHero__logo w-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
               />
               <span className="HeaderHero__brand-text hidden sm:inline">
                  JustDocIt
               </span>
            </motion.a>
         </div>
         <div className="HeaderHero__center navbar-center hidden lg:flex">
            <ul className="HeaderHero__menu menu menu-horizontal px-1">
               <motion.li whileHover={{ scale: 1.1 }}>
                  <Link
                     to="/proyect_docs"
                     className="HeaderHero__menu-link text-lg"
                  >
                     {t("header.documentation")}
                  </Link>
               </motion.li>
               <motion.li whileHover={{ scale: 1.1 }}>
                  <Link
                     to="/live_docs"
                     className="HeaderHero__menu-link text-lg"
                  >
                     Live Docs
                  </Link>
               </motion.li>
               <motion.li whileHover={{ scale: 1.1 }}>
                  <Link
                     to="/dashboard"
                     className="HeaderHero__menu-link text-lg"
                  >
                     {t("header.dashboard")}
                  </Link>
               </motion.li>
            </ul>
         </div>
         <div className="HeaderHero__end navbar-end flex gap-3 lg:pr-6">
            <div className="relative">
               <motion.button
                  onClick={() =>
                     setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                  }
                  className="btn btn-ghost flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
               >
                  <LanguageIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">
                     {i18n.language === "es" ? "Español 🇪🇸" : "English 🇺🇸"}
                  </span>
               </motion.button>
               <AnimatePresence>
                  {isLanguageDropdownOpen && (
                     <motion.div
                        className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg p-2 z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                     >
                        <div className="grid grid-cols-1 gap-2">
                           <motion.button
                              onClick={() => {
                                 handleLanguageChange({
                                    target: { value: "es" },
                                 } as ChangeEvent<HTMLSelectElement>);
                                 setIsLanguageDropdownOpen(false);
                              }}
                              className={`btn btn-ghost justify-start ${
                                 i18n.language === "es" ? "bg-primary/10" : ""
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                           >
                              Español 🇪🇸
                           </motion.button>
                           <motion.button
                              onClick={() => {
                                 handleLanguageChange({
                                    target: { value: "en" },
                                 } as ChangeEvent<HTMLSelectElement>);
                                 setIsLanguageDropdownOpen(false);
                              }}
                              className={`btn btn-ghost justify-start ${
                                 i18n.language === "en" ? "bg-primary/10" : ""
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                           >
                              English 🇺🇸
                           </motion.button>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
            <div className="relative">
               <motion.button
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="btn btn-ghost flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
               >
                  <span>🎨</span>
                  <span className="hidden sm:inline">
                     {themes.find((t) => t.name === theme)?.label}
                  </span>
               </motion.button>
               <AnimatePresence>
                  {isThemeDropdownOpen && (
                     <motion.div
                        className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg p-2 z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                     >
                        <div className="grid grid-cols-1 gap-2">
                           {themes.map((themeOption) => (
                              <ThemeButton
                                 key={themeOption.name}
                                 theme={themeOption.name}
                                 label={themeOption.label}
                                 isSelected={theme === themeOption.name}
                                 onClick={() =>
                                    handleThemeChange(themeOption.name)
                                 }
                              />
                           ))}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
            <UserProfile />
         </div>
      </motion.div>
   );
}

export default HeaderHero;
