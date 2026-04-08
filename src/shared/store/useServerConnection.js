import { create } from 'zustand';
import { serverConnectionTest } from '@/services';

const useServerConnection = create((set) => ({
	connected: false,
	isLoading: false,
	error: null,
	checkServerConnection: async () => {
		set({ isLoading: true, error: null });
		try {
			await serverConnectionTest(3, 3);
			set({ connected: true, isLoading: false });
		} catch (error) {
			set({ connected: false, error });
		} finally {
			set({ isLoading: false });
		}
	},
}));

export default useServerConnection;
