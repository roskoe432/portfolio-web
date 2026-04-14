import Phaser from 'phaser';
import MainScene from './scenes/main/main.scene';
import PauseMenu from './scenes/pause.scene';
import config from '@/config';
import LoaderScene from './scenes/loader.scene';
import { TransitionScene } from './lib/transitions';

let game;

const gameConfig = {
	type: Phaser.AUTO,
	title: 'The Office',
	description: 'Welcome to the virtual office!',
	parent: 'game-container',
	width: 640,
	height: 480,
	backgroundColor: '#000000',
	pixelArt: true,
	scene: [LoaderScene, MainScene, PauseMenu, TransitionScene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: config.game.debug,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
};

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

// HMR cleanup: destroy game instance when this module is replaced
if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		destroyGame();
	});
}

export default gameConfig;
