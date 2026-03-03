import Phaser from 'phaser';
import Player from './player';
import officeMap from '../../assets/images/office-map.tmj';

export default class MainScene extends Phaser.Scene {
	player = null;
	map = null;
	tileset = null;
	floorLayer = null;
	floorOuterLayer = null;
	wallsLayer = null;
	cursors = null;

	constructor() {
		super({ key: 'MainScene' });
	}

	async preload() {
		this.load.tilemapTiledJSON('officeMap', officeMap);
		this.load.image('officeTileset', 'assets/images/office-tileset.png');
		this.load.image('computerDesk', 'assets/images/first-cpu-desk.png');
		this.player = new Player(this);
		await this.player.onPreload();
	}

	create() {
		this.cameras.main.setZoom(1);

		this.map = this.make.tilemap({ key: 'officeMap' });
		this.tileset = this.map.addTilesetImage('office-tileset', 'officeTileset');
		this.floorLayer = this.map.createLayer('floor-layer', this.tileset, 0, 0);
		this.wallsLayer = this.map.createLayer('wall-layer', this.tileset, 0, 0);

		this.physics.world.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels,
		);

		this.cameras.main.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels,
		);

		this.player.onCreate();

		const cpuDesk = this.physics.add.staticImage(315, 250, 'computerDesk');
		cpuDesk.body.setSize(50, 100, true);
		cpuDesk.body.setOffset(
			(cpuDesk.width - 50) / 2,
			(cpuDesk.height - 100) / 2,
		);
		cpuDesk.body.updateFromGameObject();
		cpuDesk.setDepth(1); // Ensure the desk is above the floor layer

		// this.wallsLayer.setCollisionBetween(1, 1000);
		this.player.addCollisions([this.wallsLayer, cpuDesk]);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.player.onUpdate(this.cursors);
	}
}
