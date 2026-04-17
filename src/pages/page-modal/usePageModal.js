import { useNavigate } from 'react-router';
import { gameEvents, Event } from '@game';
import { useGameEvent } from '@game/hooks/useGameEvent';
import { useState } from 'react';

function usePageModal() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useGameEvent(Event.GAME_INTERACT, () => {
		setShowModal(true);
	});

	useGameEvent(Event.GAME_NAVIGATE, (payload) => {
		navigate(payload.page);
	});

	const handleOnModalClose = () => {
		setShowModal(false);
		gameEvents.emit(Event.GAME_RESUME);
	};

	return { showModal, handleOnModalClose };
}

export default usePageModal;
