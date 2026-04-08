import App from '@app/app.jsx';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../utils';

describe('App Component', () => {
	it('should render the App component without crashing', () => {
		renderWithProviders(<App />);
		// Placeholder test - will be expanded during refactoring
	});
});
