import { screen } from '@testing-library/react';
import HomePage from '@pages/home/home.jsx';
import { renderWithProviders } from '../../utils';

describe('HomePage Component', () => {
	it('should render the HomePage component without crashing', () => {
		renderWithProviders(<HomePage />);
		const homePageElement = screen.getByText(/Home Page/i);
		expect(homePageElement).toBeInTheDocument();
	});
});
