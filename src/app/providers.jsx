import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/shared/query/query-client';

function Providers({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>{children}</BrowserRouter>
		</QueryClientProvider>
	);
}

export default Providers;
