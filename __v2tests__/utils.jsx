import AppProviders from '@app/providers';
import { render } from '@testing-library/react';

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callbacks = {
	disableTutorial: () => {
		localStorage.setItem('tutorialViewed', 'true');
	},
	setLanguage: (locale = 'en') => {
		localStorage.setItem('language', locale);
	},
};

export const renderWithProviders = (Component, options) => {
	if (options) {
		const keys = Object.keys(options);
		keys.forEach((key) => {
			if (callbacks[key]) {
				callbacks[key](options[key]);
			}
		});
	}
	return render(<AppProviders>{Component}</AppProviders>);
};
