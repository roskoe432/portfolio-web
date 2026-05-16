import Phaser from 'phaser';
import { eventBus } from '@game/events';
import i18next from 'i18next';

/**
 * @namespace LocalizedLabel
 */
const LocalizedLabel = (() => {
	/**
	 * @constructor LocalizedLabel
	 * @param {Phaser.Scene} scene
	 * @param {Settings} settings
	 */
	function LocalizedLabel(scene, settings) {
		this.scene = scene;
		this.settings = settings;
		this.label = null;
		this.unsubscribeLanguageChange = null;

		this.createLabel();
		this.unsubscribeLanguageChange = eventBus.onLanguageChange(() => {
			this.refreshText();
		});
	}

	/**
	 *
	 * @returns {string}
	 */
	LocalizedLabel.prototype.getText = function () {
		console.log('Getting text for key:', this.settings.message);
		return i18next.t(this.settings.message);
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

	return LocalizedLabel;
})();

export default LocalizedLabel;
