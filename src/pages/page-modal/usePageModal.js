import { useNavigate } from 'react-router';
import { eventBus, useOnPlayerInteract, useOnPageNavigate } from '@game';
import { useState } from 'react';

function usePageModal() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useOnPlayerInteract(() => {
		setShowModal(true);
	});

	useOnPageNavigate(({ page }) => {
		navigate(page);
	});

	const handleOnModalClose = () => {
		setShowModal(false);
		eventBus.emitRequestResume({ sender: 'pageModal' });
	};

	return { showModal, handleOnModalClose };
}

export default usePageModal;
