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
		text: {
			message: 'About (E)',
			offsetX: 0,
			offsetY: -60,
			color: '#00ff00',
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
		text: {
			message: 'Blog (E)',
			offsetX: 0,
			offsetY: -60,
			color: '#00ff00',
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
