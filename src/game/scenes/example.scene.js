import Phaser from 'phaser';
import officeTilesPath from '../assets/images/office-tileset.png';
import officeMap from '../assets/images/officeTiles.tmj';

export default class ExampleScene extends Phaser.Scene {
	map = null;
	tileset = null;
	floorLayer = null;
	floorOuterLayer = null;
	wallsLayer = null;

	constructor() {
		super({ key: 'ExampleScene' });
	}

	preload() {
		this.load.image('officeTiles', officeTilesPath);
		this.load.tilemapTiledJSON('officeMap', officeMap);
	}

	create() {
		this.map = this.make.tilemap({ key: 'officeMap' });
		this.tileset = this.map.addTilesetImage('officeTiles', 'officeTiles');
		this.floorLayer = this.map.createLayer('floor', this.tileset, 0, 0);
		this.floorOuterLayer = this.map.createLayer(
			'floor-outer',
			this.tileset,
			0,
			0,
		);
		this.wallsLayer = this.map.createLayer('walls', this.tileset, 0, 0);

		// Set world bounds to match the map size
		this.physics.world.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels,
		);

		// Make camera follow the world bounds
		this.cameras.main.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels,
		);
	}

	update() {
		// Game loop logic here
	}
}
