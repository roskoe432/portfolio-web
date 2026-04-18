import AppRoutes from '@app/app-navigation/app-navigation.jsx';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils';

describe('App Component', () => {
	it('should render the App component without crashing', () => {
		renderWithProviders(<AppRoutes />);
	});
});
