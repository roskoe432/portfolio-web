import { gameEvents, Event } from '../events';

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
	constructor(scene) {
		this.scene = scene;
		this.isPaused = false;

		gameEvents.on(Event.GAME_P_KEY_PRESSED, () => {
			this.handlePause(!this.isPaused);
		});
		gameEvents.on(Event.GAME_PAUSE, () => {
			this.handlePause(true);
		});
		gameEvents.on(Event.GAME_RESUME, () => {
			this.handlePause(false);
		});
	}

	pauseGame() {
		this.scene.input.keyboard.disableGlobalCapture();
		gameEvents.emit(Event.GAME_BROADCAST_PAUSE, true);
		pauseAllScenes();
	}

	resumeGame() {
		this.scene.input.keyboard.enableGlobalCapture();
		gameEvents.emit(Event.GAME_BROADCAST_PAUSE, false);
		resumeAllScenes();
	}

	handlePause = (isPaused) => {
		console.log(`Handling pause: ${isPaused}`);
		this.isPaused = isPaused;
		if (this.isPaused) {
			return this.pauseGame();
		}
		return this.resumeGame();
	};
}

export default PauseManager;
