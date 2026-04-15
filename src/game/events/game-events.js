function GameEvents(eventBus) {
	const _eventBus = eventBus;

	this.on = (event, callback) => {
		_eventBus.on(event, callback);

		return () => {
			_eventBus.off(event, callback);
		};
	};
	this.emit = (event, payload) => _eventBus.emit(event, payload);
}

export default GameEvents;
