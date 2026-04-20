// Phaser Docs: https://docs.phaser.io/api-documentation/api-documentation
import Phaser from 'phaser';
import gameConfig from './game-config';

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

let game;

export const createGame = () => {
	if (!game) {
		game = new Phaser.Game(gameConfig);
	}
	return game;
};

export const destroyGame = () => {
	if (game) {
		game.destroy(true);
		game = null;
	}
};

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		destroyGame();
	});
}
