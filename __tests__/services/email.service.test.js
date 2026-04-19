import EmailService from '../../src/services/email.service';
import { describe, expect, it } from 'vitest';

const createFetchMock = (response, ok = true) => {
	return vi.fn().mockResolvedValue({
		ok,
		json: async () => response,
	});
};

describe('EmailService', () => {
	it('should send email successfully', async () => {
		const mockResponse = { success: true };
		window.fetch = createFetchMock(mockResponse);

		const service = new EmailService('http://localhost:5500/');
		const formData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			message: 'Hello',
		};
		const response = await service.sendEmail(formData);
		const json = await response.json();
		expect(json).toEqual(mockResponse);
	});

	it('should throw an error if email sending fails', async () => {
		window.fetch = createFetchMock({ success: false }, false);

		const service = new EmailService('http://localhost:5500/');
		const formData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			message: 'Hello',
		};
		await expect(service.sendEmail(formData)).rejects.toThrow(
			'Failed to send email',
		);
	});
});
