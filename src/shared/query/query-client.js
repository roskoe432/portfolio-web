import config from '@config';
import { QueryClient } from '@tanstack/react-query';

export const unwrapQueryData = async (fn) => {
	const result = await fn();
	return result.data;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: config.reactQuery.client.staleTime,
			refetchOnWindowFocus: config.reactQuery.client.refetchOnWindowFocus,
			retry: config.reactQuery.client.retry,
		},
	},
});

if (config.reactQuery.devtools.enabled) {
	window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

export default queryClient;
