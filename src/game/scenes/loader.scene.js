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
			const { width, height } = this.cameras.main;
			const barWidth = 320;
			const barHeight = 20;
			const cx = width / 2;
			const cy = height / 2;

			const bg = this.add.rectangle(cx, cy, barWidth + 4, barHeight + 4, 0x333333).setOrigin(0.5);
			const fill = this.add
				.rectangle(cx - barWidth / 2, cy, 0, barHeight, 0xffffff)
				.setOrigin(0, 0.5);

			this.load.on('progress', (value) => {
				fill.width = barWidth * value;
			});

			this.load.on('complete', () => {
				bg.destroy();
				fill.destroy();
				resolve();
			});

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
