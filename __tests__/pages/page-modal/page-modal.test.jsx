import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PageModal from '../../../src/pages/page-modal/page-modal';

const pageModalStateMock = vi.fn();
const disableGameInputMock = vi.fn();

vi.mock('react-overlays', () => ({
	Modal: ({ show, children, onBackdropClick, onHide, className }) =>
		show ? (
			<div data-testid="modal" className={className}>
				<button onClick={onBackdropClick}>Backdrop</button>
				<button onClick={onHide}>Hide</button>
				{children}
			</div>
		) : null,
}));

vi.mock('../../../src/pages/page-modal/usePageModal', () => ({
	default: () => pageModalStateMock(),
}));

vi.mock('@game', () => ({
	useDisableGameInput: (args) => disableGameInputMock(args),
}));

vi.mock('@app/app-navigation/app-navigation', () => ({
	default: ({ closePageModal }) => (
		<div>
			<button onClick={closePageModal}>Close From Routes</button>
			App Routes
		</div>
	),
}));

describe('PageModal', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders the modal content and wires close handlers when visible', () => {
		const handleOnModalClose = vi.fn();
		pageModalStateMock.mockReturnValue({
			showModal: true,
			handleOnModalClose,
		});

		render(<PageModal />);

		expect(disableGameInputMock).toHaveBeenCalledWith({ active: true });
		expect(screen.getByTestId('modal')).toBeInTheDocument();
		expect(screen.getByText('App Routes')).toBeInTheDocument();

		fireEvent.click(screen.getByLabelText('X'));
		fireEvent.click(screen.getByText('Backdrop'));
		fireEvent.click(screen.getByText('Hide'));
		fireEvent.click(screen.getByText('Close From Routes'));

		expect(handleOnModalClose).toHaveBeenCalledTimes(4);
	});

	it('does not render modal content when hidden and disables no input', () => {
		const handleOnModalClose = vi.fn();
		pageModalStateMock.mockReturnValue({
			showModal: false,
			handleOnModalClose,
		});

		render(<PageModal />);

		expect(disableGameInputMock).toHaveBeenCalledWith({ active: false });
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});
});
