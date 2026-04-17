function GameEvents(eventBus) {
	const _eventBus = eventBus;

	this.on = (event, callback) => {
		_eventBus.on(event, callback);

		return () => {
			_eventBus.off(event, callback);
		};
	};
	this.emit = (event, payload) => _eventBus.emit(event, payload);

	// Game State Events
	this.emitGamePaused = () => this.emit('game-paused');
	this.emitGameResumed = () => this.emit('game-resumed');
	this.broadcastGamePaused = () => this.emit('game-paused-broadcast');
	this.emitPlayerInteract = () => this.emit('player-interact');

	this.onGamePaused = (callback) => this.on('game-paused', callback);
	this.onGameResumed = (callback) => this.on('game-resumed', callback);
	this.onGamePausedBroadcast = (callback) =>
		this.on('game-paused-broadcast', callback);
	this.onPlayerInteract = (callback) => this.on('player-interact', callback);

	// Input Events
	this.emitPKeyPressed = () => this.emit('p-key-pressed');
	this.emitEKeyPressed = () => this.emit('e-key-pressed');
	this.emitNavigationKeysPressed = (inputEventData) =>
		this.emit('navigation-keys-pressed', inputEventData);
	this.emitInputEnabled = () => this.emit('input-enabled');
	this.emitInputDisabled = () => this.emit('input-disabled');

	this.onPKeyPressed = (callback) => this.on('p-key-pressed', callback);
	this.onEKeyPressed = (callback) => this.on('e-key-pressed', callback);
	this.onNavigationKeysPressed = (callback) =>
		this.on('navigation-keys-pressed', callback);
	this.onInputEnabled = (callback) => this.on('input-enabled', callback);
	this.onInputDisabled = (callback) => this.on('input-disabled', callback);

	// System Events
	this.emitAssetLoadStart = () => this.emit('asset-load-start');
	this.emitAssetLoadProgress = (progress) =>
		this.emit('asset-load-progress', { progress });
	this.emitAssetLoadComplete = () => this.emit('asset-load-complete');
	this.emitLanguageChange = (locale) =>
		this.emit('language-change', { locale });

	this.onAssetLoadStart = (callback) => this.on('asset-load-start', callback);
	this.onAssetLoadProgress = (callback) =>
		this.on('asset-load-progress', callback);
	this.onAssetLoadComplete = (callback) =>
		this.on('asset-load-complete', callback);
	this.onUIMounted = (callback) => this.on('ui-mounted', callback);
	this.onLanguageChange = (callback) => this.on('language-change', callback);

	// UI Events
	this.emitPageNavigate = (page) => this.emit('page-navigate', { page });
	this.emitUIMounted = () => this.emit('ui-mounted');

	this.emitUIMounted = () => this.emit('ui-mounted');
	this.onPageNavigate = (callback) => this.on('page-navigate', callback);
}

export default GameEvents;
