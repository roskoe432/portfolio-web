import { describe, expect, it, vi, afterEach } from 'vitest';

const mockUseQuery = vi.fn();
const mockGetBlogs = vi.fn();
const mockUnwrapQueryData = vi.fn();

vi.mock('@tanstack/react-query', () => ({
	useQuery: (...args) => mockUseQuery(...args),
}));

vi.mock('@services', () => ({
	blogService: {
		getBlogs: (...args) => mockGetBlogs(...args),
	},
}));

vi.mock('@shared/query/query-client', () => ({
	unwrapQueryData: (...args) => mockUnwrapQueryData(...args),
}));

afterEach(() => {
	vi.clearAllMocks();
});

describe('blogQueries', () => {
	it('defines stable query keys for blog collections and blog ids', async () => {
		const { blogQueryKeys } = await import('../../../src/pages/blog/blogQueries');

		expect(blogQueryKeys.getAllBlogs).toEqual(['blogs']);
		expect(blogQueryKeys.getBlog('abc')).toEqual(['blogs', 'abc']);
	});

	it('calls useQuery with the blog list key and query function', async () => {
		const queryResult = { data: [{ slug: 'first-post' }], isLoading: false };
		mockUseQuery.mockReturnValue(queryResult);

		const { useBlogsQuery, blogQueryKeys } = await import(
			'../../../src/pages/blog/blogQueries'
		);

		const result = useBlogsQuery();

		expect(result).toBe(queryResult);
		expect(mockUseQuery).toHaveBeenCalledTimes(1);
		expect(mockUseQuery).toHaveBeenCalledWith({
			queryKey: blogQueryKeys.getAllBlogs,
			queryFn: expect.any(Function),
		});
	});

	it('uses unwrapQueryData to resolve blogService.getBlogs', async () => {
		mockUseQuery.mockImplementation(({ queryFn }) => {
			queryFn();
			return { data: [], isLoading: false };
		});
		mockUnwrapQueryData.mockImplementation((fn) => fn());
		mockGetBlogs.mockResolvedValue({ data: [{ slug: 'post-1' }] });

		const { useBlogsQuery } = await import('../../../src/pages/blog/blogQueries');

		useBlogsQuery();

		expect(mockUnwrapQueryData).toHaveBeenCalledTimes(1);
		expect(mockGetBlogs).toHaveBeenCalledTimes(1);
	});
});
