import config from '@/config';
import { gameEvents, Event } from '@game/events';
import { create } from 'zustand';

const usePageModalStore = create((set) => ({
	show: config.showModalOnStart,
	openModal: () => {
		gameEvents.emit(Event.GAME_HANDLE_PAUSE, true);
		set({ show: true });
	},
	closeModal: () => {
		gameEvents.emit(Event.GAME_HANDLE_PAUSE, false);
		set({ show: false });
	},
}));

export default usePageModalStore;
