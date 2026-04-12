import Phaser from 'phaser';
import { TransitionKey, transitionTo } from '../lib/transitions';

class LoaderScene extends Phaser.Scene {
	startText = null;
	cameraWidth = 0;
	cameraHeight = 0;

	constructor() {
		super({ key: 'Loader' });
	}

	loadAssets = () =>
		new Promise((resolve) => {
			this.load.on('complete', resolve);
			this.load.pack('gameAssets', '/assets/manifest.json');
		});

	async preload() {
		await this.loadAssets();
	}

	create() {
		this.input.on('pointerdown', () => {
			console.log('Pointer down, starting transition to Main scene');
		});
		transitionTo(this, 'Main', TransitionKey.fadeIn, TransitionKey.fadeOut, {
			durationInSeconds: 1,
			color: 0x000000,
			ease: 'Sine.easeInOut',
			depth: 100,
		});
	}
}

export default LoaderScene;
