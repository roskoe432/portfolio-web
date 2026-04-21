import Phaser from 'phaser';

const { Zone } = Phaser.GameObjects;
const { EventEmitter } = Phaser.Events;

/**
 * @namespace BaseTrigger
 */
const BaseTrigger = (() => {
	/**
	 * @constructor
	 * @param {Phaser.Math.Vector2} position
	 */
	function Settings(position) {
		this.position = position;
	}

	/**
	 * @constructor
	 * @param {Phaser.Scene} scene
	 * @param {Settings} settings
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

		/**
		 * @function
		 * @param {Phaser.GameObjects.GameObject} other
		 * @returns {void}
		 */
		this.addOverlapWith = function (other) {
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
		 * @function
		 * @param {Phaser.GameObjects.GameObject} other
		 * @returns {void}
		 */
		this.checkOverlap = function (other) {
			const wasOverlapping = this.overlapState.get(other) || false;
			const isOverlapping = this.scene.physics.overlap(this, other);

			if (isOverlapping && !wasOverlapping) {
				this.events.emit('enter', this);
			} else if (wasOverlapping && !isOverlapping) {
				this.events.emit('exit', this);
			}

			this.overlapState.set(other, isOverlapping);
		};

		this.handleSceneUpdate = function () {
			this.colliders.forEach((collider) => {
				this.checkOverlap(collider);
			});
		};

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
	 * @property {Settings} Settings
	 * @static
	 * @memberof BaseTrigger
	 */
	BaseTrigger.Settings = Settings;

	return BaseTrigger;
})();

export default BaseTrigger;
