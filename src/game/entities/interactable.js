import LocalizedLabel from './localized-label';
import { CircleTrigger } from './triggers';

const Interactable = (() => {
	function Interactable(scene, name, settings) {
		this.scene = scene;
		this.key = name;
		this.settings = settings;
		this.label = null;
		this.trigger = null;

		this.createLabel();
		this.createTrigger();
	}

	Interactable.prototype.createLabel = function () {
		if (!this.settings.label) return;

		const {
			position,
			offset = { x: 0, y: 0 },
			style = {
				fontSize: '20px',
				color: '#000000',
			},
			bitmapFont = true,
			fontKey = 'pixelifySansSmall',
			visible = false,
		} = this.settings.label;
		const x = position.x + offset.x;
		const y = position.y + offset.y;
		const message = this.settings.label.message || '';

		this.label = new LocalizedLabel(this.scene, {
			position: { x, y },
			style,
			bitmapFont,
			fontKey,
			message,
			visible,
		});
	};

	Interactable.prototype.createTrigger = function () {
		if (!this.settings.trigger) {
			throw new Error(
				`Interactable ${this.key} is missing trigger configuration`,
			);
		}

		this.trigger = new CircleTrigger(this.scene, {
			position: {
				x: this.settings.trigger.position.x,
				y: this.settings.trigger.position.y,
			},
			radius: this.settings.trigger.radius,
		});
	};

	Interactable.prototype.setLabelVisible = function (visible) {
		if (!this.label) return;

		this.label.setVisible(visible);
	};

	return Interactable;
})();

export default Interactable;
