import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactPage from '../../../src/pages/contact/contact';

const mockUseEmailMutation = vi.fn();

vi.mock('../../../src/pages/contact/contactQueries', () => ({
	useEmailMutation: () => mockUseEmailMutation(),
}));

afterEach(() => {
	vi.clearAllMocks();
});

describe('ContactPage', () => {
	it('submits valid form data through the email mutation', async () => {
		const mutate = vi.fn();
		mockUseEmailMutation.mockReturnValue({
			mutate,
			isPending: false,
			isSuccess: false,
			error: null,
		});

		render(<ContactPage closePageModal={vi.fn()} />);

		fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByPlaceholderText("What's this about?"), {
			target: { value: 'Hello' },
		});
		fireEvent.change(screen.getByPlaceholderText('Your message'), {
			target: { value: 'Testing contact form' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Send' }));

		await waitFor(() => {
			expect(mutate).toHaveBeenCalledWith({
				email: 'test@example.com',
				subject: 'Hello',
				message: 'Testing contact form',
			});
		});
	});

	it('renders the success state and closes the modal when OK is clicked', () => {
		const closePageModal = vi.fn();
		mockUseEmailMutation.mockReturnValue({
			mutate: vi.fn(),
			isPending: false,
			isSuccess: true,
			error: null,
		});

		render(<ContactPage closePageModal={closePageModal} />);

		expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'OK' }));

		expect(closePageModal).toHaveBeenCalledTimes(1);
	});

	it('renders the mapped error message from the mutation error status', () => {
		mockUseEmailMutation.mockReturnValue({
			mutate: vi.fn(),
			isPending: false,
			isSuccess: false,
			error: { cause: { status: 429 } },
		});

		render(<ContactPage closePageModal={vi.fn()} />);

		expect(
			screen.getByText(
				'You have sent too many messages in a short period. Please wait and try again later.',
			),
		).toBeInTheDocument();
	});

	it('shows validation errors and does not submit when required fields are empty', async () => {
		const mutate = vi.fn();
		mockUseEmailMutation.mockReturnValue({
			mutate,
			isPending: false,
			isSuccess: false,
			error: null,
		});

		render(<ContactPage closePageModal={vi.fn()} />);

		fireEvent.click(screen.getByRole('button', { name: 'Send' }));

		expect(
			await screen.findByText('Please enter a valid email address.'),
		).toBeInTheDocument();
		expect(screen.getByText('Subject is required.')).toBeInTheDocument();
		expect(screen.getByText('Message is required.')).toBeInTheDocument();
		expect(mutate).not.toHaveBeenCalled();
	});

	it('disables submit and shows the pending label while sending', () => {
		mockUseEmailMutation.mockReturnValue({
			mutate: vi.fn(),
			isPending: true,
			isSuccess: false,
			error: null,
		});

		render(<ContactPage closePageModal={vi.fn()} />);

		expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
	});
});
