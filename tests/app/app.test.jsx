import { render, screen } from '@testing-library/react';
import App from '@/app/app.jsx';

test('should render the App component without crashing', () => {
	render(<App />);
	const linkElement = screen.getByText(/portfolio/i);
	expect(linkElement).toBeInTheDocument();
});
