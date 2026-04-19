import { afterEach, describe, expect, it, vi } from 'vitest';

const loadQueryClientModule = async (configOverrides = {}) => {
	vi.resetModules();
	delete window.__TANSTACK_QUERY_CLIENT__;

	vi.doMock('@config', async () => {
		const configMock = await import('../../__mocks__/config.js');
		return {
			default: configMock.default(configOverrides),
		};
	});

	return await import('../../../src/shared/query/query-client');
};

afterEach(() => {
	vi.resetModules();
	vi.clearAllMocks();
	vi.doUnmock('@config');
	delete window.__TANSTACK_QUERY_CLIENT__;
});

describe('query-client', () => {
	it('unwraps and returns the data property from an async query function', async () => {
		const { unwrapQueryData } = await loadQueryClientModule();
		const queryFn = vi.fn().mockResolvedValue({
			data: [{ id: 1, title: 'post' }],
		});

		await expect(unwrapQueryData(queryFn)).resolves.toEqual([
			{ id: 1, title: 'post' },
		]);
		expect(queryFn).toHaveBeenCalledTimes(1);
	});

	it('creates the query client with config-driven default query options', async () => {
		const { default: queryClient } = await loadQueryClientModule({
			reactQuery: {
				client: {
					staleTime: 15000,
					refetchOnWindowFocus: true,
					retry: 2,
				},
				devtools: {
					enabled: false,
					initialIsOpen: false,
				},
			},
		});

		expect(queryClient.getDefaultOptions().queries).toMatchObject({
			staleTime: 15000,
			refetchOnWindowFocus: true,
			retry: 2,
		});
		expect(window.__TANSTACK_QUERY_CLIENT__).toBeUndefined();
	});

	it('exposes the query client on window when react-query devtools are enabled', async () => {
		const { default: queryClient } = await loadQueryClientModule({
			reactQuery: {
				client: {
					staleTime: 0,
					refetchOnWindowFocus: false,
					retry: 0,
				},
				devtools: {
					enabled: true,
					initialIsOpen: false,
				},
			},
		});

		expect(window.__TANSTACK_QUERY_CLIENT__).toBe(queryClient);
	});
});
