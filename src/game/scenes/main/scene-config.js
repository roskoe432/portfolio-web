import { gameEvents, Event } from '@game/events';
import GameObject from '@/game/entities/game-object';
import { Math } from 'phaser';

const { Vector2 } = Math;

const defaultTextConfig = {
	color: '#2ec400',
	fontSize: '14px',
	offset: new Vector2(0, -55),
	showByDefault: false,
};

const gameObjectsConfig = {
	desk: {
		position: new Vector2(335, 175),
		spriteKey: 'desk',
		body: {
			isStatic: true,
			size: new Vector2(32, 10),
			offset: new Vector2(0, 0),
			scale: 3,
		},
		depth: 1,
		trigger: {
			size: new Vector2(115, 85),
			offset: new Vector2(0, 25),
			text: {
				message: 'About (E)',
				...defaultTextConfig,
			},
			onEnter: () => {
				gameEvents.emit(Event.GAME_NAVIGATE, { page: '/' });
			},
			onExit: () => {},
			onInteract: (scene) => {
				gameEvents.emit(Event.GAME_INTERACT, { type: 'computer', page: '/' });
				scene.pauseGame();
			},
		},
	},
	fileCabinet: {
		position: new Vector2(555, 155),
		spriteKey: 'fileCabinet',
		body: {
			isStatic: true,
			size: new Vector2(10, 10),
			offset: new Vector2(11, 0),
			scale: 3,
		},
		depth: 1,
		trigger: {
			size: new Vector2(80, 110),
			text: {
				message: 'Blog (E)',
				...defaultTextConfig,
				offset: new Vector2(-5, -55),
			},
			onEnter: () => {
				gameEvents.emit(Event.GAME_NAVIGATE, { page: '/blog' });
			},
			onExit: () => {},
			onInteract: (scene) => {
				gameEvents.emit(Event.GAME_INTERACT, { type: 'computer', page: '/blog' });
				scene.pauseGame();
			},
		},
	},

	faxMachine: {
		position: new Vector2(100, 160),
		spriteKey: 'printer',
		body: {
			isStatic: true,
			size: new Vector2(20, 10),
			offset: new Vector2(6, 0),
			scale: 3,
		},
		depth: 1,
		trigger: {
			size: new Vector2(80, 110),
			text: {
				message: 'Contact (E)',
				...defaultTextConfig,
				offset: new Vector2(-5, -55),
			},
			onEnter: () => {
				gameEvents.emit(Event.GAME_NAVIGATE, { page: '/contact' });
			},
			onExit: () => {},
			onInteract: (scene) => {
				gameEvents.emit(Event.GAME_INTERACT, { type: 'computer', page: '/contact' });
				scene.pauseGame();
			},
		},
	},

	clock: {
		position: new Vector2(315, 100),
		spriteKey: 'clock',
		body: {
			isStatic: true,
			size: new Vector2(),
			offset: new Vector2(),
			scale: 1.5,
		},
	},

	cabinets: {
		spriteKey: 'fileCabinet',
		body: {
			isStatic: true,
			size: new Vector2(10, 10),
			offset: new Vector2(11, 0),
			scale: 3,
		},
		positions: [
			{ x: 495, y: 155 },
			{ x: 525, y: 155 },
			{ x: 585, y: 155 },
		],
	},
};

const createGameObjects = (scene, player) =>
	Object.values(gameObjectsConfig).reduce((acc, config) => {
		if (config.positions) {
			const objects = GameObject.factory(scene, config, config.positions);
			return [...acc, ...objects];
		}

		const obj = new GameObject(scene, config);
		if (config.trigger) {
			obj.setupPlayerOverlap(player.player);
			scene.interactables.push(obj);
		}

		return [...acc, obj.getCollider()];
	}, []);

export default createGameObjects;
