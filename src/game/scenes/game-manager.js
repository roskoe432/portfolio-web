import Phaser from 'phaser';
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
		this.inputManager = new InputManager(this);
		this.pauseManager = new PauseManager(this);
		this.assetLoader = new AssetLoader(this);

		this.inputManager.init();
		this.assetLoader.init();
		this.scene.sendToBack(this.scene.key);
		this.scene.setVisible(false);
	}

	update() {
		this.inputManager.update();
	}
}
