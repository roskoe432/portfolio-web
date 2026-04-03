import Phaser from 'phaser';
import MainScene from './scenes/main/main.scene';
import PauseMenu from './scenes/pause-menu/pause-menu.scene';
import config from '../config';

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
	scene: [MainScene, PauseMenu],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: config.debugGame,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
};

export const createConfig = () => {
	if (!game) {
		game = new Phaser.Game(gameConfig);
	}
	return game;
};

export default gameConfig;
