import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import { storageService } from '@services/index.js';
// import LanguageDetector from 'i18next-browser-languagedetector'; // Not installed, just an example

const languages = [
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Español' },
];

i18next.use(initReactI18next).init({
	resources: {
		en: { translation: enTranslation },
		es: { translation: esTranslation },
	},
	lng: storageService.getLanguage(),
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

if (!storageService.getLanguage()) {
	storageService.setLanguage(i18next.language);
}

export const changeLanguage = (lang) => {
	i18next.changeLanguage(lang);
	storageService.setLanguage(lang);
};

export const getCurrentLanguage = () => {
	return languages.find((lang) => lang.value === storageService.getLanguage()).value || 'en';
};

export const getAvailableLanguages = () => {
	return languages;
};
