const sceneRegistry = [];

export const registerForPause = (scene) => {
	if (!sceneRegistry.includes(scene)) {
		sceneRegistry.push(scene);
	}
};

const pauseAllScenes = () => {
	sceneRegistry.forEach((scene) => {
		if (scene.scene.isActive()) {
			scene.scene.pause();
		}
	});
};

const resumeAllScenes = () => {
	sceneRegistry.forEach((scene) => {
		if (scene.scene.isPaused()) {
			scene.scene.resume();
		}
	});
};

class PauseManager {
	constructor(scene, eventBus, logger) {
		this.scene = scene;
		this.eventBus = eventBus;
		this.logger = logger;
		this.isPaused = false;
	}

	init() {
		this.eventBus.onPKeyPressed(() => {
			this.handlePause(!this.isPaused);
		});
		this.eventBus.onGamePaused(() => {
			this.handlePause(true);
		});
		this.eventBus.onGameResumed(() => {
			this.handlePause(false);
		});
	}

	pauseGame() {
		this.scene.input.keyboard.disableGlobalCapture();
		this.eventBus.broadcastGamePaused(true);
		pauseAllScenes();
	}

	resumeGame() {
		this.scene.input.keyboard.enableGlobalCapture();
		this.eventBus.broadcastGamePaused(true);
		resumeAllScenes();
	}

	handlePause = (isPaused) => {
		this.logger.debug(`${isPaused ? 'Pausing' : 'Resuming'} game`);
		this.isPaused = isPaused;
		if (this.isPaused) {
			return this.pauseGame();
		}
		return this.resumeGame();
	};
}

export default PauseManager;
