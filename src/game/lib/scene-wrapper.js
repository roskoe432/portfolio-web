import { Scene } from 'phaser';

export default class SceneWrapper extends Scene {
	onPreload;
	onCreate;
	onUpdate;

	constructor(key, onPreload, onCreate, onUpdate) {
		super({ key });
		this.onPreload = onPreload;
		this.onCreate = onCreate;
		this.onUpdate = onUpdate;
	}

	preload() {
		if (this.onPreload) this.onPreload(this);
	}

	create() {
		if (this.onCreate) this.onCreate(this);
	}

	update(time, delta) {
		if (this.onUpdate) this.onUpdate(this, time, delta);
	}
}
