import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useBlogs from '../../../src/pages/blog/useBlogs';

const mockUseBlogsQuery = vi.fn();
const mockUseParams = vi.fn();

vi.mock('../../../src/pages/blog/blogQueries', () => ({
	useBlogsQuery: () => mockUseBlogsQuery(),
}));

vi.mock('react-router', () => ({
	useParams: () => mockUseParams(),
}));

afterEach(() => {
	vi.clearAllMocks();
});

describe('useBlogs', () => {
	it('returns query state and the selected blog for the current slug', () => {
		const blogs = [
			{ slug: 'blog-1', title: 'Blog 1' },
			{ slug: 'blog-2', title: 'Blog 2' },
		];
		mockUseBlogsQuery.mockReturnValue({
			data: blogs,
			isLoading: false,
			error: null,
		});
		mockUseParams.mockReturnValue({ slug: 'blog-2' });

		const { result } = renderHook(() => useBlogs());

		expect(result.current).toEqual({
			data: blogs,
			isLoading: false,
			error: null,
			selectedBlog: { slug: 'blog-2', title: 'Blog 2' },
			slug: 'blog-2',
		});
	});

	it('returns an empty object when no blog matches the current slug', () => {
		mockUseBlogsQuery.mockReturnValue({
			data: [{ slug: 'blog-1', title: 'Blog 1' }],
			isLoading: false,
			error: null,
		});
		mockUseParams.mockReturnValue({ slug: 'missing-blog' });

		const { result } = renderHook(() => useBlogs());

		expect(result.current.selectedBlog).toEqual({});
		expect(result.current.slug).toBe('missing-blog');
	});

	it('handles missing blog data while preserving loading and error state', () => {
		const error = new Error('Failed to load');
		mockUseBlogsQuery.mockReturnValue({
			data: undefined,
			isLoading: true,
			error,
		});
		mockUseParams.mockReturnValue({ slug: undefined });

		const { result } = renderHook(() => useBlogs());

		expect(result.current).toEqual({
			data: undefined,
			isLoading: true,
			error,
			selectedBlog: {},
			slug: undefined,
		});
	});
});
