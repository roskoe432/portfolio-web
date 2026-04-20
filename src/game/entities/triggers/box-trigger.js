import { BaseTrigger } from './base-trigger';

/**
 * @namespace BoxTrigger
 */
const BoxTrigger = (() => {
	/**
	 * @constructor
	 * @param {import('phaser').Math.Vector2} position
	 * @param {import('phaser').Math.Vector2} size
	 */
	function Settings(position, size) {
		BaseTrigger.Settings.call(this, position);
		this.size = size;
	}
	Settings.prototype = Object.create(BaseTrigger.Settings.prototype);
	Settings.prototype.constructor = Settings;

	/**
	 * @constructor
	 * @param {Phaser.Scene} scene
	 * @param {Settings} settings
	 */
	function BoxTrigger(scene, settings) {
		BaseTrigger.call(this, scene, settings);
		this.body.setSize(settings.size.x, settings.size.y);
	}
	BoxTrigger.prototype = Object.create(BaseTrigger.prototype);
	BoxTrigger.prototype.constructor = BoxTrigger;

	/**
	 * @property {Settings} Settings
	 * @static
	 * @memberof BoxTrigger
	 */
	BoxTrigger.Settings = Settings;

	return BoxTrigger;
})();

export default BoxTrigger;
