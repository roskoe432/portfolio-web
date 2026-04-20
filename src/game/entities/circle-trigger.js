import Phaser from 'phaser';

const { Sprite } = Phaser.GameObjects;
const { EventEmitter } = Phaser.Events;

function CircleTrigger(scene, eventBus, { position, radius }) {
	Sprite.call(this, scene, position.x, position.y, null);

	this.events = new EventEmitter();

	this.scene = scene;
	this.eventBus = eventBus;
	this.colliders = [];
	this.overlapState = new WeakMap();

	this.scene.physics.add.existing(this);
	this.body.setCircle(radius);
	this.body.setImmovable(true);
	this.body.setAllowGravity(false);

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

	this.on('destroy', () => {
		this.scene.events.off('update', this.handleSceneUpdate, this);
	});
}
CircleTrigger.prototype = Object.create(Sprite.prototype);
CircleTrigger.prototype.constructor = CircleTrigger;

export default CircleTrigger;
