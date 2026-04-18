import Phaser from 'phaser';
import BaseManager from './base.manager';

function InputManager(eventBus, logger) {
	BaseManager.call(this, eventBus, logger);

	this.inputEnabled = true;
	this.pauseEnabled = true;
	this.lastDirection = { x: 0, y: 0 };

	this.handleDirectionChange = function (cursors, wasdKeys) {
		const keys = {
			up: cursors.up.isDown || wasdKeys.up.isDown,
			down: cursors.down.isDown || wasdKeys.down.isDown,
			left: cursors.left.isDown || wasdKeys.left.isDown,
			right: cursors.right.isDown || wasdKeys.right.isDown,
		};

		const direction = {
			x: (keys.right ? 1 : 0) - (keys.left ? 1 : 0),
			y: (keys.down ? 1 : 0) - (keys.up ? 1 : 0),
		};

		if (
			direction.x !== this.lastDirection.x ||
			direction.y !== this.lastDirection.y
		) {
			this.lastDirection = direction;
			this.eventBus.emitNavigationKeysPressed({ keys, direction });
		}
	};

	this.onDisableInput = function ({ disablePause }) {
		this.eventBus.emitNavigationKeysPressed({
			keys: {},
			direction: { x: 0, y: 0 },
		});
		this.lastDirection = { x: 0, y: 0 };
		console.debug('Disabling input', { disablePause });
		this.pauseEnabled = !disablePause;
		this.inputEnabled = false;
	};

	this.onEnableInput = function () {
		this.inputEnabled = true;
		this.pauseEnabled = true;
	};

	this.onInit = function () {
		this.eventBus.onInputDisabled(this.onDisableInput.bind(this));
		this.eventBus.onInputEnabled(this.onEnableInput.bind(this));

		this.cursors = this.scene.input.keyboard.createCursorKeys();
		this.wasdKeys = this.scene.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
		this.eKey = this.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.E,
		);
		this.pKey = this.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.P,
		);
	};

	this.onUpdate = function () {
		if (Phaser.Input.Keyboard.JustDown(this.pKey) && this.pauseEnabled) {
			this.logger.debug('P key pressed');
			this.eventBus.emitPKeyPressed();
		}

		if (!this.inputEnabled) return;

		if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
			this.logger.debug('E key pressed');
			this.eventBus.emitEKeyPressed();
		}

		this.handleDirectionChange(this.cursors, this.wasdKeys);
	};
}
BaseManager.derive(InputManager);

export default InputManager;
