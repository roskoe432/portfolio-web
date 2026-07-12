import Phaser from 'phaser';

const { Zone } = Phaser.GameObjects;
const { EventEmitter } = Phaser.Events;

const BaseTrigger = (() => {
	/**
	 * @constructor
	 * @param {Phaser.Math.Vector2} position
	 */
	function Settings(position) {
		this.position = position;
	}

	/**
	 * @param {Phaser.Scene} scene
	 * @param {Settings} settings
	 * @constructor
	 */
	function BaseTrigger(scene, settings) {
		Zone.call(this, scene, settings.position.x, settings.position.y, 1, 1);
		scene.add.existing(this);

		this.events = new EventEmitter();
		this.scene = scene;
		this.colliders = [];
		this.overlapState = new WeakMap();

		scene.physics.add.existing(this);
		this.body.setImmovable(true);
		this.body.setAllowGravity(false);

		this.scene.events.on('update', this.handleSceneUpdate, this);

		scene.events.once('shutdown', () => {
			this.scene.events.off('update', this.handleSceneUpdate, this);
		});

		this.on('destroy', () => {
			this.scene.events.off('update', this.handleSceneUpdate, this);
		});
	}
	BaseTrigger.prototype = Object.create(Zone.prototype);
	BaseTrigger.prototype.constructor = BaseTrigger;

	/**
	 * Adds one or more game objects to check for overlap against this trigger.
	 * @param {Phaser.GameObjects.GameObject|Phaser.GameObjects.GameObject[]} other
	 * @returns {void}
	 */
	BaseTrigger.prototype.addOverlapWith = function (other) {
		if (Array.isArray(other)) {
			other.forEach((collider) => {
				this.colliders.push(collider);
				this.overlapState.set(collider, false);
			});
			return;
		}

		this.colliders.push(other);
		this.overlapState.set(other, false);
	};

	/**
	 * Emits `enter` or `exit` when overlap state changes for the given object.
	 * @param {Phaser.GameObjects.GameObject} other
	 * @returns {void}
	 */
	BaseTrigger.prototype.checkOverlap = function (other) {
		const wasOverlapping = this.overlapState.get(other) || false;
		const isOverlapping = this.scene.physics.overlap(this, other);

		if (isOverlapping && !wasOverlapping) {
			this.events.emit('enter', this);
		} else if (wasOverlapping && !isOverlapping) {
			this.events.emit('exit', this);
		}

		this.overlapState.set(other, isOverlapping);
	};

	/**
	 * Checks overlap for every registered collider on each scene update.
	 * @returns {void}
	 */
	BaseTrigger.prototype.handleSceneUpdate = function () {
		this.colliders.forEach((collider) => {
			this.checkOverlap(collider);
		});
	};

	/**
	 * Shared settings constructor for trigger subclasses.
	 * @type {typeof Settings}
	 */
	BaseTrigger.Settings = Settings;

	/**
	 * Sets up prototype inheritance for trigger subclasses.
	 * @param {Function} Child
	 * @returns {void}
	 */
	BaseTrigger.derive = (Child) => {
		Child.prototype = Object.create(BaseTrigger.prototype);
		Child.prototype.constructor = Child;
	};

	return BaseTrigger;
})();

export default BaseTrigger;
