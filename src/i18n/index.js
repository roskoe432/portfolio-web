import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
// import LanguageDetector from 'i18next-browser-languagedetector'; // Not installed, just an example

i18next.use(initReactI18next).init({
	resources: {
		en: { translation: enTranslation },
		es: { translation: esTranslation },
	},
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18next;
