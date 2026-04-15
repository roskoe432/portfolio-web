import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { gameEvents, Event } from '@game';
import usePageModalStore from './usePageModalStore';
import { useGameEvent } from '@/game/hooks/useGameEvent';

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
		gameEvents.emit(Event.GAME_HANDLE_PAUSE, true);
	}, []);

	const handleOnModalClose = () => {
		closeModal();
		gameEvents.emit(Event.GAME_HANDLE_PAUSE, false);
	};

	return { showModal: show, handleOnModalClose };
}

export default usePageModal;
