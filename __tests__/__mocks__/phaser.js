import { vi } from 'vitest';

function MockGame() {
	this.destroy = vi.fn();
	this.scene = {
		add: vi.fn(),
		remove: vi.fn(),
		start: vi.fn(),
	};
}

function MockScene() {
	this.add = {
		image: vi.fn(),
		text: vi.fn(),
		sprite: vi.fn(),
	};
	this.cameras = { main: {} };
	this.scene = {
		start: vi.fn(),
		stop: vi.fn(),
		restart: vi.fn(),
	};
}

function MockVector2(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

function MockEventEmitter() {
	this.events = {};
}

MockEventEmitter.prototype.on = function (event, listener) {
	if (!this.events[event]) {
		this.events[event] = [];
	}
	this.events[event].push(listener);
};

MockEventEmitter.prototype.emit = function (event, ...args) {
	if (this.events[event]) {
		this.events[event].forEach((listener) => listener(...args));
	}
};

MockEventEmitter.prototype.off = function (event, listener) {
	if (this.events[event]) {
		this.events[event] = this.events[event].filter((l) => l !== listener);
	}
};

export const EventBus = new MockEventEmitter();
export const Math = {
	Vector2: MockVector2,
};

export const Events = {
	EventEmitter: MockEventEmitter,
};

export default {
	Game: MockGame,
	Scene: MockScene,
	Events: {
		EventEmitter: MockEventEmitter,
	},
	Scale: {
		FIT: 'fit',
		NONE: 'none',
		RESIZE: 'resize',
		SHOW_ALL: 'show_all',
		USER_SCALE: 'user_scale',
	},
	AUTO: 0,
	WEBGL: 1,
	CANVAS: 2,
};
