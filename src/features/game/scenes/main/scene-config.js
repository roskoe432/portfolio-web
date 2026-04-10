import gameEvents from '@features/game/game-events';
import GameObject from '@features/game/entities/game-object';
import Vec from '@features/game/lib/vector';

const defaultTextConfig = {
	color: '#2ec400',
	fontSize: '14px',
	offset: new Vec(0, -55),
	showByDefault: false,
};

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
				...defaultTextConfig,
			},
			onEnter: () => {
				gameEvents.emitNavigate({ page: '/' });
				console.log('Player entered the About trigger!');
			},
			onExit: () => {
				console.log('Player left the About trigger!');
			},
			onInteract: (scene) => {
				console.log('E key pressed while in About trigger!');
				gameEvents.emitInteract({ type: 'computer', page: '/' });
				scene.pauseGame();
			},
		},
	},
	fileCabinet: {
		position: new Vec(555, 155),
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
				...defaultTextConfig,
				offset: new Vec(-5, -55),
			},
			onEnter: () => {
				gameEvents.emitNavigate({ page: '/blog' });
				console.log('Player entered the Blog trigger!');
			},
			onExit: () => {
				console.log('Player left the Blog trigger!');
			},
			onInteract: (scene) => {
				console.log('E key pressed while in Blog trigger!');
				gameEvents.emitInteract({ type: 'computer', page: '/blog' });
				scene.pauseGame();
			},
		},
	},

	faxMachine: {
		position: new Vec(100, 160),
		spriteKey: 'printerItchio',
		body: {
			isStatic: true,
			size: new Vec(20, 10),
			offset: new Vec(6, 0),
			scale: 3,
		},
		depth: 1,
		trigger: {
			size: new Vec(80, 110),
			text: {
				message: 'Contact (E)',
				...defaultTextConfig,
				offset: new Vec(-5, -55),
			},
			onEnter: () => {
				gameEvents.emitNavigate({ page: '/contact' });
				console.log('Player entered the Contact trigger!');
			},
			onExit: () => {
				console.log('Player left the Contact trigger!');
			},
			onInteract: (scene) => {
				console.log('E key pressed while in Contact trigger!');
				gameEvents.emitInteract({ type: 'computer', page: '/contact' });
				scene.pauseGame();
			},
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

	cabinets: {
		spriteKey: 'fileCabinetItchio',
		body: {
			isStatic: true,
			size: new Vec(10, 10),
			offset: new Vec(11, 0),
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
			scene.interactables.push(obj); // Add to scene's interactables array
		}

		return [...acc, obj.getCollider()];
	}, []);

export default createGameObjects;
