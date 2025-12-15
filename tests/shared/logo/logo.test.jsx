import { render } from '@testing-library/react';
import Logo from '@shared/components/logo/logo.jsx';

describe('Logo Component', () => {
	it('should render the Logo component without crashing', () => {
		render(<Logo />);
	});
});
