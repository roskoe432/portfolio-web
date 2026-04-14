function StorageService() {
	const storage = window.localStorage;

	this.setTutorialViewed = () => {
		storage.setItem('tutorialViewed', 'true');
	};

	this.getTutorialViewed = () => {
		const tutorialViewed = storage.getItem('tutorialViewed');
		if (tutorialViewed === null) {
			return false; // Default to false if not set
		}
		return tutorialViewed === 'true';
	};

	this.deleteTutorialViewed = () => {
		storage.removeItem('tutorialViewed');
	};

	this.getLanguage = () => {
		return storage.getItem('language');
	};

	this.setLanguage = (lang) => {
		storage.setItem('language', lang);
	};
}

export default StorageService;
