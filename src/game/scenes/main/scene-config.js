import EventBus from '@/game/system/event-bus';
import GameObject from '@/game/entities/game-object';
import Vec from '@/game/lib/vector';

const gameObjectsConfig = {
	desk: {
		position: new Vec(335, 175),
		spriteKey: 'deskItchio',
		body: {
			isStatic: true,
			size: new Vec(32, 10),
			offset: new Vec(0, 0),
			scale: 3,
		},
		depth: 1,
		trigger: {
			size: new Vec(115, 85),
			offset: new Vec(0, 25),
			text: {
				message: 'About (E)',
				offset: new Vec(0, -60),
				color: '#1eff00',
				fontSize: '14px',
				showByDefault: false,
			},
			onEnter: () => {
				console.log('Player entered the About trigger!');
			},
			onExit: () => {
				console.log('Player left the About trigger!');
			},
			onInteract: (scene) => {
				console.log('E key pressed while in About trigger!');
				EventBus.emit('interact', { type: 'computer', page: '/' });
				scene.pauseGame();
			},
		},
	},
	fileCabinet: {
		position: new Vec(500, 155),
		spriteKey: 'fileCabinetItchio',
		body: {
			isStatic: true,
			size: new Vec(10, 10),
			offset: new Vec(11, 0),
			scale: 3,
		},
		depth: 1,
		trigger: {
			size: new Vec(80, 110),
			text: {
				message: 'Blog (E)',
				offset: new Vec(0, -60),
				color: '#0b5f00',
				fontSize: '14px',
				showByDefault: false,
			},
			onEnter: () => {
				console.log('Player entered the Blog trigger!');
			},
			onExit: () => {
				console.log('Player left the Blog trigger!');
			},
			onInteract: (scene) => {
				console.log('E key pressed while in Blog trigger!');
				EventBus.emit('interact', { type: 'computer', page: '/blog' });
				scene.pauseGame();
			},
		},
	},

	vendingMachine: {
		position: new Vec(100, 155),
		spriteKey: 'vendingMachineItchio',
		body: {
			isStatic: true,
			size: new Vec(20, 10),
			offset: new Vec(6, 0),
			scale: 3,
		},
	},
	clock: {
		position: new Vec(315, 100),
		spriteKey: 'clockItchio',
		body: {
			isStatic: true,
			size: Vec.zero(),
			offset: Vec.zero(),
			scale: 1.5,
		},
	},
	waterCooler: {
		position: new Vec(150, 172),
		spriteKey: 'waterCoolerItchio',
		body: {
			isStatic: true,
			size: new Vec(12, 5),
			offset: new Vec(10, -6),
			scale: 2,
		},
	},

	cabinets: {
		spriteKey: 'fileCabinetItchio',
		body: {
			isStatic: true,
			size: new Vec(10, 10),
			offset: new Vec(11, 0),
			scale: 3,
		},
		positions: [
			{ x: 440, y: 155 },
			{ x: 470, y: 155 },
			{ x: 530, y: 155 },
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
			scene.interactables.push(obj); // Add to scene's interactables array
		}

		return [...acc, obj.getCollider()];
	}, []);

export default createGameObjects;
