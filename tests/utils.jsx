import AppProviders from '@/app/app-providers.jsx';
import { render } from '@testing-library/react';

export const renderWithProviders = (Component) => {
	return render(<AppProviders>{Component}</AppProviders>);
};
