import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
	map = null;
	tileset = null;
	floorLayer = null;
	floorOuterLayer = null;
	wallsLayer = null;

	constructor() {
		super({ key: 'MainScene' });
	}

	preload() {}

	create() {
		this.cameras.main.setZoom(2);

		// // Set world bounds to match the map size
		// this.physics.world.setBounds(
		// 	0,
		// 	0,
		// 	this.map.widthInPixels,
		// 	this.map.heightInPixels,
		// );

		// // Make camera follow the world bounds
		// this.cameras.main.setBounds(
		// 	0,
		// 	0,
		// 	this.map.widthInPixels,
		// 	this.map.heightInPixels,
		// );
	}

	update() {
		// Game loop logic here
	}
}
