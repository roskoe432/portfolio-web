import i18next from 'i18next';
import { eventBus } from '@game/events';
import GameObject from '@game/entities/game-object';
import { Math } from 'phaser';

const { Vector2 } = Math;

const defaultTextConfig = {
	color: '#000000',
	fontSize: '20px',
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
				message: 'game.objects.desk',
				...defaultTextConfig,
			},
			onEnter: () => {
				eventBus.emitPageNavigate({ page: '/' });
			},
			onExit: () => {},
			onInteract: () => {
				eventBus.emitPlayerInteract();
				eventBus.emitRequestPause({ sender: 'desk' });
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
				message: 'game.objects.fileCabinet',
				...defaultTextConfig,
				offset: new Vector2(-5, -55),
			},
			onEnter: () => {
				eventBus.emitPageNavigate({ page: '/blog' });
			},
			onExit: () => {},
			onInteract: () => {
				eventBus.emitPlayerInteract();
				eventBus.emitRequestPause({ sender: 'fileCabinet' });
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
				message: 'game.objects.faxMachine',
				...defaultTextConfig,
				offset: new Vector2(-5, -55),
			},
			onEnter: () => {
				eventBus.emitPageNavigate({ page: '/contact' });
			},
			onExit: () => {},
			onInteract: () => {
				eventBus.emitPlayerInteract();
				eventBus.emitRequestPause({ sender: 'faxMachine' });
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
			const objects = GameObject.factory(
				scene,
				config,
				config.positions,
				i18next,
			);
			return [...acc, ...objects];
		}

		const obj = new GameObject(scene, config, i18next);
		if (config.trigger) {
			obj.setupPlayerOverlap(player);
			scene.interactables.push(obj);
		}

		return [...acc, obj.getCollider()];
	}, []);

export default createGameObjects;
