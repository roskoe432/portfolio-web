import Phaser from 'phaser';
import { gameEvents, Event } from '../events';

export default class InputManagerScene extends Phaser.Scene {
	cursors = null;
	wasdKeys = null;
	eKey = null;
	pKey = null;

	constructor() {
		super({ key: 'InputManager' });
	}

	init() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.wasdKeys = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
		this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			gameEvents.emit(Event.GAME_HANDLE_PAUSE, true);
		}

		if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
			gameEvents.emit(Event.GAME_INTERACT);
		}

		const direction = {
			up: this.cursors.up.isDown || this.wasdKeys.up.isDown,
			down: this.cursors.down.isDown || this.wasdKeys.down.isDown,
			left: this.cursors.left.isDown || this.wasdKeys.left.isDown,
			right: this.cursors.right.isDown || this.wasdKeys.right.isDown,
		};

		if (direction.up || direction.down || direction.left || direction.right) {
			gameEvents.emit(Event.GAME_NAVIGATE, direction);
		}
	}
}
