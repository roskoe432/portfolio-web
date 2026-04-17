import Phaser from 'phaser';
import logger from '../system/logger';
import { eventBus } from '../events';
import InputManager from '../system/input-manager';
import PauseManager from '../system/pause-manager';
import AssetLoader from '../system/asset-loader';

export default class GameManager extends Phaser.Scene {
	inputManager;
	pauseManager;
	assetLoader;

	constructor() {
		super({ key: 'GameManager' });
	}

	init() {
		this.scene.sendToBack(this.scene.key);
		this.scene.setVisible(false);

		this.inputManager = new InputManager(this, eventBus, logger);
		this.pauseManager = new PauseManager(this, eventBus, logger);
		this.assetLoader = new AssetLoader(this, eventBus, logger);

		this.inputManager.init();
		this.pauseManager.init();
		this.assetLoader.init();
	}

	update() {
		this.inputManager.update();
	}
}
