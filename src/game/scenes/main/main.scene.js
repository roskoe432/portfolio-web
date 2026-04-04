import Phaser from 'phaser';
import Player from '@game/entities/player';
import officeMap from '@game/assets/maps/office-map.tmj';
import getSceneImageAnimLoader from '@game/assets/images';
import createBoundaries from './boundaries';
import createGameObjects from './scene-config';

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

	pauseGame() {
		this.scene.launch('PauseMenu');
	}

	setupTileMap() {
		this.map = this.make.tilemap({ key: 'officeMap' });
		this.tileset = this.map.addTilesetImage('office-tileset', 'officeTileset');
		this.floorLayer = this.map.createLayer('floor-layer', this.tileset, 0, 0);
		this.wallsLayer = this.map.createLayer('wall-layer', this.tileset, 0, 0);
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
		this.setupTileMap();

		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

		this.player.onCreate(100);

		// Create all game objects (static and interactive)
		const gameObjects = createGameObjects(this, this.player);
		const boundaries = createBoundaries(this, this.map);

		// Setup collisions
		const colliders = [...gameObjects, ...boundaries];
		this.player.addCollisions(colliders);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			this.pauseGame();
		}

		this.player.onUpdate(this.cursors);

		this.interactables.forEach((interactable) => {
			interactable.update(this.player.player, this.eKey);
		});
	}
}

export default MainScene;
