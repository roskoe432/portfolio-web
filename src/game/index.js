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
} from './hooks/event.hooks';
