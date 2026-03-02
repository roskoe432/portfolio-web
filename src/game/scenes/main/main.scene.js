import Phaser from 'phaser';
import officeTileset from '../../assets/images/office-tileset.png';
import officeMap from '../../assets/images/office-map.tmj';
import idleAnim1 from '../../assets/images/animations/animations/breathing-idle/south/frame_000.png';
import idleAnim2 from '../../assets/images/animations/animations/breathing-idle/south/frame_001.png';
import idleAnim3 from '../../assets/images/animations/animations/breathing-idle/south/frame_002.png';
import idleAnim4 from '../../assets/images/animations/animations/breathing-idle/south/frame_003.png';

export default class MainScene extends Phaser.Scene {
	map = null;
	tileset = null;
	floorLayer = null;
	floorOuterLayer = null;
	wallsLayer = null;
	player = null;

	constructor() {
		super({ key: 'MainScene' });
	}

	preload() {
		this.load.tilemapTiledJSON('officeMap', officeMap);
		this.load.image('officeTileset', officeTileset);

		this.load.image('idle_1', idleAnim1);
		this.load.image('idle_2', idleAnim2);
		this.load.image('idle_3', idleAnim3);
		this.load.image('idle_4', idleAnim4);
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

		this.anims.create({
			key: 'idle',
			frames: [
				{ key: 'idle_1' },
				{ key: 'idle_2' },
				{ key: 'idle_3' },
				{ key: 'idle_4' },
			],
			frameRate: 4,
			repeat: -1,
		});

		this.player = this.physics.add.sprite(250, 250, 'idle_1');
		this.player.setScale(2);
		this.player.refreshBody();
		this.player.body.setSize(18, 36);
		this.player.play('idle');

		console.log(this.player.width, this.player.height);

		this.wallsLayer.setCollisionBetween(1, 1000);
		this.physics.add.collider(this.player, this.wallsLayer);
	}

	update() {
		// Game loop logic here
	}
}
