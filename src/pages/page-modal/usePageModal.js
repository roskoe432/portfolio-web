import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { gameEvents, Event } from '@game/events';
import usePageModalStore from './usePageModalStore';
import { useGameEvent } from '@/game/events/game.hooks';

function usePageModal() {
	const { show, openModal, closeModal } = usePageModalStore();
	const navigate = useNavigate();

	useGameEvent(Event.GAME_INTERACT, () => {
		openModal();
	});

	useGameEvent(Event.GAME_NAVIGATE, (payload) => {
		navigate(payload.page);
	});

	useEffect(() => {
		gameEvents.emit(Event.GAME_PAUSE);
	}, []);

	const handleOnModalClose = () => {
		closeModal();
	};

	return { showModal: show, handleOnModalClose };
}

export default usePageModal;
