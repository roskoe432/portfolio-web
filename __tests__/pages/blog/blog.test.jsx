import BlogPage from '../../../src/pages/blog/blog-main';
import useBlogs from '../../../src/pages/blog/useBlogs';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../utils';

vi.mock('../../../src/pages/blog/useBlogs');

const renderBlogPage = () => renderWithProviders(<BlogPage />);

describe('BlogPage', () => {
	it('renders loading state', () => {
		useBlogs.mockReturnValue({ isLoading: true });
		renderBlogPage();

		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});

	it('renders error state', () => {
		useBlogs.mockReturnValue({ error: new Error('Failed to load') });
		renderBlogPage();

		expect(
			screen.getByText(/Failed to load blogs. Please try again later./i),
		).toBeInTheDocument();
	});

	it('renders list of blogs', () => {
		useBlogs.mockReturnValue({
			data: [
				{ slug: 'blog-1', title: 'Blog 1' },
				{ slug: 'blog-2', title: 'Blog 2' },
			],
		});
		renderBlogPage();

		expect(screen.getByText('Blog 1')).toBeInTheDocument();
		expect(screen.getByText('Blog 2')).toBeInTheDocument();
	});

	it('renders selected blog with posts', () => {
		useBlogs.mockReturnValue({
			slug: 'blog-1',
			selectedBlog: {
				title: 'Blog 1',
				description: 'Description of Blog 1',
				posts: [
					{ id: 1, title: 'Post 1' },
					{ id: 2, title: 'Post 2' },
				],
			},
		});
		renderBlogPage();

		expect(screen.getByText('Blog 1')).toBeInTheDocument();
		expect(screen.getByText('Description of Blog 1')).toBeInTheDocument();
		expect(screen.getByText('Post 1')).toBeInTheDocument();
		expect(screen.getByText('Post 2')).toBeInTheDocument();
	});

	it('renders no posts message when selected blog has no posts', () => {
		useBlogs.mockReturnValue({
			slug: 'blog-1',
			selectedBlog: {
				title: 'Blog 1',
				description: 'Description of Blog 1',
				posts: [],
			},
		});
		renderBlogPage();

		expect(screen.getByText(/no posts/i)).toBeInTheDocument();
	});

	it('renders no blogs message when there are no blogs', () => {
		useBlogs.mockReturnValue({ data: [] });
		renderBlogPage();

		expect(screen.getByText(/no blogs/i)).toBeInTheDocument();
	});
});
