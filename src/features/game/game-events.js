import Phaser from 'phaser';

function GameEvents(eventBus) {
	const _eventBus = eventBus;

	const _registerEvent = (event, callback) => {
		_eventBus.on(event, callback);

		return () => {
			_eventBus.off(event, callback);
		};
	};

	this.onInteract = (callback) => {
		return _registerEvent('interact', callback);
	};

	this.onNavigate = (callback) => {
		return _registerEvent('navigate', callback);
	};

	this.onResumeGame = (callback) => {
		return _registerEvent('resume-game', callback);
	};

	this.onPauseGame = (callback) => {
		return _registerEvent('pause-game', callback);
	};

	this.emitInteract = (payload) => {
		_eventBus.emit('interact', payload);
	};

	this.emitNavigate = (payload) => {
		_eventBus.emit('navigate', payload);
	};

	this.emitResumeGame = () => {
		_eventBus.emit('resume-game');
	};

	this.emitPauseGame = () => {
		_eventBus.emit('pause-game');
	};
}

export default new GameEvents(new Phaser.Events.EventEmitter());
