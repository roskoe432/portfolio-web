import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import usePageModal from '../../../src/pages/page-modal/usePageModal';

const mockNavigate = vi.fn();
const mockEmitRequestResume = vi.fn();
const mockUseOnPlayerInteract = vi.fn();
const mockUseOnPageNavigate = vi.fn();

vi.mock('react-router', () => ({
	useNavigate: () => mockNavigate,
}));

vi.mock('@game', () => ({
	eventBus: {
		emitRequestResume: (...args) => mockEmitRequestResume(...args),
	},
	useOnPlayerInteract: (...args) => mockUseOnPlayerInteract(...args),
	useOnPageNavigate: (...args) => mockUseOnPageNavigate(...args),
}));

afterEach(() => {
	vi.clearAllMocks();
});

describe('usePageModal', () => {
	it('starts with the modal hidden', () => {
		mockUseOnPlayerInteract.mockImplementation(() => {});
		mockUseOnPageNavigate.mockImplementation(() => {});

		const { result } = renderHook(() => usePageModal());

		expect(result.current.showModal).toBe(false);
		expect(typeof result.current.handleOnModalClose).toBe('function');
	});

	it('shows the modal when the player interact event fires', () => {
		let onPlayerInteract;
		mockUseOnPlayerInteract.mockImplementation((handler) => {
			onPlayerInteract = handler;
		});
		mockUseOnPageNavigate.mockImplementation(() => {});

		const { result } = renderHook(() => usePageModal());

		act(() => {
			onPlayerInteract();
		});

		expect(result.current.showModal).toBe(true);
	});

	it('navigates when the page navigate event fires', () => {
		let onPageNavigate;
		mockUseOnPlayerInteract.mockImplementation(() => {});
		mockUseOnPageNavigate.mockImplementation((handler) => {
			onPageNavigate = handler;
		});

		renderHook(() => usePageModal());

		act(() => {
			onPageNavigate({ page: '/blog' });
		});

		expect(mockNavigate).toHaveBeenCalledWith('/blog');
	});

	it('closes the modal and resumes the game when handleOnModalClose is called', () => {
		let onPlayerInteract;
		mockUseOnPlayerInteract.mockImplementation((handler) => {
			onPlayerInteract = handler;
		});
		mockUseOnPageNavigate.mockImplementation(() => {});

		const { result } = renderHook(() => usePageModal());

		act(() => {
			onPlayerInteract();
		});
		expect(result.current.showModal).toBe(true);

		act(() => {
			result.current.handleOnModalClose();
		});

		expect(result.current.showModal).toBe(false);
		expect(mockEmitRequestResume).toHaveBeenCalledWith({ sender: 'pageModal' });
	});
});
