import { gameEvents, Event } from '../events';

class AssetLoader {
	loaded = false;

	constructor(scene, assetPath = '/assets/manifest.json') {
		this.scene = scene;
		this.assetPath = assetPath;
	}

	init() {
		if (this.loaded) return;

		gameEvents.on(Event.SYSTEM_UI_MOUNTED, () => {
			this.loadAssets();
		});
	}

	loadAssets = () =>
		new Promise((resolve) => {
			this.scene.load.on('progress', (value) => {
				gameEvents.emit(Event.SYSTEM_ASSET_LOAD_PROGRESS, value);
			});

			this.scene.load.on('complete', () => {
				if (this.loaded) return;

				gameEvents.emit(Event.SYSTEM_ASSET_LOAD_COMPLETE);
				this.scene.scene.launch('Main');
				this.loaded = true;
				resolve();
			});

			gameEvents.emit(Event.SYSTEM_ASSET_LOAD_START);
			this.scene.load.pack('gameAssets', '/assets/manifest.json');
			this.scene.load.start();
		});
}

export default AssetLoader;
