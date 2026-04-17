function GameEvents(eventBus) {
	const _eventBus = eventBus;

	this.on = (event, callback) => {
		_eventBus.on(event, callback);

		return () => {
			_eventBus.off(event, callback);
		};
	};
	this.emit = (event, payload) => _eventBus.emit(event, payload);

	this.emitGamePaused = () => this.emit('game-paused');
	this.emitGameResumed = () => this.emit('game-resumed');
	this.broadcastGamePaused = () => this.emit('game-paused-broadcast');
	this.emitPlayerInteract = () => this.emit('player-interact');
	this.emitPageNavigate = (page) => this.emit('page-navigate', { page });
	this.emitPKeyPressed = () => this.emit('p-key-pressed');
	this.emitEKeyPressed = () => this.emit('e-key-pressed');
	this.emitNavigationKeysPressed = (keys) =>
		this.emit('navigation-keys-pressed', { keys });
	this.emitAssetLoadStart = () => this.emit('asset-load-start');
	this.emitAssetLoadProgress = (progress) =>
		this.emit('asset-load-progress', { progress });
	this.emitAssetLoadComplete = () => this.emit('asset-load-complete');
	this.emitUIMounted = () => this.emit('ui-mounted');
	this.emitInputEnabled = () => this.emit('input-enabled');
	this.emitInputDisabled = () => this.emit('input-disabled');
	this.emitLanguageChange = (locale) =>
		this.emit('language-change', { locale });

	this.onGamePaused = (callback) => this.on('game-paused', callback);
	this.onGameResumed = (callback) => this.on('game-resumed', callback);
	this.onGamePausedBroadcast = (callback) =>
		this.on('game-paused-broadcast', callback);
	this.onPlayerInteract = (callback) => this.on('player-interact', callback);
	this.onPageNavigate = (callback) => this.on('page-navigate', callback);
	this.onPKeyPressed = (callback) => this.on('p-key-pressed', callback);
	this.onEKeyPressed = (callback) => this.on('e-key-pressed', callback);
	this.onNavigationKeysPressed = (callback) =>
		this.on('navigation-keys-pressed', callback);
	this.onAssetLoadStart = (callback) => this.on('asset-load-start', callback);
	this.onAssetLoadProgress = (callback) =>
		this.on('asset-load-progress', callback);
	this.onAssetLoadComplete = (callback) =>
		this.on('asset-load-complete', callback);
	this.onUIMounted = (callback) => this.on('ui-mounted', callback);
	this.onInputEnabled = (callback) => this.on('input-enabled', callback);
	this.onInputDisabled = (callback) => this.on('input-disabled', callback);
	this.onLanguageChange = (callback) => this.on('language-change', callback);
}

export default GameEvents;
