import { renderWithProviders } from '@tests/utils';
import { screen, act, fireEvent } from '@testing-library/react';
import TimerMinigame from '@pages/home/components/timer-minigame/timer-minigame.jsx';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('TimerMinigame Component', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	it('should render the TimerMinigame component with initial state', () => {
		renderWithProviders(<TimerMinigame />);

		expect(screen.getByText(/Postman Challenge/i)).toBeInTheDocument();
		expect(screen.getByText(/3\.00 seconds/i)).toBeInTheDocument();
		expect(screen.getByText(/00\.00/)).toBeInTheDocument();
		expect(screen.getByText(/Start/i)).toBeInTheDocument();
	});

	it('should start the timer when Start button is clicked', () => {
		renderWithProviders(<TimerMinigame />);

		const startButton = screen.getByRole('button', { name: /start/i });
		fireEvent.click(startButton);

		// Timer should now show Stop button
		expect(screen.getByText(/Stop!/i)).toBeInTheDocument();
	});

	it('should increment timer when running', () => {
		renderWithProviders(<TimerMinigame />);

		const startButton = screen.getByRole('button', { name: /start/i });
		fireEvent.click(startButton);

		// Advance time by 1 second
		act(() => {
			vi.advanceTimersByTime(1000);
		});

		// Should show approximately 1 second elapsed (format is SS.ms)
		const timer = screen.getByRole('timer');
		expect(timer.textContent).toMatch(/^0[0-1]\.[0-9]{2}$/);
	});

	it('should show Try Again button when stopped at wrong time', () => {
		renderWithProviders(<TimerMinigame />);

		const startButton = screen.getByRole('button', { name: /start/i });
		fireEvent.click(startButton);

		// Advance time by 2 seconds (not the target time)
		act(() => {
			vi.advanceTimersByTime(2000);
		});

		// Stop the timer
		const stopButton = screen.getByRole('button', { name: /stop/i });
		fireEvent.click(stopButton);

		// Should show Try Again button, no win message
		expect(
			screen.getByRole('button', { name: /try again/i }),
		).toBeInTheDocument();
		expect(screen.queryByText(/perfect/i)).not.toBeInTheDocument();
	});

	it('should transition to stopped state after stopping timer', () => {
		renderWithProviders(<TimerMinigame />);

		const startButton = screen.getByRole('button', { name: /start/i });
		fireEvent.click(startButton);

		act(() => {
			vi.advanceTimersByTime(1500);
		});

		// Stop the timer
		const stopButton = screen.getByRole('button', { name: /stop/i });
		fireEvent.click(stopButton);

		// Should be in stopped state with Try Again button
		expect(
			screen.getByRole('button', { name: /try again/i }),
		).toBeInTheDocument();
		// Timer should be frozen (not 00.00)
		const timer = screen.getByRole('timer');
		expect(timer.textContent).not.toBe('00.00');
	});

	it('should reset the timer when Try Again button is clicked', () => {
		renderWithProviders(<TimerMinigame />);

		const startButton = screen.getByRole('button', { name: /start/i });
		fireEvent.click(startButton);

		// Advance time
		act(() => {
			vi.advanceTimersByTime(2000);
		});

		// Stop the timer
		const stopButton = screen.getByRole('button', { name: /stop/i });
		fireEvent.click(stopButton);

		// Click Try Again to reset
		const tryAgainButton = screen.getByRole('button', { name: /try again/i });
		fireEvent.click(tryAgainButton);

		// Should be back to initial state
		expect(screen.getByText(/00\.00/)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
	});
});
