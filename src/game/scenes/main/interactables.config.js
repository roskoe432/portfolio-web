import EventBus from '@/game/system/event-bus';
import { Interactable } from '@/game/entities';
import Vec from '@/game/lib/vector';

const interactablesConfig = {
	desk: {
		position: new Vec(250, 250),
		spriteKey: 'deskItchio',
		body: {
			size: new Vec(32, 10),
			offset: new Vec(0, 0),
			scale: 3,
		},
		depth: 1,
		trigger: {
			size: new Vec(125, 117),
		},
		text: {
			message: 'About (E)',
			offset: new Vec(0, -60),
			color: '#000000',
			fontSize: '14px',
			showByDefault: false,
		},
		onCreate: () => {},
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
	fileCabinet: {
		position: new Vec(500, 155),
		spriteKey: 'fileCabinetItchio',
		body: {
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
			color: '#000000',
			fontSize: '14px',
			showByDefault: false,
		},
		onCreate: () => {},
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
};

const createInteractables = (scene, player) => {
	Object.values(interactablesConfig).forEach((config) => {
		const interactable = new Interactable(scene, config);
		interactable.setupPlayerOverlap(player.player);
		scene.interactables.push(interactable);
		if (config.onCreate) {
			config.onCreate(interactable);
		}
		return interactable;
	});
};

export default createInteractables;
