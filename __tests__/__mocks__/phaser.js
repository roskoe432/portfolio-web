import { vi } from 'vitest';

class MockGame {
	constructor() {
		this.destroy = vi.fn();
		this.scene = {
			add: vi.fn(),
			remove: vi.fn(),
			start: vi.fn(),
		};
	}
}

class MockScene {
	constructor() {
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
}

class MockEventEmitter {
	constructor() {
		this.events = {};
	}

	on(event, listener) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener);
	}

	emit(event, ...args) {
		if (this.events[event]) {
			this.events[event].forEach((listener) => listener(...args));
		}
	}

	off(event, listener) {
		if (this.events[event]) {
			this.events[event] = this.events[event].filter((l) => l !== listener);
		}
	}
}

export const EventBus = new MockEventEmitter();

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
