// Phaser Docs: https://docs.phaser.io/api-documentation/api-documentation
export { default as createConfig } from './game-config';
export { eventBus } from './events';
export {
	useOnPlayerInteract,
	useOnPageNavigate,
	useOnGamePaused,
	useOnGameResumed,
	useOnAssetLoadStart,
	useOnAssetLoadProgress,
	useOnAssetLoadComplete,
	useDisableGameInput,
} from './hooks/event.hooks';
export { default as GameCanvas } from './game-canvas/game-canvas';
