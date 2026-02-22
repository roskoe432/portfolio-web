import { screen } from '@testing-library/react';
import AppFooter from '@app/app-footer/app-footer.jsx';
import { renderWithProviders } from '../../utils';
import { describe } from 'vitest';

describe('AppFooter Component', () => {
	it('should render the AppFooter component without crashing', () => {
		renderWithProviders(<AppFooter />);
		const footerElement = screen.getByText(/Portfolio/i);
		expect(footerElement).toBeInTheDocument();
	});
});
