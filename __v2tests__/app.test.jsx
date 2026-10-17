import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils.jsx';
import App from '../src/app/app.jsx';
import { eventBus } from '../src/game/events/index.js';

describe('App', () => {
	it('renders the app component', () => {
		renderWithProviders(<App />, { disableTutorial: true, setLanguage: 'en' });

		eventBus.emitPlayerInteract();

		screen.logTestingPlaygroundURL();

		expect(true).toBe(true);
	});
});
