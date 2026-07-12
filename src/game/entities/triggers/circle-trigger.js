import BaseTrigger from './base-trigger';

const CircleTrigger = (() => {
	/**
	 * @param {import('phaser').Math.Vector2} position
	 * @param {number} radius
	 * @constructor
	 */
	function Settings(position, radius) {
		BaseTrigger.Settings.call(this, position);
		this.radius = radius;
	}
	Settings.prototype = Object.create(BaseTrigger.Settings.prototype);
	Settings.prototype.constructor = Settings;

	/**
	 * @param {import('phaser').Scene} scene
	 * @param {Settings} settings
	 * @constructor
	 */
	function CircleTrigger(scene, settings) {
		BaseTrigger.call(this, scene, settings);
		this.body.setCircle(settings.radius);
	}
	BaseTrigger.derive(CircleTrigger);

	/**
	 * Circle-specific settings constructor.
	 * @type {typeof Settings}
	 */
	CircleTrigger.Settings = Settings;

	return CircleTrigger;
})();

export default CircleTrigger;
