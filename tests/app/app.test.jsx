import { render, screen } from '@testing-library/react';
import App from '@/app/app.jsx';
import { describe } from 'vitest';

describe('App Component', () => {
	it('should render the App component without crashing', () => {
		render(<App />);
		const linkElement = screen.getByText(/portfolio/i);
		expect(linkElement).toBeInTheDocument();
	});
});
