import EventBus from '@/game/system/event-bus';
import GameObject from '@/game/entities/game-object';
import Vec from '@/game/lib/vector';

const gameObjectsConfig = {
	desk: {
		position: new Vec(300, 250),
		spriteKey: 'deskItchio',
		body: {
			// isStatic makes the physics body immovable and unaffected by forces, ideal for static objects like desks
			isStatic: true,
			size: new Vec(32, 10),
			offset: new Vec(0, 0),
			scale: 3,
		},
		depth: 1,
		// (opt in) Creates a trigger zone for this object, with the specified size and offset from the object's position
		trigger: {
			size: new Vec(115, 85),
			offset: new Vec(0, 25),
		},
		// (opt in) Creates a text label that appears when the player is in the trigger zone, with the specified message, offset, color, font size, and whether it's shown by default
		text: {
			message: 'About (E)',
			offset: new Vec(0, -60),
			color: '#1eff00',
			fontSize: '14px',
			showByDefault: false,
		},
		// (opt in) Callback for when the player enters the trigger zone
		onEnter: () => {
			console.log('Player entered the About trigger!');
		},
		// (opt in) Callback for when the player exits the trigger zone
		onExit: () => {
			console.log('Player left the About trigger!');
		},
		// (opt in) Callback for when the player interacts (presses E) while in the trigger zone
		onInteract: (scene) => {
			console.log('E key pressed while in About trigger!');
			EventBus.emit('interact', { type: 'computer', page: '/' });
			scene.pauseGame();
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
		},
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
		position: new Vec(150, 165),
		spriteKey: 'waterCoolerItchio',
		body: {
			isStatic: true,
			size: new Vec(12, 5),
			offset: new Vec(10, -3),
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
		}

		return [...acc, obj.getCollider()];
	}, []);

export default createGameObjects;
