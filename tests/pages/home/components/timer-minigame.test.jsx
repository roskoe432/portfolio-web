import { renderWithProviders } from '@tests/utils';
import { screen } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event';
import TimerMinigame from '@pages/home/components/timer-minigame/timer-minigame.jsx';
import { afterEach, beforeEach } from 'vitest';

// const startTimer = () => {
// 	const startButton = screen.getByText(/Start/i);
// 	startButton.click();
// };

// const stopTimer = async () => {
// 	const buttonText = screen.getByText(/Stop!/i);
// 	const stopButton = buttonText.closest('button');
// 	stopButton.click();
// };

// let user;

// Helper function to advance time by a second (1000ms) for readability
// const advanceTimeBySecond = () => vi.advanceTimersByTime(1000);

describe('TimerMinigame Component', () => {
	beforeEach(() => {
		vi.useFakeTimers({
			toFake: [
				'setTimeout',
				'clearTimeout',
				'setInterval',
				'clearInterval',
				'Date',
				'requestAnimationFrame',
				'cancelAnimationFrame',
				'performance.now',
			],
		});
		// user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it('should render the TimerMinigame component without crashing', () => {
		renderWithProviders(<TimerMinigame />);
		const timerElement = screen.getByText(/Postman Challenge/i);
		expect(timerElement).toBeInTheDocument();
	});
});
