import Phaser from 'phaser';
import { pauseManager, inputManager, assetManager } from '@game/system';

const managerRegistry = [pauseManager, inputManager, assetManager];

export default class GameManager extends Phaser.Scene {
	constructor() {
		super({ key: 'GameManager' });
	}

	init() {
		this.scene.sendToBack(this.scene.key);
		this.scene.setVisible(false);

		managerRegistry.forEach((manager) => manager.register(this));
		managerRegistry.forEach((manager) => manager.onInit(this));
	}

	create() {
		managerRegistry.forEach((manager) => manager.onCreate());
	}

	update() {
		managerRegistry.forEach((manager) => manager.onUpdate());
	}
}
