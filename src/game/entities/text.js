import Phaser from 'phaser';

/**
 * @namespace LocalizedText
 */
const LocalizedText = (() => {
	/**
	 * @constructor Settings
	 * @param {Phaser.Math.Vector2} position
	 * @param {string} text
	 * @param {Phaser.Types.GameObjects.Text.TextStyle} style
	 */
	function Settings(position, text, style) {
		this.position = position;
		this.text = text;
		this.style = style;
	}

	function LocalizedText(scene, settings) {
		Phaser.GameObjects.Text.call(
			this,
			scene,
			settings.position.x,
			settings.position.y,
			settings.text,
			settings.style,
		);
	}

	/**
	 * @property {Settings} Settings
	 * @memberof LocalizedText
	 * @description The settings for the LocalizedText entity.
	 * @static
	 */
	LocalizedText.Settings = Settings;

	return LocalizedText;
})();

export default LocalizedText;
