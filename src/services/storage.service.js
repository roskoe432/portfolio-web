function StorageService() {
	const storage = window.localStorage;

	this.setInstructionsViewed = () => {
		storage.setItem('instructionsViewed', 'true');
	};

	this.getInstructionsViewed = () => {
		return storage.getItem('instructionsViewed') === 'true';
	};
}

export default StorageService;
