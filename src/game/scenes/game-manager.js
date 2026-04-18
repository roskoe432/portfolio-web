import Phaser from 'phaser';
import { pauseManager, inputManager, assetManager } from '@game/system';

const managerRegistry = [pauseManager, inputManager, assetManager];

function GameManager() {
	Phaser.Scene.call(this, { key: 'GameManager' });

	this.init = function () {
		console.debug('GameManager: init');
		this.scene.sendToBack(this.scene.key);
		this.scene.setVisible(false);

		managerRegistry.forEach((manager) => manager.register(this));
		managerRegistry.forEach((manager) => manager.onInit(this));
	};

	this.create = function () {
		console.debug('GameManager: create');
		managerRegistry.forEach((manager) => manager.onCreate());
	};

	this.update = function () {
		managerRegistry.forEach((manager) => manager.onUpdate());
	};
}
GameManager.prototype = Object.create(Phaser.Scene.prototype);
GameManager.prototype.constructor = GameManager;

export default GameManager;
