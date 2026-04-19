import { describe, expect, it } from 'vitest';
import { getErrorMessageFromStatus } from '../../../src/shared/utils/helpers';

describe('getErrorMessageFromStatus', () => {
	it('returns the validation error message for status 400', () => {
		expect(getErrorMessageFromStatus({ status: 400 })).toBe(
			'Please check your input and try again.',
		);
	});

	it('returns the rate-limit error message for status 429', () => {
		expect(getErrorMessageFromStatus({ status: 429 })).toBe(
			'You have sent too many messages in a short period. Please wait and try again later.',
		);
	});

	it('returns the default error message for unknown statuses', () => {
		expect(getErrorMessageFromStatus({ status: 500 })).toBe(
			'An Error has occured',
		);
	});
});
