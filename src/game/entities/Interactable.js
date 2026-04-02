import Phaser from 'phaser';

export class Interactable {
	constructor(scene, config) {
		this.scene = scene;
		this.config = config;
		this.isPlayerInRange = false;

		this.sprite = scene.physics.add.image(config.x, config.y, config.spriteKey);

		if (config.bodySize) {
			this.sprite.body.setSize(config.bodySize.width, config.bodySize.height, true);
		}
		this.sprite.body.setImmovable(true);

		if (config.bodyOffset) {
			const offsetX = config.bodyOffset.x ?? (this.sprite.width - config.bodySize.width) / 2;
			const offsetY = config.bodyOffset.y ?? (this.sprite.height - config.bodySize.height) / 2;
			this.sprite.body.setOffset(offsetX, offsetY);
		} else if (config.bodySize) {
			const offsetX = (this.sprite.width - config.bodySize.width) / 2;
			const offsetY = (this.sprite.height - config.bodySize.height) / 2;
			this.sprite.body.setOffset(offsetX, offsetY);
		}

		if (config.bodySize || config.bodyOffset) {
			this.sprite.refreshBody();
		}

		this.sprite.setDepth(config.depth || 1);

		this.createTriggerZone();
	}

	createTriggerZone() {
		const { x, y, width, height } = this.config.triggerZone || {
			x: this.sprite.x,
			y: this.sprite.y,
			width: this.sprite.width,
			height: this.sprite.height,
		};

		this.trigger = this.scene.add.zone(x, y, width, height).setOrigin(0.5).setDepth(1);
		this.scene.physics.add.existing(this.trigger);
		this.trigger.body.setAllowGravity(false);
		this.trigger.body.setImmovable(true);
	}

	setupPlayerOverlap(player) {
		this.scene.physics.add.overlap(
			player,
			this.trigger,
			() => {
				if (!this.isPlayerInRange) {
					this.isPlayerInRange = true;
					this.onEnter();
				}
			},
			null,
			this.scene,
		);
	}

	checkPlayerExit(player) {
		if (!this.isPlayerInRange) return;

		const triggerBounds = new Phaser.Geom.Rectangle(
			this.trigger.x - this.trigger.width / 2,
			this.trigger.y - this.trigger.height / 2,
			this.trigger.width,
			this.trigger.height,
		);
		const playerBounds = player.getBounds();

		if (!Phaser.Geom.Intersects.RectangleToRectangle(triggerBounds, playerBounds)) {
			this.isPlayerInRange = false;
			this.onExit();
		}
	}

	checkInteraction(key) {
		if (this.isPlayerInRange && Phaser.Input.Keyboard.JustDown(key)) {
			this.onInteract();
			return true;
		}
		return false;
	}

	onEnter() {
		if (this.config.onEnter) {
			this.config.onEnter();
		}
	}

	onExit() {
		if (this.config.onExit) {
			this.config.onExit();
		}
	}

	onInteract() {
		if (this.config.onInteract) {
			this.config.onInteract();
		}
	}

	getSprite() {
		return this.sprite;
	}

	update(player, interactKey) {
		this.checkPlayerExit(player);
		this.checkInteraction(interactKey);
	}
}
