import Phaser from 'phaser';
import Player from './player';
import officeMap from '../../maps/office-map.tmj';
import { EventBus } from '@game';
import getSceneImageAnimLoader from './images';

export default class MainScene extends Phaser.Scene {
	loadImages = getSceneImageAnimLoader(this);
	loadAnimations = null;

	paused = false;
	player = null;
	map = null;
	tileset = null;
	floorLayer = null;
	floorOuterLayer = null;
	wallsLayer = null;
	cursors = null;

	deskHit = false;

	constructor() {
		super({ key: 'MainScene' });
	}

	async preload() {
		this.load.tilemapTiledJSON('officeMap', officeMap);
		this.loadAnimations = this.loadImages();
		this.player = new Player(this);
		await this.player.onPreload();
	}

	create() {
		this.cameras.main.setZoom(1);
		this.loadAnimations(); // Create animations after loading images
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

		const cpuDesk = this.physics.add.image(315, 250, 'computerDesk');
		cpuDesk.body.setSize(50, 50, true);
		cpuDesk.body.setImmovable(true);
		cpuDesk.body.setOffset(
			(cpuDesk.width - 50) / 2,
			(cpuDesk.height - 100) / 2,
		);
		cpuDesk.refreshBody();
		cpuDesk.setDepth(1); // Ensure the desk is above the floor layer

		const cpuDeskTrigger = this.add
			.zone(cpuDesk.x, cpuDesk.y, cpuDesk.width, cpuDesk.height)
			.setOrigin(0.5)
			.setDepth(1);
		this.physics.add.existing(cpuDeskTrigger);
		cpuDeskTrigger.body.setAllowGravity(false);
		cpuDeskTrigger.body.setImmovable(true);

		this.physics.add.overlap(
			this.player.player,
			cpuDeskTrigger,
			() => {
				if (!this.deskHit) {
					this.deskHit = true;
					console.log('Player entered the computer desk trigger!');
				}
			},
			null,
			this,
		);

		// this.wallsLayer.setCollisionBetween(1, 1000);
		this.player.addCollisions([this.wallsLayer, cpuDesk]);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	}

	update() {
		this.player.onUpdate(this.cursors);

		// Check if player has left the desk trigger area
		if (this.deskHit) {
			const deskBounds = new Phaser.Geom.Rectangle(
				315 - 81 / 2,
				250 - 117 / 2,
				81,
				117,
			);
			const playerBounds = this.player.player.getBounds();
			// Check for E key press while in trigger
			const ePressed = Phaser.Input.Keyboard.JustDown(this.eKey);
			if (
				!Phaser.Geom.Intersects.RectangleToRectangle(deskBounds, playerBounds)
			) {
				this.deskHit = false;
				console.log('Player left the computer desk trigger!');
			}
			if (ePressed) {
				console.log('E key pressed while in computer desk trigger!');
				EventBus.emit('desk-interact'); // Emit an event for desk interaction
				// You can also trigger any specific logic here, such as opening a UI or starting a mini-game
				// For example: this.scene.start('ComputerDeskScene');
				// Or: this.scene.launch('ComputerDeskUI');
				// Or: this.startComputerDeskInteraction();
				// Implement the actual interaction logic as needed
			}
		}
	}
}
