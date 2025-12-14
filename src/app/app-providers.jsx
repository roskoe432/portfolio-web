import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '@/shared/store';

function AppProviders({ children }) {
	return (
		<ReduxProvider store={store}>
			<MantineProvider>
				<BrowserRouter>{children}</BrowserRouter>
			</MantineProvider>
		</ReduxProvider>
	);
}

export default AppProviders;
