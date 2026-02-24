import Phaser from 'phaser';
import MainScene from './scenes/main/main.scene';

let game;

const config = {
	type: Phaser.AUTO,
	title: 'The Office',
	description: 'Welcome to the virtual office!',
	parent: 'game-container',
	width: 640,
	height: 384,
	backgroundColor: '#000000',
	pixelArt: true,
	scene: [MainScene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
};

export const createConfig = () => {
	if (!game) {
		game = new Phaser.Game(config);
	}
	return game;
};

export default config;
