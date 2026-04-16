export function I18nAdapter({
	languages,
	i18n,
	reactPlugin,
	storageService,
	gameEvents,
	Event,
}) {
	this.init = () => {
		const persistedLanguage = storageService.getLanguage();

		if (!persistedLanguage) {
			storageService.setLanguage(i18n.resolvedLanguage || 'en');
		}

		i18n.use(reactPlugin).init({
			resources: languages.reduce((acc, lang) => {
				acc[lang.value] = { translation: lang.translation };
				return acc;
			}, {}),
			lng: persistedLanguage || 'en',
			fallbackLng: 'en',
			interpolation: {
				escapeValue: false,
			},
		});
	};

	this.changeLanguage = async (lang) => {
		await i18n.changeLanguage(lang);
		storageService.setLanguage(lang);
		// Emit to Phaser to update in-game text immediately
		gameEvents.emit(Event.LANGUAGE_CHANGE, lang);
	};

	this.getCurrentLanguage = () => {
		return i18n.resolvedLanguage || i18n.language || 'en';
	};

	this.getAvailableLanguages = () => {
		return [...languages];
	};
}

export default I18nAdapter;
