import BaseManager from './base.manager';

function AssetManager(eventBus, logger, assetPath) {
	BaseManager.call(this, eventBus, logger);

	this.assetPath = assetPath;
	this.loaded = false;

	this.onInit = () => {
		if (this.loaded) return;

		this.eventBus.onUIMounted(() => {
			this.logger.debug('UI Mounted, starting asset loading');
			this.loadAssets();
		});
	};

	this.loadAssets = () =>
		new Promise((resolve) => {
			this.scene.load.on('progress', (value) => {
				this.eventBus.emitAssetLoadProgress({ progress: value });
			});

			this.scene.load.on('complete', () => {
				if (this.loaded) return;

				this.logger.debug('Asset loading complete');
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

BaseManager.derive(AssetManager);

export default AssetManager;
