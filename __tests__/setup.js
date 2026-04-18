import 'jsdom';
import '@testing-library/jest-dom';
import '../src/i18n';

Object.defineProperty(import.meta, 'env', {
	value: {
		VITE_ENV: 'local',
		VITE_GITHUB_URL: 'https://github.com',
		VITE_LINKEDIN_URL: 'https://www.linkedin.com/',
		VITE_PERLENSPIEL_URL: 'https://perlenspiel.net/',
		VITE_SERVER_URL: 'http://localhost:5500',
		VITE_DEBUG_GAME: 'false',
	},
});

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock ResizeObserver
class ResizeObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock Phaser
vi.mock('phaser', async () => {
	const phaserMock = await import('./__mocks__/phaser.js');
	return phaserMock;
});

vi.mock('@config', async () => {
	const configMock = await import('./__mocks__/config.js');
	return {
		default: configMock.default(),
	};
});
