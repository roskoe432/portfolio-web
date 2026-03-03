import Phaser from 'phaser';
import officeTilesPath from '../assets/images/office-tileset.png';

console.log(officeTilesPath);
export default class ExampleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ExampleScene' });
	}

	preload() {
		this.load.image('officeTiles', officeTilesPath);
	}

	create() {
		// Initialize game objects here
	}

	update() {
		// Game loop logic here
	}
}
