import { render } from '@testing-library/react';
import AboutPage from '@pages/about/about.jsx';
import { describe } from 'vitest';

describe('AboutPage Component', () => {
	it('should render the AboutPage component without crashing', () => {
		render(<AboutPage />);
	});
});
