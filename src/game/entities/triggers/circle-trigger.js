import { BaseTrigger } from './base-trigger';

/**
 * @namespace CircleTrigger
 */
const CircleTrigger = (() => {
	/**
	 * @constructor
	 * @param {import('phaser').Math.Vector2} position
	 * @param {number} radius
	 */
	function Settings(position, radius) {
		BaseTrigger.Settings.call(this, position);
		this.radius = radius;
	}
	Settings.prototype = Object.create(BaseTrigger.Settings.prototype);
	Settings.prototype.constructor = Settings;

	/**
	 * @constructor
	 * @param {Phaser.Scene} scene
	 * @param {Settings} settings
	 */
	function CircleTrigger(scene, settings) {
		BaseTrigger.call(this, scene, settings);
		this.body.setCircle(settings.radius);
	}
	BaseTrigger.derive(CircleTrigger);

	/**
	 * @property {Settings} Settings
	 * @static
	 * @memberof CircleTrigger
	 */
	CircleTrigger.Settings = Settings;

	return CircleTrigger;
})();

export default CircleTrigger;
