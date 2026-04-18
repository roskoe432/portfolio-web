import BaseManager from './base.manager';

function PauseManager(eventBus, logger) {
	BaseManager.call(this, eventBus, logger);

	this.isPaused = false;
	const _sceneRegistry = [];

	const _pauseAllScenes = function () {
		_sceneRegistry.forEach((scene) => {
			if (scene.scene.isActive()) {
				scene.scene.pause();
			}
		});
	};

	const _resumeAllScenes = function () {
		_sceneRegistry.forEach((scene) => {
			if (scene.scene.isPaused()) {
				scene.scene.resume();
			}
		});
	};

	this.onInit = function () {
		this.eventBus.onPKeyPressed(() => {
			console.debug('P key pressed, toggling pause');
			this.handlePause(!this.isPaused);
		});
		this.eventBus.onRequestPause(() => {
			this.handlePause(true);
		});
		this.eventBus.onRequestResume(() => {
			this.handlePause(false);
		});
	};

	this.pauseGame = function () {
		this.scene.input.keyboard.disableGlobalCapture();
		this.eventBus.emitGamePaused();
		_pauseAllScenes();
	};

	this.resumeGame = function () {
		this.scene.input.keyboard.enableGlobalCapture();
		this.eventBus.emitGameResumed();
		_resumeAllScenes();
	};

	this.handlePause = function (isPaused) {
		this.logger.debug(`${isPaused ? 'Pausing' : 'Resuming'} game`);
		this.isPaused = isPaused;
		if (this.isPaused) {
			return this.pauseGame();
		}
		return this.resumeGame();
	};

	this.registerScene = function (scene) {
		if (!_sceneRegistry.includes(scene)) {
			_sceneRegistry.push(scene);
		}
	};
}
BaseManager.derive(PauseManager);

export default PauseManager;
