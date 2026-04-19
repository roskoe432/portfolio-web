import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useKeyInput from '../../../src/shared/hooks/useKeyInput';

describe('useKeyInput', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('calls the handler when the matching key is pressed', () => {
		const onPress = vi.fn();

		renderHook(() => useKeyInput('Escape', onPress));

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it('does not call the handler for a different key', () => {
		const onPress = vi.fn();

		renderHook(() => useKeyInput('Escape', onPress));

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

		expect(onPress).not.toHaveBeenCalled();
	});

	it('does not listen when listenForInput is false', () => {
		const onPress = vi.fn();

		renderHook(() =>
			useKeyInput('Escape', onPress, { listenForInput: false }),
		);

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

		expect(onPress).not.toHaveBeenCalled();
	});

	it('ignores repeated keydown events', () => {
		const onPress = vi.fn();

		renderHook(() => useKeyInput('Escape', onPress));

		window.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Escape', repeat: true }),
		);

		expect(onPress).not.toHaveBeenCalled();
	});

	it('uses the latest callback after rerender', () => {
		const firstHandler = vi.fn();
		const secondHandler = vi.fn();

		const { rerender } = renderHook(
			({ onPress }) => useKeyInput('Escape', onPress),
			{ initialProps: { onPress: firstHandler } },
		);

		rerender({ onPress: secondHandler });

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

		expect(firstHandler).not.toHaveBeenCalled();
		expect(secondHandler).toHaveBeenCalledTimes(1);
	});

	it('allows matching target tags when filterTags is provided', () => {
		const onPress = vi.fn();

		renderHook(() => useKeyInput('Enter', onPress, { filterTags: ['input'] }));

		const event = new KeyboardEvent('keydown', { key: 'Enter' });
		Object.defineProperty(event, 'target', {
			value: { tagName: 'INPUT' },
		});

		window.dispatchEvent(event);

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it('blocks non-matching target tags when filterTags is provided', () => {
		const onPress = vi.fn();

		renderHook(() => useKeyInput('Enter', onPress, { filterTags: ['input'] }));

		const event = new KeyboardEvent('keydown', { key: 'Enter' });
		Object.defineProperty(event, 'target', {
			value: { tagName: 'BUTTON' },
		});

		window.dispatchEvent(event);

		expect(onPress).not.toHaveBeenCalled();
	});
});
