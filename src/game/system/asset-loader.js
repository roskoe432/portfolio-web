class AssetLoader {
	loaded = false;
	eventBus;
	logger;

	constructor(scene, eventBus, logger, assetPath = '/assets/manifest.json') {
		this.scene = scene;
		this.eventBus = eventBus;
		this.logger = logger;
		this.assetPath = assetPath;
	}

	init() {
		if (this.loaded) return;

		this.eventBus.onUIMounted(() => {
			console.log('UI Mounted, starting asset loading');
			this.loadAssets();
		});
	}

	loadAssets = () =>
		new Promise((resolve) => {
			this.scene.load.on('progress', (value) => {
				this.eventBus.emitAssetLoadProgress({ progress: value });
			});

			this.scene.load.on('complete', () => {
				if (this.loaded) return;

				this.eventBus.emitAssetLoadComplete();
				this.scene.scene.launch('Main');
				this.loaded = true;
				resolve();
			});

			this.eventBus.emitAssetLoadStart();
			this.scene.load.pack('gameAssets', '/assets/manifest.json');
			this.scene.load.start();
		});
}

export default AssetLoader;
