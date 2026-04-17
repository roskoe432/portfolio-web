import { useNavigate } from 'react-router';
import { eventBus, useOnPlayerInteract, useOnPageNavigate } from '@game';
import { useState } from 'react';

function usePageModal() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useOnPlayerInteract(() => {
		setShowModal(true);
	});

	useOnPageNavigate((payload) => {
		navigate(payload.page);
	});

	const handleOnModalClose = () => {
		setShowModal(false);
		eventBus.emitRequestResume();
	};

	return { showModal, handleOnModalClose };
}

export default usePageModal;
