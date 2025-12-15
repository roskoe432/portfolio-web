import { render, screen } from '@testing-library/react';
import AppFooter from '@app/app-footer/app-footer.jsx';
import { describe } from 'vitest';

describe('AppFooter Component', () => {
	it('should render the AppFooter component without crashing', () => {
		render(<AppFooter />);
		const footerElement = screen.getByText(/Portfolio/i);
		expect(footerElement).toBeInTheDocument();
	});
});
