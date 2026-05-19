import Phaser from 'phaser';
import LocalizedLabel from './localized-label';
import { CircleTrigger } from './triggers';

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

		this.trigger = new CircleTrigger(this.scene, {
			position: {
				x: this.settings.trigger.position.x,
				y: this.settings.trigger.position.y,
			},
			radius: this.settings.trigger.radius,
		});

		if (this.settings.trigger.onEnter) {
			this.trigger.events.on('enter', () => {
				this.inRange = true;
				this.label?.setVisible(true);
				this.settings.trigger.onEnter();
			});
		}

		if (this.settings.trigger.onExit) {
			this.trigger.events.on('exit', () => {
				this.inRange = false;
				this.label?.setVisible(false);
				this.settings.trigger.onExit();
			});
		}
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

	return Interactable;
})();

export default Interactable;
