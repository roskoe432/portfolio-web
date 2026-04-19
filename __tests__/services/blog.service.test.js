import BlogService from '../../src/services/blog.service';
import { describe, expect, it } from 'vitest';

const createFetchMock = (response, ok = true) => {
	return vi.fn().mockResolvedValue({
		ok,
		json: async () => response,
	});
};

describe('BlogService', () => {
	it('should fetch blog posts successfully', async () => {
		const mockPosts = [
			{ id: 1, title: 'Post 1' },
			{ id: 2, title: 'Post 2' },
		];
		window.fetch = createFetchMock(mockPosts);

		const service = new BlogService('http://localhost:5500/');
		const posts = await service.getBlogs();
		expect(posts).toEqual(mockPosts);
	});

	it('should throw an error if fetching posts fails', async () => {
		window.fetch = createFetchMock({ success: false }, false);

		const service = new BlogService('http://localhost:5500/');
		await expect(service.getBlogs()).rejects.toThrow(
			'Failed to fetch blog posts',
		);
	});
});
