import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";

const resources = {
	en: {
		translation: translationEN,
	},
	es: {
		translation: translationES,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: localStorage.getItem("language") || "es", // default language
	fallbackLng: "es",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
