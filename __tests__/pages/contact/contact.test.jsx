import { render } from '@testing-library/react';
import ContactPage from '@pages/contact/contact.jsx';

describe('ContactPage Component', () => {
	it('should render the ContactPage component without crashing', () => {
		render(<ContactPage />);
	});
});
