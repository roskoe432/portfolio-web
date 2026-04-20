import Phaser from 'phaser';
import Player from '@game/entities/player';
import createBoundaries from './boundaries';
import createGameObjects from './scene-config';
import { pauseManager } from '@game/system';
import { eventBus } from '@game/events';
import CircleTrigger from '@game/entities/circle-trigger';

function MainScene() {
	Phaser.Scene.call(this, { key: 'Main', active: false });

	this.paused = false;
	this.player = null;
	this.map = null;
	this.tileset = null;
	this.floorLayer = null;
	this.floorOuterLayer = null;
	this.wallsLayer = null;
	this.cursors = null;

	this.interactables = [];

	pauseManager.registerScene(this);

	this.addTitle = function () {
		this.add
			.bitmapText(182, 50, 'pixelifySans', "Ben Snow's Portfolio", 35)
			.setTint(0x444444)
			.setDepth(1000);
	};

	this.setupTileMap = function () {
		this.map = this.make.tilemap({ key: 'officeMap' });
		this.tileset = this.map.addTilesetImage('office-tileset', 'officeTileset');
		this.floorLayer = this.map.createLayer('floor-layer', this.tileset, 0, 0);
		this.wallsLayer = this.map.createLayer('wall-layer', this.tileset, 0, 0);
	};

	this.registerKeys = function () {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.wasdKeys = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
		this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
	};

	this.create = function () {
		this.player = new Player(this, eventBus, { speed: 100 });
		this.cameras.main.roundPixels = true;
		this.addTitle();
		this.cameras.main.setZoom(1);
		this.setupTileMap();

		this.trigger = new CircleTrigger(this, eventBus, {
			position: { x: 350, y: 300 },
			radius: 50,
		});

		this.trigger.events.on('enter', () => {
			console.log('Player entered trigger area');
		});
		this.trigger.events.on('exit', () => {
			console.log('Player exited trigger area');
		});
		this.trigger.events.on('stay', () => {
			console.log('Player is still in trigger area');
		});

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

		const gameObjects = createGameObjects(this, this.player);
		const boundaries = createBoundaries(this, this.map);
		[...gameObjects, ...boundaries].forEach((collider) => {
			this.physics.add.collider(this.player.player, collider);
		});

		this.trigger.addOverlapWith(this.player.player);

		this.registerKeys();
	};

	this.update = function () {
		this.interactables.forEach((interactable) => {
			interactable.update(this.player.player, this.eKey);
		});
	};
}
MainScene.prototype = Object.create(Phaser.Scene.prototype);
MainScene.prototype.constructor = MainScene;

export default MainScene;
