import Phaser from 'phaser';
import { gameEvents, Event } from '@game/events';

export default class PauseScene extends Phaser.Scene {
	pKey = null;
	isPaused = false;

	constructor() {
		super({ key: 'PauseScene' });
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
		gameEvents.emit(Event.GAME_PAUSE);
		gameEvents.on(Event.GAME_RESUME, this.resumeGame.bind(this));
	}

	update() {
		const active = document.activeElement;
		const isInputFocused =
			active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
		if (!isInputFocused && Phaser.Input.Keyboard.JustDown(this.pKey)) {
			gameEvents.emit(Event.GAME_RESUME);
		}
	}
}
