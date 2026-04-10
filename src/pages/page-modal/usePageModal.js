import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { gameEvents } from '@features/game';
import usePageModalStore from './usePageModalStore';

function usePageModal() {
	const { show, openModal, closeModal } = usePageModalStore();
	const navigate = useNavigate();

	useEffect(() => {
		gameEvents.emitPauseGame();
	}, []);

	const handleOnModalClose = () => {
		closeModal();
	};

	useEffect(() => {
		const handleObjectInteract = () => {
			openModal();
		};

		const handleNavigate = (payload) => {
			navigate(payload.page);
		};

		const offNavigate = gameEvents.onNavigate(handleNavigate);
		const offInteract = gameEvents.onInteract(handleObjectInteract);

		return () => {
			offInteract();
			offNavigate();
		};
	}, [navigate, openModal]);

	return { showModal: show, handleOnModalClose };
}

export default usePageModal;
