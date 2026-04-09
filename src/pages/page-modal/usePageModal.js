import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import gameEvents from '@features/game/game-events';
import config from '@/config';

function usePageModal() {
	const [showModal, setShowModal] = useState(config.showModalOnStart);
	const navigate = useNavigate();

	useEffect(() => {
		gameEvents.emitPauseGame();
	}, []);

	const handleOnModalClose = () => {
		setShowModal(false);
		gameEvents.emitResumeGame();
	};

	useEffect(() => {
		const handleObjectInteract = () => {
			setShowModal(true);
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
	}, [navigate]);

	return { showModal, handleOnModalClose };
}

export default usePageModal;
