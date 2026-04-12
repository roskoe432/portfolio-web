import Phaser from 'phaser';
import Player from '@features/game/entities/player';
import createBoundaries from './boundaries';
import createGameObjects from './scene-config';
import { storageService } from '@services';

class MainScene extends Phaser.Scene {
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
		try {
			this.scene.launch('PauseMenu');
		} catch (error) {
			console.error('Error launching PauseMenu:', error);
		}
	}

	setupTileMap() {
		this.map = this.make.tilemap({ key: 'officeMap' });
		this.tileset = this.map.addTilesetImage('office-tileset', 'officeTileset');
		this.floorLayer = this.map.createLayer('floor-layer', this.tileset, 0, 0);
		this.wallsLayer = this.map.createLayer('wall-layer', this.tileset, 0, 0);
	}

	async preload() {
		this.load.pack('gameAssets', '/assets/manifest.json');
		this.player = new Player(this);
		await this.player.onPreload();
	}

	create() {
		this.cameras.main.setZoom(1);
		this.setupTileMap();

		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

		this.player.onCreate(300, 300);

		const gameObjects = createGameObjects(this, this.player);
		const boundaries = createBoundaries(this, this.map);

		const colliders = [...gameObjects, ...boundaries];
		this.player.addCollisions(colliders);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.wasdKeys = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
		this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

		if (!storageService.getTutorialViewed()) {
			this.pauseGame();
		}
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			this.pauseGame();
		}

		this.player.onUpdate(this.cursors, this.wasdKeys);

		this.interactables.forEach((interactable) => {
			interactable.update(this.player.player, this.eKey);
		});
	}
}

export default MainScene;
