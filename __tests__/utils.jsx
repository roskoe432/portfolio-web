import AppProviders from '@/app/app-providers.jsx';
import { render } from '@testing-library/react';

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const renderWithProviders = (Component) => {
	return render(<AppProviders>{Component}</AppProviders>);
};
