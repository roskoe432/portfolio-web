import { render } from '@testing-library/react';
import App from '@app/app.jsx';
import { describe } from 'vitest';
import { MantineProvider } from '@mantine/core';

describe('App Component', () => {
	it('should render the App component without crashing', () => {
		render(
			<MantineProvider
				env="test"
				defaultColorScheme="dark"
				theme={{}}
				withGlobalStyles
				withNormalizeCSS
			>
				<App />
			</MantineProvider>,
		);
		// const linkElements = screen.getAllByText(/portfolio/i);
		// expect(linkElements.length).toBeGreaterThan(0);
	});
});
