import Phaser from 'phaser';
import gameEvents from '@features/game/game-events';

export default class PauseMenu extends Phaser.Scene {
	pKey = null;

	constructor() {
		super({ key: 'PauseMenu' });
	}

	resumeGame() {
		this.input.keyboard.enableGlobalCapture();
		console.log('Resuming game');
		this.scene.stop();
		this.scene.resume('Main');
	}

	preload() {
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.scene.get('Main').scene.pause();
	}

	create() {
		this.input.keyboard.disableGlobalCapture();
		gameEvents.onResumeGame(this.resumeGame.bind(this));

		const { width, height } = this.scale;

		this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);

		this.add
			.text(width / 2, height / 2 - 20, 'Paused', {
				fontSize: '64px',
				fontFamily: 'Arial',
				color: '#ffffff',
				align: 'center',
			})
			.setOrigin(0.5);
	}

	update() {
		const active = document.activeElement;
		const isInputFocused =
			active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
		if (!isInputFocused && Phaser.Input.Keyboard.JustDown(this.pKey)) {
			gameEvents.emitResumeGame();
		}
	}
}
