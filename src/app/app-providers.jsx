import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/shared/store';

function AppProviders({ children }) {
	return (
		<ReduxProvider store={store}>
			<MantineProvider>{children}</MantineProvider>
		</ReduxProvider>
	);
}

export default AppProviders;
