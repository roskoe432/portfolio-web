import BaseManager from './base.manager';

function PauseManager(eventBus, logger) {
	BaseManager.call(this, eventBus, logger);

	this.isPaused = false;
	const _sceneRegistry = [];

	const _pauseAllScenes = () => {
		_sceneRegistry.forEach((scene) => {
			if (scene.scene.isActive()) {
				scene.scene.pause();
			}
		});
	};

	const _resumeAllScenes = () => {
		_sceneRegistry.forEach((scene) => {
			if (scene.scene.isPaused()) {
				scene.scene.resume();
			}
		});
	};

	this.onInit = () => {
		this.eventBus.onPKeyPressed(() => {
			this.handlePause(!this.isPaused);
		});
		this.eventBus.onRequestPause(() => {
			this.handlePause(true);
		});
		this.eventBus.onRequestResume(() => {
			this.handlePause(false);
		});
	};

	this.pauseGame = () => {
		this.scene.input.keyboard.disableGlobalCapture();
		this.eventBus.emitGamePaused();
		_pauseAllScenes();
	};

	this.resumeGame = () => {
		this.scene.input.keyboard.enableGlobalCapture();
		this.eventBus.emitGameResumed();
		_resumeAllScenes();
	};

	this.handlePause = (isPaused) => {
		this.logger.debug(`${isPaused ? 'Pausing' : 'Resuming'} game`);
		this.isPaused = isPaused;
		if (this.isPaused) {
			return this.pauseGame();
		}
		return this.resumeGame();
	};

	this.registerScene = (scene) => {
		if (!_sceneRegistry.includes(scene)) {
			_sceneRegistry.push(scene);
		}
	};

	this.unregisterScene = (scene) => {
		const index = _sceneRegistry.indexOf(scene);
		if (index !== -1) {
			_sceneRegistry.splice(index, 1);
		}
	};
}
BaseManager.derive(PauseManager);

export default PauseManager;
