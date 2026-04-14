import Phaser from 'phaser';
import { gameEvents, Event } from '@game/events';

export default class PauseScene extends Phaser.Scene {
	pKey = null;
	isPaused = false;

	constructor() {
		super({ key: 'PauseScene' });
	}

	init() {
		gameEvents.on(Event.GAME_HANDLE_PAUSE, this.resumeGame.bind(this));
	}

	resumeGame(isPaused) {
		if (isPaused) return;

		this.input.keyboard.enableGlobalCapture();
		this.scene.resume('Main');
		this.scene.stop();
	}

	preload() {
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.scene.get('Main').scene.pause();
	}

	create() {
		this.input.keyboard.disableGlobalCapture();
		gameEvents.emit(Event.GAME_HANDLE_PAUSE, true);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			gameEvents.emit(Event.GAME_HANDLE_PAUSE, false);
		}
	}
}
