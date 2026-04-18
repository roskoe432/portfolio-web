import AboutPage from '@pages/about/about.jsx';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils';

describe('About Page Component', () => {
	it('should render the About Page component without crashing', () => {
		renderWithProviders(<AboutPage />);
	});
});
