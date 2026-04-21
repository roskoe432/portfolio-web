import { renderWithProviders } from '../utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { waitFor } from '@testing-library/react';
import App from '@app/app.jsx';

const { emitUIMounted, fontsLoad } = vi.hoisted(() => ({
	emitUIMounted: vi.fn(),
	fontsLoad: vi.fn(),
}));

vi.mock('@game', () => ({
	eventBus: {
		emitUIMounted,
	},
	GameCanvas: () => <div>Game Canvas</div>,
}));

vi.mock('@pages/page-modal/page-modal', () => ({
	default: () => <div>Page Modal</div>,
}));

beforeEach(() => {
	emitUIMounted.mockReset();
	fontsLoad.mockReset();

	Object.defineProperty(document, 'fonts', {
		configurable: true,
		value: {
			load: fontsLoad,
			ready: Promise.resolve(),
		},
	});
});

afterEach(() => {
	delete document.fonts;
});

describe('App Component', () => {
	it('renders the game canvas and modal', () => {
		renderWithProviders(<App />);

		expect(document.body).toHaveTextContent('Game Canvas');
		expect(document.body).toHaveTextContent('Page Modal');
	});

	it('waits for fonts to load before emitting ui mounted', async () => {
		fontsLoad.mockResolvedValue([]);

		renderWithProviders(<App />);

		await waitFor(() => {
			expect(fontsLoad).toHaveBeenCalledWith('30px "pixelFont"');
			expect(emitUIMounted).toHaveBeenCalledTimes(1);
		});
	});

	it('still emits ui mounted when font loading fails', async () => {
		fontsLoad.mockRejectedValue(new Error('font load failed'));

		renderWithProviders(<App />);

		await waitFor(() => {
			expect(emitUIMounted).toHaveBeenCalledTimes(1);
		});
	});

	it('does not emit ui mounted after unmounting before font loading resolves', async () => {
		let resolveFonts;
		fontsLoad.mockReturnValue(
			new Promise((resolve) => {
				resolveFonts = resolve;
			}),
		);

		const { unmount } = renderWithProviders(<App />);
		unmount();
		resolveFonts([]);

		await Promise.resolve();
		await Promise.resolve();

		expect(emitUIMounted).not.toHaveBeenCalled();
	});
});
