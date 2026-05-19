import { Math } from 'phaser';
import Interactable from '@game/entities/interactable';
import { eventBus } from '@game/events';

const { Vector2 } = Math;

const interactableConfigs = {
	desk: {
		label: {
			message: 'game.objects.desk',
			position: new Vector2(335, 175),
			offset: new Vector2(0, -55),
			style: {
				color: '#000000',
				fontSize: '20px',
			},
			visible: false,
		},
		trigger: {
			type: 'box',
			position: new Vector2(335, 200),
			size: new Vector2(115, 85),
		},
		interaction: {
			onEnter: () => {
				eventBus.emitPageNavigate({ page: '/' });
			},
			onInteract: () => {
				eventBus.emitPlayerInteract();
				eventBus.emitRequestPause({ sender: 'desk' });
			},
		},
	},
};

const createInteractables = (scene, player, interactKey) =>
	Object.entries(interactableConfigs).map(([key, config]) => {
		const interactable = new Interactable(scene, key, {
			...config,
			interaction: {
				...config.interaction,
				key: interactKey,
			},
		});

		interactable.addOverlapWith(player);
		return interactable;
	});

export default createInteractables;
