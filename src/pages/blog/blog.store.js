import { create } from 'zustand';
import { blogService } from '../../services';

const useBlogStore = create((set) => ({
	blogs: [],

	fetchBlogs: async () => {
		try {
			const response = await blogService.getBlogs();
			set({ blogs: response.data });
		} catch (error) {
			console.error('Error fetching blogs in store:', error);
		}
	},
}));

export default useBlogStore;
