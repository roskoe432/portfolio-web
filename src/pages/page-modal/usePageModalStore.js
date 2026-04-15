import config from '@/config';
import { create } from 'zustand';

const usePageModalStore = create((set) => ({
	show: config.showModalOnStart,
	openModal: () => {
		set({ show: true });
	},
	closeModal: () => {
		set({ show: false });
	},
}));

export default usePageModalStore;
