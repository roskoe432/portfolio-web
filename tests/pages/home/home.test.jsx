import HomePage from '@pages/home/home.jsx';
import { renderWithProviders } from '../../utils';

describe('HomePage Component', () => {
	it('should render the HomePage component without crashing', () => {
		renderWithProviders(<HomePage />);
	});
});
