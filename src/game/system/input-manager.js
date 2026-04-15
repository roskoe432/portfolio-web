import Phaser from 'phaser';
import { gameEvents, Event } from '../events';

class InputManager {
	constructor(scene) {
		this.scene = scene;
		this.cursors = null;
		this.wasdKeys = null;
		this.eKey = null;
		this.pKey = null;
	}

	init() {
		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.wasdKeys = this.scene.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
		this.eKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		this.pKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			gameEvents.emit(Event.GAME_P_KEY_PRESSED);
		}

		if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
			gameEvents.emit(Event.GAME_E_KEY_PRESSED);
		}

		const direction = {
			up: this.cursors.up.isDown || this.wasdKeys.up.isDown,
			down: this.cursors.down.isDown || this.wasdKeys.down.isDown,
			left: this.cursors.left.isDown || this.wasdKeys.left.isDown,
			right: this.cursors.right.isDown || this.wasdKeys.right.isDown,
		};

		if (direction.up || direction.down || direction.left || direction.right) {
			gameEvents.emit(Event.GAME_NAV_KEYS_PRESSED, direction);
		}
	}
}

export default InputManager;
