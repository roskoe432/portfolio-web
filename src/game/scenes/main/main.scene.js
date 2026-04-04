import Phaser from 'phaser';
import Player from '@game/entities/player';
import officeMap from '@game/assets/maps/office-map.tmj';
import getSceneImageAnimLoader from '@game/assets/images';
import createBoundaries from './boundary-config';
import createInteractables from './interactables.config';
import Vec from '@/game/lib/vector';
import GameObject from '@/game/entities/game-object';

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
		createInteractables(this, this.player);

		const boundaries = createBoundaries(this, this.map);

		const vendingMachine = new GameObject(this, {
			position: new Vec(100, 155),
			spriteKey: 'vendingMachineItchio',
			body: {
				isStatic: true,
				size: new Vec(20, 10),
				offset: new Vec(6, 0),
				scale: 3,
			},
		});

		new GameObject(this, {
			position: new Vec(315, 100),
			spriteKey: 'clockItchio',
			body: {
				isStatic: true,
				size: Vec.zero(),
				offset: Vec.zero(),
				scale: 1.5,
			},
		});

		const cabinets = GameObject.factory(
			this,
			{
				position: new Vec(470, 155),
				spriteKey: 'fileCabinetItchio',
				body: {
					isStatic: true,
					size: new Vec(10, 10),
					offset: new Vec(11, 0),
					scale: 3,
				},
			},
			[
				{ x: 440, y: 155 },
				{ x: 470, y: 155 },
				{ x: 530, y: 155 },
			],
		);

		const colliders = [
			...this.interactables.map((i) => i.getSprite()),
			vendingMachine.getCollider(),
			...cabinets,
			...boundaries,
		];
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
