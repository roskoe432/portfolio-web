import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import { storageService } from '@services/index.js';
import { eventBus } from '@game';
import I18nAdapter from './i18n-adapter';

const languages = [
	{
		value: 'en',
		label: 'English',
		translation: enTranslation,
	},
	{ value: 'es', label: 'Español', translation: esTranslation },
];

const i18n = new I18nAdapter({
	languages,
	i18n: i18next,
	reactPlugin: initReactI18next,
	storageService,
	eventBus,
});

i18n.init();

export default i18n;
