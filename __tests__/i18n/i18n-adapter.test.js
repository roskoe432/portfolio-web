import I18nAdapter from '../../src/i18n/i18n-adapter';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let adapter;
let mockI18n;
let mockReactPlugin;
let mockStorageService;
let mockEventBus;

const mockLanguages = [
	{
		value: 'en',
		label: 'English',
		translation: {
			greeting: 'Hello',
		},
	},
	{
		value: 'es',
		label: 'Español',
		translation: {
			greeting: 'Hola',
		},
	},
];

const createI18nMock = (
	resolvedLanguage = 'en',
	initialLanguage = 'en',
	setResolvedLangageOnChange = true,
	setLanguageOnChange = true,
) => {
	const state = {
		resolvedLanguage: resolvedLanguage,
		language: initialLanguage,
	};

	return {
		t: vi.fn((key) => key),
		use: vi.fn().mockReturnThis(),
		init: vi.fn(),
		get resolvedLanguage() {
			return state.resolvedLanguage;
		},
		get language() {
			return state.language;
		},
		changeLanguage: vi.fn(async (lang) => {
			if (setResolvedLangageOnChange) {
				state.resolvedLanguage = lang;
			}
			if (setLanguageOnChange) {
				state.language = lang;
			}
			console.log('Mock i18n state updated to:', state);
		}),
	};
};

describe('I18n Adapter Component', () => {
	beforeEach(() => {
		mockI18n = createI18nMock('en');
		mockReactPlugin = {
			type: '3rd-party',
			init: vi.fn(),
		};
		mockStorageService = {
			getLanguage: vi.fn(),
			setLanguage: vi.fn(),
		};
		mockEventBus = {
			emitLanguageChange: vi.fn(),
			on: vi.fn(),
		};

		adapter = new I18nAdapter({
			languages: mockLanguages,
			reactPlugin: mockReactPlugin,
			i18n: mockI18n,
			storageService: mockStorageService,
			eventBus: mockEventBus,
		});
	});

	it('should initialize with default language', () => {
		expect(adapter.getCurrentLanguage()).toBe('en');
	});

	it('it should return language if resolvedLanguage is null or empty string', async () => {
		mockI18n = createI18nMock(null, 'es', false);

		adapter = new I18nAdapter({
			languages: mockLanguages,
			reactPlugin: mockReactPlugin,
			i18n: mockI18n,
			storageService: mockStorageService,
			eventBus: mockEventBus,
		});

		await adapter.changeLanguage('es');

		expect(adapter.getCurrentLanguage()).toBe('es');
	});

	it('should default to English if neither resolvedLanguage nor language is set', () => {
		mockI18n = createI18nMock(null, null, false, false);

		adapter = new I18nAdapter({
			languages: mockLanguages,
			reactPlugin: mockReactPlugin,
			i18n: mockI18n,
			storageService: mockStorageService,
			eventBus: mockEventBus,
		});

		expect(adapter.getCurrentLanguage()).toBe('en');
	});

	it('should change language and emit event', async () => {
		await adapter.changeLanguage('es');

		expect(mockI18n.changeLanguage).toHaveBeenCalledWith('es');
		expect(adapter.getCurrentLanguage()).toBe('es');
		expect(mockStorageService.setLanguage).toHaveBeenCalledWith('es');
		expect(mockEventBus.emitLanguageChange).toHaveBeenCalledWith('es');
	});

	it('should allow a different starting language per test', () => {
		mockI18n = createI18nMock('es');

		adapter = new I18nAdapter({
			languages: mockLanguages,
			reactPlugin: mockReactPlugin,
			i18n: mockI18n,
			storageService: mockStorageService,
			eventBus: mockEventBus,
		});

		expect(adapter.getCurrentLanguage()).toBe('es');
	});

	it('should return available languages', () => {
		const languages = adapter.getAvailableLanguages();
		expect(languages).toEqual(mockLanguages);
	});
});
