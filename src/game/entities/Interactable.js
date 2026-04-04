import Phaser from 'phaser';

export class Interactable {
	constructor(scene, config) {
		this.scene = scene;
		this.config = config;
		this.isPlayerInRange = false;
		this.text = null;

		this.sprite = scene.physics.add.image(config.position.x, config.position.y, config.spriteKey);

		if (config.body.size) {
			this.sprite.body.setSize(config.body.size.x, config.body.size.y, true);
		}
		this.sprite.setScale(config.body.scale || 1);
		this.sprite.body.setImmovable(true);

		if (config.body.offset) {
			const offsetX =
				config.body.offset.x ??
				(this.sprite.width - (config.body.size?.x || this.sprite.width)) / 2;

			const offsetY =
				config.body.offset.y ??
				(this.sprite.height - (config.body.size?.y || this.sprite.height)) / 2;

			this.sprite.body.setOffset(offsetX, offsetY);
		}

		if (config.body.size || config.body.offset) {
			this.sprite.refreshBody();
		}

		this.sprite.setDepth(config.depth || 1);

		this.createTriggerZone();

		if (config.text) {
			this.text = scene.add
				.text(
					config.position.x + config.text.offset.x,
					config.position.y + config.text.offset.y,
					config.text.message,
					{
						family: 'Arial',
						fontStyle: 'bold',
						fontSize: config.text.fontSize || '16px',
						fill: config.text.color || '#000',
					},
				)
				.setOrigin(0.5)
				.setDepth(2)
				.setVisible(config.text.showByDefault || false);
		}
	}

	createTriggerZone() {
		const { size, offset } = this.config.trigger;

		// Apply offset to zone position, not to body
		const zoneX = this.config.position.x + (offset?.x || 0);
		const zoneY = this.config.position.y + (offset?.y || 0);

		this.trigger = this.scene.add.zone(zoneX, zoneY, size.x, size.y).setOrigin(0.5).setDepth(1);
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
					this.onEnter(this.scene);
				}
			},
			null,
			this.scene,
		);
	}

	checkPlayerExit(player) {
		if (!this.isPlayerInRange) return;

		// Use the physics body bounds instead of zone display properties
		const triggerBounds = new Phaser.Geom.Rectangle(
			this.trigger.body.x,
			this.trigger.body.y,
			this.trigger.body.width,
			this.trigger.body.height,
		);
		const playerBounds = new Phaser.Geom.Rectangle(
			player.body.x,
			player.body.y,
			player.body.width,
			player.body.height,
		);

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
			this.config.onEnter(this.scene);
		}
		if (this.text) {
			this.text.setVisible(true);
		}
	}

	onExit() {
		if (this.config.onExit) {
			this.config.onExit(this.scene);
		}
		if (this.text) {
			this.text.setVisible(false);
		}
	}

	onInteract() {
		if (this.config.onInteract) {
			this.config.onInteract(this.scene);
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
