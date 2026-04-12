import Phaser from 'phaser';
import { TransitionKey, transitionTo } from '../lib/transitions';

class LoaderScene extends Phaser.Scene {
	constructor() {
		super({ key: 'Loader' });
	}

	preload() {
		this.load.pack('gameAssets', '/assets/manifest.json');
	}

	create() {
		transitionTo(this, 'Main', TransitionKey.growFromCenterStart, TransitionKey.fadeOut, {
			durationInSeconds: 3,
			color: 0x000000,
			ease: 'Sine.easeInOut',
			depth: 100,
		});
	}
}

export default LoaderScene;
