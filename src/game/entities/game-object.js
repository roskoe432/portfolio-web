import Phaser from 'phaser';
import Vec from '../lib/vector';

const GameObject = (() => {
	function GameObject(scene, config) {
		this.scene = scene;
		this.config = config;
		this.isPlayerInRange = false;
		this.text = null;
		this.trigger = null;

		this.sprite = scene.physics.add.image(config.position.x, config.position.y, config.spriteKey);

		if (config.body.size) {
			this.sprite.body.setSize(config.body.size.x, config.body.size.y, true);
		}

		this.sprite.body.setImmovable(config.body.isStatic || false);
		this.sprite.setScale(config.body.scale || 1);

		if (config.depth) {
			this.sprite.setDepth(config.depth || 1);
		}

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

		if (config.trigger) {
			this.createTriggerZone();
			if (config.trigger.text) {
				this.createTextLabel();
			}
		}

		this.getCollider = () => this.sprite;
		this.getSprite = () => this.sprite;
	}

	GameObject.prototype.createTriggerZone = function () {
		const { size, offset } = this.config.trigger;

		const zoneX = this.config.position.x + (offset?.x || 0);
		const zoneY = this.config.position.y + (offset?.y || 0);

		this.trigger = this.scene.add.zone(zoneX, zoneY, size.x, size.y).setOrigin(0.5).setDepth(1);
		this.scene.physics.add.existing(this.trigger);
		this.trigger.body.setAllowGravity(false);
		this.trigger.body.setImmovable(true);
	};

	GameObject.prototype.createTextLabel = function () {
		const textConfig = this.config.trigger.text;
		this.text = this.scene.add
			.text(
				this.config.position.x + textConfig.offset.x,
				this.config.position.y + textConfig.offset.y,
				textConfig.message,
				{
					fontFamily: 'Arial',
					fontStyle: 'bold',
					fontSize: textConfig.fontSize || '16px',
					fill: textConfig.color || '#000',
				},
			)
			.setOrigin(0.5)
			.setDepth(2)
			.setVisible(textConfig.showByDefault || false);
	};

	GameObject.prototype.setupPlayerOverlap = function (player) {
		if (!this.trigger) return;

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
	};

	GameObject.prototype.checkPlayerExit = function (player) {
		if (!this.isPlayerInRange || !this.trigger) return;

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
	};

	GameObject.prototype.checkInteraction = function (key) {
		if (!this.trigger) return false;

		if (this.isPlayerInRange && Phaser.Input.Keyboard.JustDown(key)) {
			this.onInteract();
			return true;
		}
		return false;
	};

	GameObject.prototype.onEnter = function () {
		if (this.config.trigger?.onEnter) {
			this.config.trigger.onEnter(this.scene);
		}
		if (this.text) {
			this.text.setVisible(true);
		}
	};

	GameObject.prototype.onExit = function () {
		if (this.config.trigger?.onExit) {
			this.config.trigger.onExit(this.scene);
		}
		if (this.text) {
			this.text.setVisible(false);
		}
	};

	GameObject.prototype.onInteract = function () {
		if (this.config.trigger?.onInteract) {
			this.config.trigger.onInteract(this.scene);
		}
	};

	GameObject.prototype.update = function (player, interactKey) {
		if (!this.trigger) return;

		this.checkPlayerExit(player);
		this.checkInteraction(interactKey);
	};

	GameObject.factory = (scene, config, positions) => {
		const objs = [];
		positions.forEach((pos) => {
			const objConfig = {
				...config,
				position: new Vec(pos.x, pos.y),
			};
			objs.push(new GameObject(scene, objConfig).getCollider());
		});
		return objs;
	};

	return GameObject;
})();

export default GameObject;
