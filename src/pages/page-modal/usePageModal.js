import { useNavigate } from 'react-router';
import { eventBus, useOnPlayerInteract, useOnPageNavigate } from '@game';
import { useState } from 'react';

function usePageModal() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useOnPlayerInteract(() => {
		console.log(
			'Player interact event received in usePageModal, showing modal',
		);
		setShowModal(true);
	});

	useOnPageNavigate(({ page }) => {
		console.log('Page navigate event received in usePageModal:', page);
		navigate(page);
	});

	const handleOnModalClose = () => {
		setShowModal(false);
		eventBus.emitRequestResume();
	};

	return { showModal, handleOnModalClose };
}

export default usePageModal;
