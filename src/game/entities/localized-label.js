import Phaser from 'phaser';
import { eventBus } from '@game/events';

/**
 * @namespace LocalizedLabel
 */
const LocalizedLabel = (() => {
	/**
	 * @constructor Settings
	 * @param {Phaser.Math.Vector2} position
	 * @param {string} message
	 * @param {Phaser.Types.GameObjects.Text.TextStyle} style
	 */
	function Settings(position, message, style) {
		this.position = position;
		this.message = message;
		this.style = style;
	}

	/**
	 * @constructor LocalizedLabel
	 * @param {Phaser.Scene} scene
	 * @param {Settings} settings
	 */
	function LocalizedLabel(scene, settings, i18next) {
		this.scene = scene;
		this.settings = settings;
		this.i18next = i18next;
		this.label = null;
		this.unsubscribeLanguageChange = null;

		this.createLabel();
		this.unsubscribeLanguageChange = eventBus.onLanguageChange(() => {
			this.refreshText();
		});
	}

	LocalizedLabel.prototype.getText = function () {
		return this.i18next.t(this.settings.message);
	};

	LocalizedLabel.prototype.createLabel = function () {
		const {
			position,
			offset = { x: 0, y: 0 },
			style = {},
			bitmapFont = false,
			visible = true,
			fontKey = 'pixelifySansSmall',
		} = this.settings;
		const x = position.x + offset.x;
		const y = position.y + offset.y;
		const text = this.getText();
		const fontSize = Number.parseInt(style.fontSize, 10) || 16;

		this.label = bitmapFont
			? this.scene.add.bitmapText(x, y, fontKey, text, fontSize)
			: this.scene.add.text(x, y, text, style);

		this.label.setOrigin(0.5).setDepth(2).setVisible(visible);

		if (bitmapFont && style.color) {
			this.label.setTint(
				Phaser.Display.Color.HexStringToColor(style.color).color,
			);
		}
	};

	LocalizedLabel.prototype.refreshText = function () {
		console.log('Refreshing text for', this.settings.message);
		if (!this.label) return;

		this.label.setText(this.getText());
	};

	LocalizedLabel.prototype.setVisible = function (visible) {
		if (!this.label) return;

		this.label.setVisible(visible);
	};

	LocalizedLabel.prototype.destroy = function () {
		this.unsubscribeLanguageChange?.();
		this.label?.destroy();
		this.label = null;
	};

	/**
	 * @property {Settings}
	 * @memberof LocalizedLabel
	 * @description The settings for the LocalizedLabel entity.
	 * @static
	 */
	LocalizedLabel.Settings = Settings;

	return LocalizedLabel;
})();

export default LocalizedLabel;
