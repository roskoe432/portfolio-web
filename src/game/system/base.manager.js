function BaseManager(eventBus, logger) {
	this.eventBus = eventBus;
	this.logger = logger;
	this.scene = null;

	this.register = function (gameManager) {
		if (this.scene) return;

		this.scene = gameManager;
		this.logger.debug(
			`Registering ${this.constructor.name} with scene ${this.scene.scene.key}`,
		);
	};

	this.onInit = function () {
		throw new Error(`onInit not implemented in ${this.constructor.name}`);
	};

	this.onCreate = function () {};
	this.onUpdate = function () {};
}

BaseManager.derive = (Child) => {
	Child.prototype = Object.create(BaseManager.prototype);
	Child.prototype.constructor = Child;
};

export default BaseManager;
