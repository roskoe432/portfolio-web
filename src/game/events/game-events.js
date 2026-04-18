const Events = {
	GAME_PAUSED: 'game-paused',
	GAME_RESUMED: 'game-resumed',
	GAME_REQUEST_PAUSE: 'game-request-pause',
	GAME_REQUEST_RESUME: 'game-request-resume',
	PLAYER_INTERACT: 'player-interact',

	P_KEY_PRESSED: 'p-key-pressed',
	E_KEY_PRESSED: 'e-key-pressed',
	NAVIGATION_KEYS_PRESSED: 'navigation-keys-pressed',
	INPUT_ENABLED: 'input-enabled',
	INPUT_DISABLED: 'input-disabled',

	SYSTEM_ASSET_LOAD_START: 'asset-load-start',
	SYSTEM_ASSET_LOAD_PROGRESS: 'asset-load-progress',
	SYSTEM_ASSET_LOAD_COMPLETE: 'asset-load-complete',
	SYSTEM_LANGUAGE_CHANGE: 'language-change',
	SYSTEM_UI_MOUNTED: 'ui-mounted',

	UI_PAGE_NAVIGATE: 'page-navigate',
};

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
	this.emitGamePaused = () => this.emit(Events.GAME_PAUSED);
	this.emitGameResumed = () => this.emit(Events.GAME_RESUMED);
	this.emitRequestPause = () => this.emit(Events.GAME_REQUEST_PAUSE);
	this.emitRequestResume = () => this.emit(Events.GAME_REQUEST_RESUME);

	this.emitPlayerInteract = () => this.emit(Events.PLAYER_INTERACT);

	this.onGamePaused = (callback) => this.on(Events.GAME_PAUSED, callback);
	this.onGameResumed = (callback) => this.on(Events.GAME_RESUMED, callback);
	this.onPlayerInteract = (callback) =>
		this.on(Events.PLAYER_INTERACT, callback);
	this.onRequestPause = (callback) =>
		this.on(Events.GAME_REQUEST_PAUSE, callback);
	this.onRequestResume = (callback) =>
		this.on(Events.GAME_REQUEST_RESUME, callback);

	// Input Events
	this.emitPKeyPressed = () => this.emit(Events.P_KEY_PRESSED);
	this.emitEKeyPressed = () => this.emit(Events.E_KEY_PRESSED);
	this.emitNavigationKeysPressed = (inputEventData) =>
		this.emit(Events.NAVIGATION_KEYS_PRESSED, inputEventData);
	this.emitEnableInput = () => this.emit(Events.INPUT_ENABLED);
	this.emitDisableInput = () => this.emit(Events.INPUT_DISABLED);

	this.onPKeyPressed = (callback) => this.on(Events.P_KEY_PRESSED, callback);
	this.onEKeyPressed = (callback) => this.on(Events.E_KEY_PRESSED, callback);
	this.onNavigationKeysPressed = (callback) =>
		this.on(Events.NAVIGATION_KEYS_PRESSED, callback);
	this.onInputEnabled = (callback) => this.on(Events.INPUT_ENABLED, callback);
	this.onInputDisabled = (callback) => this.on(Events.INPUT_DISABLED, callback);

	// System Events
	this.emitAssetLoadStart = () => this.emit(Events.SYSTEM_ASSET_LOAD_START);
	this.emitAssetLoadProgress = (payload) =>
		this.emit(Events.SYSTEM_ASSET_LOAD_PROGRESS, payload);
	this.emitAssetLoadComplete = () =>
		this.emit(Events.SYSTEM_ASSET_LOAD_COMPLETE);
	this.emitLanguageChange = (locale) =>
		this.emit(Events.SYSTEM_LANGUAGE_CHANGE, { locale });

	this.onAssetLoadStart = (callback) =>
		this.on(Events.SYSTEM_ASSET_LOAD_START, callback);
	this.onAssetLoadProgress = (callback) =>
		this.on(Events.SYSTEM_ASSET_LOAD_PROGRESS, callback);
	this.onAssetLoadComplete = (callback) =>
		this.on(Events.SYSTEM_ASSET_LOAD_COMPLETE, callback);
	this.onUIMounted = (callback) => this.on(Events.SYSTEM_UI_MOUNTED, callback);
	this.onLanguageChange = (callback) =>
		this.on(Events.SYSTEM_LANGUAGE_CHANGE, callback);

	// UI Events
	this.emitPageNavigate = (payload) =>
		this.emit(Events.UI_PAGE_NAVIGATE, payload);
	this.emitUIMounted = () => this.emit(Events.SYSTEM_UI_MOUNTED);

	this.onPageNavigate = (callback) =>
		this.on(Events.UI_PAGE_NAVIGATE, callback);
	this.onUIMounted = (callback) => this.on(Events.SYSTEM_UI_MOUNTED, callback);
}

export default GameEvents;
