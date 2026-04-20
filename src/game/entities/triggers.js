import Phaser from 'phaser';

const { Zone } = Phaser.GameObjects;
const { EventEmitter } = Phaser.Events;

// BaseTrigger -----------------------------------------------------------------------

/**
 * @constructor
 * @param {Phaser.Math.Vector2} position
 */
function TriggerSettings(position) {
	this.position = position;
}

/**
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {TriggerSettings} settings
 */
export function BaseTrigger(scene, settings) {
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
		} else if (isOverlapping) {
			this.events.emit('stay', this);
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

// BoxTrigger -----------------------------------------------------------------------

/**
 * @constructor
 * @param {Phaser.Math.Vector2} position
 * @param {Phaser.Math.Vector2} size
 */
function BoxTriggerSettings(position, size) {
	TriggerSettings.call(this, position);
	this.size = size;
}
BoxTriggerSettings.prototype = Object.create(TriggerSettings.prototype);
BoxTriggerSettings.prototype.constructor = BoxTriggerSettings;

/**
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {BoxTriggerSettings} settings
 */
export function BoxTrigger(scene, settings) {
	BaseTrigger.call(this, scene, settings);
	this.body.setSize(settings.size.x, settings.size.y);
}
BoxTrigger.prototype = Object.create(BaseTrigger.prototype);
BoxTrigger.prototype.constructor = BoxTrigger;

// CircleTrigger -----------------------------------------------------------------------

/**
 * @constructor
 * @param {Phaser.Math.Vector2} position
 * @param {number} radius
 */
function CircleTriggerSettings(position, radius) {
	TriggerSettings.call(this, position);
	this.radius = radius;
}
CircleTriggerSettings.prototype = Object.create(TriggerSettings.prototype);
CircleTriggerSettings.prototype.constructor = CircleTriggerSettings;

/**
 * @constructor
 * @param {Phaser.Scene} scene
 * @param {CircleTriggerSettings} settings
 */
export function CircleTrigger(scene, settings) {
	BaseTrigger.call(this, scene, settings);
	this.body.setCircle(settings.radius);
}
CircleTrigger.prototype = Object.create(BaseTrigger.prototype);
CircleTrigger.prototype.constructor = CircleTrigger;
