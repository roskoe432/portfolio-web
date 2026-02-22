import Phaser from 'phaser';
import ExampleScene from './scenes/example.scene';

const config = {
	type: Phaser.AUTO,
	title: 'Overlord Rising',
	description: '',
	parent: 'game-container',
	width: 1280,
	height: 720,
	backgroundColor: '#000000',
	pixelArt: false,
	scene: [ExampleScene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
};

export default new Phaser.Game(config);
