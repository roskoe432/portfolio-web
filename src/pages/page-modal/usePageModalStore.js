import config from '@/config';
import { gameEvents } from '@/features/game';
import { create } from 'zustand';

const usePageModalStore = create((set) => ({
	show: config.showModalOnStart,
	openModal: () => {
		gameEvents.emitPauseGame();
		set({ show: true });
	},
	closeModal: () => {
		gameEvents.emitResumeGame();
		set({ show: false });
	},
}));

export default usePageModalStore;
