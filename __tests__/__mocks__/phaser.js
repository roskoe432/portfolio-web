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

export default {
	Game: MockGame,
	Scene: MockScene,
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
