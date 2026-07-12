import BaseTrigger from './base-trigger';

const BoxTrigger = (() => {
	/**
	 * @param {import('phaser').Math.Vector2} position
	 * @param {import('phaser').Math.Vector2} size
	 * @constructor
	 */
	function Settings(position, size) {
		BaseTrigger.Settings.call(this, position);
		this.size = size;
	}
	Settings.prototype = Object.create(BaseTrigger.Settings.prototype);
	Settings.prototype.constructor = Settings;

	/**
	 * @param {import('phaser').Scene} scene
	 * @param {Settings} settings
	 * @constructor
	 */
	function BoxTrigger(scene, settings) {
		BaseTrigger.call(this, scene, settings);
		this.body.setSize(settings.size.x, settings.size.y);
	}
	BaseTrigger.derive(BoxTrigger);

	/**
	 * Box-specific settings constructor.
	 * @type {typeof Settings}
	 */
	BoxTrigger.Settings = Settings;

	return BoxTrigger;
})();

export default BoxTrigger;
