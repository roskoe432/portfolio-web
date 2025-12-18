import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
	// Define your custom theme properties here
});

function AppProviders({ children, mantineEnv = 'production' }) {
	return (
		<MantineProvider
			env={mantineEnv}
			defaultColorScheme="dark"
			theme={theme}
			withGlobalStyles
			withNormalizeCSS
		>
			<BrowserRouter>{children}</BrowserRouter>
		</MantineProvider>
	);
}

export default AppProviders;
