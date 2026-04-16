const Event = {
	GAME_HANDLE_PAUSE: 'game:pause-change',
	GAME_BROADCAST_PAUSE: 'game:pause-scene:broadcast',
	GAME_PAUSE: 'game:pause',
	GAME_RESUME: 'game:resume',
	GAME_INTERACT: 'game:interact',
	GAME_NAVIGATE: 'game:navigation:navigate',
	GAME_P_KEY_PRESSED: 'game:input:p-key-pressed',
	GAME_E_KEY_PRESSED: 'game:input:e-key-pressed',
	GAME_NAV_KEYS_PRESSED: 'game:input:navigation-keys-pressed',

	SYSTEM_ASSET_LOAD_START: 'system:asset-load-start',
	SYSTEM_ASSET_LOAD_PROGRESS: 'system:asset-load-progress',
	SYSTEM_ASSET_LOAD_COMPLETE: 'system:asset-load-complete',
	SYSTEM_UI_MOUNTED: 'system:ui-mounted',
	SYSTEM_INPUT_ENABLED: 'system:input-enabled',
	SYSTEM_INPUT_DISABLED: 'system:input-disabled',

	LANGUAGE_CHANGE: 'ui:locale:changed',
};

export default Event;
