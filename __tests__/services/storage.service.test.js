import StorageService from '../../src/services/storage.service';
import { describe, expect, it } from 'vitest';

const mockLocalStorage = {
	setItem: vi.fn(),
	getItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

describe('StorageService', () => {
	it('should set tutorial viewed to true', () => {
		window.localStorage = mockLocalStorage;
		const service = new StorageService();
		service.setTutorialViewed();
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			'tutorialViewed',
			'true',
		);
	});

	it('should return false if tutorial viewed is not set', () => {
		window.localStorage = mockLocalStorage;
		mockLocalStorage.getItem.mockReturnValue(null);
		const service = new StorageService();
		expect(service.getTutorialViewed()).toBe(false);
	});

	it('should return true if tutorial viewed is set to true', () => {
		window.localStorage = mockLocalStorage;
		mockLocalStorage.getItem.mockReturnValue('true');
		const service = new StorageService();
		expect(service.getTutorialViewed()).toBe(true);
	});

	it('should delete tutorial viewed', () => {
		window.localStorage = mockLocalStorage;
		const service = new StorageService();
		service.deleteTutorialViewed();
		expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('tutorialViewed');
	});
});
