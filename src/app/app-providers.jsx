import { MantineProvider } from '@mantine/core';

function AppProviders({ children }) {
	return <MantineProvider>{children}</MantineProvider>;
}

export default AppProviders;
