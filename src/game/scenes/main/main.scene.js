import Phaser from 'phaser';
import Player from '@game/entities/player';
import createBoundaries from './boundaries';
import createGameObjects from './scene-config';
import { pauseManager } from '@game/system';
import { eventBus } from '@game/events';
import LocalizedLabel from '@game/entities/localized-label';
import i18next from 'i18next';
import Interactable from '@game/entities/interactable';

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

	this.testInteractable = null;

	pauseManager.registerScene(this);

	this.addTitle = function () {
		new LocalizedLabel(
			this,
			{
				bitmapFont: true,
				fontKey: 'pixelifySans',
				message: 'game.title',
				depth: 2,
				position: new Phaser.Math.Vector2(330, 70),
				style: {
					fontSize: '35px',
					color: '#000000',
				},
			},
			i18next.t.bind(i18next),
		);
	};

	this.testInteractable = function () {
		this.testInteractable = new Interactable(this, 'desk', {
			label: {
				message: 'game.objects.desk',
				position: { x: 400, y: 300 },
				style: {
					color: '#ff0000',
					fontSize: '22px',
				},
				offset: { x: 55, y: -15 },
			},
			trigger: {
				position: { x: 400, y: 300 },
				radius: 50,
				onEnter: () => {
					console.log('Player entered the desk area');
				},
				onExit: () => {
					console.log('Player left the desk area');
				},
			},
			interaction: {
				key: this.eKey,
				onInteract: () => {
					console.log('Player interacted with the desk');
				},
			},
		});
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
		this.registerKeys();

		this.testInteractable();
		this.player = new Player(this, eventBus, {
			speed: 100,
			startPosition: new Phaser.Math.Vector2(250, 250),
		});

		this.testInteractable.addOverlapWith(this.player);

		this.cameras.main.roundPixels = true;
		this.addTitle();
		this.cameras.main.setZoom(1);
		this.setupTileMap();

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

		const gameObjects = createGameObjects(
			this,
			this.player,
			i18next.t.bind(i18next),
		);
		const boundaries = createBoundaries(this, this.map);
		[...gameObjects, ...boundaries].forEach((collider) => {
			this.physics.add.collider(this.player, collider);
		});
	};

	this.update = function () {
		this.testInteractable.checkInteraction();

		this.interactables.forEach((interactable) => {
			interactable.update(this.player, this.eKey);
		});
	};
}
MainScene.prototype = Object.create(Phaser.Scene.prototype);
MainScene.prototype.constructor = MainScene;

export default MainScene;
