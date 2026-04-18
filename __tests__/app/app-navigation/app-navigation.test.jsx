import AppRoutes from '@app/app-navigation/app-navigation.jsx';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils';

describe('App Routes Component', () => {
	it('should render the App Routes component without crashing', () => {
		renderWithProviders(<AppRoutes />);
	});
});
