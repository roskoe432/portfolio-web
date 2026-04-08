import AppProviders from '@/app/providers';
import { render } from '@testing-library/react';

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const renderWithProviders = (Component) => {
	return render(<AppProviders>{Component}</AppProviders>);
};
