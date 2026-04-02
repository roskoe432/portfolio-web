import Phaser from 'phaser';
import Player from './player';
import officeMap from '../../maps/office-map.tmj';
import { EventBus } from '@game';
import getSceneImageAnimLoader from './images';
import { Interactable } from '../../entities/Interactable';
import { createBoundaries } from './boundary-config';

class MainScene extends Phaser.Scene {
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

	interactables = [];

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
		this.loadAnimations();
		this.map = this.make.tilemap({ key: 'officeMap' });
		this.tileset = this.map.addTilesetImage('office-tileset', 'officeTileset');
		this.floorLayer = this.map.createLayer('floor-layer', this.tileset, 0, 0);
		this.wallsLayer = this.map.createLayer('wall-layer', this.tileset, 0, 0);

		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

		this.player.onCreate();

		this.setupInteractables();

		const boundaries = createBoundaries(this, this.map);

		const colliders = [...this.interactables.map((i) => i.getSprite()), ...boundaries];
		this.player.addCollisions(colliders);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	}

	setupInteractables() {
		const computerDesk = new Interactable(this, {
			x: 315,
			y: 250,
			spriteKey: 'computerDesk',
			bodySize: { width: 50, height: 50 },
			bodyOffset: {
				x: 40,
				y: 8.5,
			},
			depth: 1,
			triggerZone: {
				x: 315,
				y: 250,
				width: 125,
				height: 117,
			},
			onEnter: () => {
				console.log('Player entered the computer desk trigger!');
			},
			onExit: () => {
				console.log('Player left the computer desk trigger!');
			},
			onInteract: () => {
				console.log('E key pressed while in computer desk trigger!');
				EventBus.emit('interact', { type: 'computer', page: '/', title: 'About' });
			},
		});

		const blogInteractable = new Interactable(this, {
			x: 500,
			y: 250,
			spriteKey: 'computerDesk',
			bodySize: { width: 50, height: 50 },
			bodyOffset: {
				x: 40,
				y: 8.5,
			},
			depth: 1,
			triggerZone: {
				x: 500,
				y: 250,
				width: 125,
				height: 117,
			},
			onEnter: () => {
				console.log('Player entered the computer desk trigger!');
			},
			onExit: () => {
				console.log('Player left the computer desk trigger!');
			},
			onInteract: () => {
				console.log('E key pressed while in computer desk trigger!');
				EventBus.emit('interact', { type: 'computer', page: '/blog', title: 'Blog' });
			},
		});

		computerDesk.setupPlayerOverlap(this.player.player);
		blogInteractable.setupPlayerOverlap(this.player.player);
		this.interactables.push(computerDesk);
		this.interactables.push(blogInteractable);

		// Add more interactables here as needed
		// Example:
		// const anotherObject = new Interactable(this, { ... });
		// anotherObject.setupPlayerOverlap(this.player.player);
		// this.interactables.push(anotherObject);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			console.log('P key pressed - toggling pause');
			this.scene.pause();
			this.scene.launch('PauseMenu');
		}

		this.player.onUpdate(this.cursors);

		this.interactables.forEach((interactable) => {
			interactable.update(this.player.player, this.eKey);
		});
	}
}

export default MainScene;
