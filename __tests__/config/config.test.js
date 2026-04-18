import { afterEach, describe, expect, it, vi } from 'vitest';

const baseEnv = {
	VITE_ENV: 'test',
	VITE_GITHUB_URL: 'https://github.com/test',
	VITE_LINKEDIN_URL: 'https://linkedin.com/test',
	VITE_PERLENSPIEL_URL: 'https://perlenspiel.test',
	VITE_SERVER_URL: 'http://localhost:5500',
	VITE_GAME_DEBUG_MODE: 'false',
	VITE_GAME_ENABLED: 'false',
	VITE_UI_USE_NAVLINKS: 'false',
	VITE_UI_SHOW_MODAL_ON_START: 'false',
	VITE_QUERY_CLIENT_STALE_TIME: '0',
	VITE_QUERY_CLIENT_REFETCH_ON_WINDOW_FOCUS: 'false',
	VITE_QUERY_CLIENT_RETRY: '0',
	VITE_QUERY_DEVTOOLS_INITIAL_IS_OPEN: 'false',
};

const setEnv = (overrides = {}, missingKeys = []) => {
	for (const [key, value] of Object.entries({ ...baseEnv, ...overrides })) {
		vi.stubEnv(key, value);
	}

	for (const key of missingKeys) {
		delete import.meta.env[key];
	}
};

const loadConfig = async (overrides = {}, missingKeys = []) => {
	vi.resetModules();
	setEnv(overrides, missingKeys);
	return (await vi.importActual('../../src/config.js')).default;
};

afterEach(() => {
	vi.resetModules();
	vi.unstubAllEnvs();
});

describe('config', () => {
	it('uses an empty serverUrl and enables devtools in local env', async () => {
		const config = await loadConfig({
			VITE_ENV: 'local',
			VITE_SERVER_URL: 'http://should-not-be-used',
		});

		expect(config.env).toBe('local');
		expect(config.serverUrl).toBe('');
		expect(config.reactQuery.devtools.enabled).toBe(true);
	});

	it('uses the configured serverUrl and disables devtools outside local env', async () => {
		const config = await loadConfig({
			VITE_ENV: 'test',
			VITE_SERVER_URL: 'http://localhost:9999',
		});

		expect(config.env).toBe('test');
		expect(config.serverUrl).toBe('http://localhost:9999');
		expect(config.reactQuery.devtools.enabled).toBe(false);
	});

	it('parses booleans and numeric values from env strings', async () => {
		const config = await loadConfig({
			VITE_GAME_DEBUG_MODE: 'true',
			VITE_GAME_ENABLED: 'true',
			VITE_UI_SHOW_MODAL_ON_START: 'true',
			VITE_QUERY_CLIENT_STALE_TIME: '300000',
			VITE_QUERY_CLIENT_REFETCH_ON_WINDOW_FOCUS: 'true',
			VITE_QUERY_CLIENT_RETRY: '3',
			VITE_QUERY_DEVTOOLS_INITIAL_IS_OPEN: 'true',
			VITE_LOG_LEVEL: 'debug',
		});

		expect(config.logging.level).toBe('debug');
		expect(config.useNavLinks).toBe(true);
		expect(config.showModalOnStart).toBe(true);
		expect(config.game).toEqual({
			debug: true,
			enabled: true,
		});
		expect(config.reactQuery.client).toEqual({
			staleTime: 300000,
			refetchOnWindowFocus: true,
			retry: 3,
		});
		expect(config.reactQuery.devtools.initialIsOpen).toBe(true);
	});

	it('throws when a required env var is missing', async () => {
		await expect(loadConfig({}, ['VITE_QUERY_CLIENT_RETRY'])).rejects.toThrow(
			'Missing required environment variables: VITE_QUERY_CLIENT_RETRY',
		);
	});
});
