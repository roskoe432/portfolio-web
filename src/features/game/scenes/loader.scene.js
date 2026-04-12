import Phaser from 'phaser';
import { TransitionKey, transitionTo } from '../lib/transitions';

class LoaderScene extends Phaser.Scene {
	startText = null;
	cameraWidth = 0;
	cameraHeight = 0;

	constructor() {
		super({ key: 'Loader' });
	}

	drawProgressBar = () =>
		new Promise((resolve) => {
			this.cameraWidth = this.cameras.main.width;
			this.cameraHeight = this.cameras.main.height;

			const progressBox = this.add.graphics();
			progressBox.fillStyle(0x222222, 0.8);
			progressBox.fillRect(
				this.cameraWidth / 4,
				this.cameraHeight / 2 - 25,
				this.cameraWidth / 2,
				50,
			);
			progressBox.setDepth(1);

			const progressBar = this.add.graphics();
			progressBar.setDepth(2);

			this.load.on('progress', (value) => {
				progressBar.clear();
				progressBar.fillStyle(0xffffff, 1);

				const barWidth = (this.cameraWidth / 2 - 20) * value;
				progressBar.fillRect(this.cameraWidth / 4 + 10, this.cameraHeight / 2 - 15, barWidth, 30);
			});

			this.load.on('complete', () => {
				console.log('Loading complete');
				progressBar.destroy();
				progressBox.destroy();
				resolve();
			});

			this.load.pack('gameAssets', '/assets/manifest.json');
		});

	async preload() {
		await this.drawProgressBar();
	}

	create() {
		transitionTo(this, 'Main', TransitionKey.fadeIn, TransitionKey.fadeOut, {
			durationInSeconds: 3,
			color: 0xffffff,
			ease: 'Sine.easeInOut',
			depth: 100,
		});
	}
}

export default LoaderScene;
