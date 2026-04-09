import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { EventBus } from '../game';
import config from '@/config';

function usePageModal() {
	const [showModal, setShowModal] = useState(config.showModalOnStart);

	const navigate = useNavigate();

	const handleOnModalClose = () => {
		setShowModal(false);
		EventBus.emit('resume-game');
	};

	useEffect(() => {
		const handleObjectInteract = () => {
			setShowModal(true);
		};

		const handleNavigate = (payload) => {
			navigate(payload.page);
		};

		EventBus.on('navigate', handleNavigate);
		EventBus.on('interact', handleObjectInteract);

		return () => {
			EventBus.off('interact', handleObjectInteract);
			EventBus.off('navigate', handleNavigate);
		};
	}, [navigate]);

	return { showModal, handleOnModalClose };
}

export default usePageModal;
