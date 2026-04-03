import EventBus from '@/game/system/event-bus';
import { Interactable } from '@/game/entities';

const interactablesConfig = {
	desk: {
		x: 315,
		y: 250,
		spriteKey: 'computerDesk',
		bodySize: { width: 50, height: 50 },
		bodyOffset: {
			x: 40,
			y: 8.5,
		},
		depth: 1,
		triggerZone: {
			x: 315,
			y: 250,
			width: 125,
			height: 117,
		},
		onEnter: () => {
			console.log('Player entered the computer desk trigger!');
		},
		onExit: () => {
			console.log('Player left the computer desk trigger!');
		},
		onInteract: (scene) => {
			console.log('E key pressed while in computer desk trigger!');
			EventBus.emit('interact', { type: 'computer', page: '/', title: 'About' });
			scene.pauseGame();
		},
	},
	blogTest: {
		x: 500,
		y: 250,
		spriteKey: 'computerDesk',
		bodySize: { width: 50, height: 50 },
		bodyOffset: {
			x: 40,
			y: 8.5,
		},
		depth: 1,
		triggerZone: {
			x: 500,
			y: 250,
			width: 125,
			height: 117,
		},
		onEnter: () => {
			console.log('Player entered the computer desk trigger!');
		},
		onExit: () => {
			console.log('Player left the computer desk trigger!');
		},
		onInteract: (scene) => {
			console.log('E key pressed while in computer desk trigger!');
			EventBus.emit('interact', { type: 'computer', page: '/blog', title: 'Blog' });
			scene.pauseGame();
		},
	},
};

const createInteractables = (scene, player) => {
	Object.values(interactablesConfig).forEach((config) => {
		const interactable = new Interactable(scene, config);
		interactable.setupPlayerOverlap(player.player);
		scene.interactables.push(interactable);
		return interactable;
	});
};

export default createInteractables;
