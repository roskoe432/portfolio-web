import Phaser from 'phaser';

export default class PauseMenu extends Phaser.Scene {
	pKey = null;

	constructor() {
		super({ key: 'PauseMenu' });
	}

	preload() {
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	}

	create() {
		const { width, height } = this.scale;

		this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);

		this.add
			.text(width / 2, height / 2 - 20, 'Game Paused', {
				fontSize: '64px',
				fontFamily: 'Arial',
				color: '#ffffff',
				align: 'center',
			})
			.setOrigin(0.5);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			this.scene.stop();
			this.scene.resume('MainScene');
		}
	}
}
