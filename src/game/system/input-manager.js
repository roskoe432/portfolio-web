import Phaser from 'phaser';

class InputManager {
	inputEnabled = true;
	lastDirection = { x: 0, y: 0 };
	eventBus;
	logger;

	constructor(scene, eventBus, logger) {
		this.scene = scene;
		this.eventBus = eventBus;
		this.logger = logger;
		this.cursors = null;
		this.wasdKeys = null;
		this.eKey = null;
		this.pKey = null;
	}

	handleDirectionChange(cursors, wasdKeys) {
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
	}

	onDisableInput() {
		this.eventBus.emitNavigationKeysPressed({
			keys: {},
			direction: { x: 0, y: 0 },
		});
		this.lastDirection = { x: 0, y: 0 };
		this.inputEnabled = false;
	}

	onEnableInput() {
		this.inputEnabled = true;
	}

	init() {
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
	}

	update() {
		if (!this.inputEnabled) return;

		if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
			this.eventBus.emitPKeyPressed();
		}

		if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
			this.eventBus.emitEKeyPressed();
		}

		this.handleDirectionChange(this.cursors, this.wasdKeys);
	}
}

export default InputManager;
