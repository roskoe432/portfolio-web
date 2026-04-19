import { afterEach, describe, expect, it, vi } from 'vitest';

const mockUseMutation = vi.fn();
const mockSendEmail = vi.fn();

vi.mock('@tanstack/react-query', () => ({
	useMutation: (...args) => mockUseMutation(...args),
}));

vi.mock('@services', () => ({
	emailService: {
		sendEmail: (...args) => mockSendEmail(...args),
	},
}));

afterEach(() => {
	vi.clearAllMocks();
});

describe('contactQueries', () => {
	it('calls useMutation with a mutation function', async () => {
		const mutationResult = { mutate: vi.fn(), isPending: false };
		mockUseMutation.mockReturnValue(mutationResult);

		const { useEmailMutation } = await import(
			'../../../src/pages/contact/contactQueries'
		);

		const result = useEmailMutation();

		expect(result).toBe(mutationResult);
		expect(mockUseMutation).toHaveBeenCalledTimes(1);
		expect(mockUseMutation).toHaveBeenCalledWith({
			mutationFn: expect.any(Function),
		});
	});

	it('uses the email service inside the mutation function and returns its response', async () => {
		let capturedMutationFn;
		mockUseMutation.mockImplementation(({ mutationFn }) => {
			capturedMutationFn = mutationFn;
			return { mutate: vi.fn() };
		});
		mockSendEmail.mockResolvedValue({ ok: true });

		const { useEmailMutation } = await import(
			'../../../src/pages/contact/contactQueries'
		);

		useEmailMutation();

		await expect(
			capturedMutationFn({
				email: 'test@example.com',
				subject: 'Hi',
				message: 'Hello',
			}),
		).resolves.toEqual({ ok: true });

		expect(mockSendEmail).toHaveBeenCalledWith({
			email: 'test@example.com',
			subject: 'Hi',
			message: 'Hello',
		});
	});
});
