import Phaser from 'phaser';
import config from '@config';
import scenes from './scenes';

const gameConfig = {
	type: Phaser.AUTO,
	title: 'The Office',
	description: 'Welcome to the virtual office!',
	parent: 'game-container',
	width: 640,
	height: 480,
	backgroundColor: '#000000',
	pixelArt: true,
	scene: scenes,
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
		autoRound: true,
	},
	render: {
		pixelArt: true,
		antialias: false,
		antialiasGL: false,
		roundPixels: true,
	},
};

export default gameConfig;
