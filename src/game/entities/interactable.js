import Phaser from 'phaser';
import LocalizedLabel from './localized-label';
import { BoxTrigger, CircleTrigger } from './triggers';

const Interactable = (() => {
	function Interactable(scene, name, settings) {
		this.scene = scene;
		this.key = name;
		this.settings = settings;
		this.label = null;
		this.trigger = null;
		this.inRange = false;

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

		const { position, radius, size, type = 'circle' } = this.settings.trigger;
		const triggerSettings = {
			position: {
				x: position.x,
				y: position.y,
			},
			radius,
			size,
		};

		this.trigger =
			type === 'box'
				? new BoxTrigger(this.scene, triggerSettings)
				: new CircleTrigger(this.scene, triggerSettings);

		this.trigger.events.on('enter', () => {
			this.inRange = true;
			this.label?.setVisible(true);
			this.settings.interaction?.onEnter?.();
		});

		this.trigger.events.on('exit', () => {
			this.inRange = false;
			this.label?.setVisible(false);
			this.settings.interaction?.onExit?.();
		});
	};

	Interactable.prototype.setLabelVisible = function (visible) {
		if (!this.label) return;

		this.label.setVisible(visible);
	};

	Interactable.prototype.addOverlapWith = function (other) {
		if (!this.trigger) return;

		this.trigger.addOverlapWith(other);
	};

	Interactable.prototype.checkInteraction = function () {
		if (!this.inRange) return;

		if (!this.settings.interaction?.onInteract) return;

		if (Phaser.Input.Keyboard.JustDown(this.settings.interaction.key)) {
			this.settings.interaction.onInteract();
		}
	};

	Interactable.prototype.update = function () {
		this.checkInteraction();
	};

	return Interactable;
})();

export default Interactable;
