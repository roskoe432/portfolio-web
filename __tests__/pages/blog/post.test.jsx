import BlogPost from '../../../src/pages/blog/components/post/post';
import { renderWithProviders } from '../../utils';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

describe('BlogPost', () => {
	it('renders the not found state when no post is provided', () => {
		renderWithProviders(<BlogPost post={null} />);

		expect(screen.getByText(/post not found/i)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /back to blog/i })).toHaveAttribute(
			'href',
			'/blog',
		);
	});

	it('renders a draft badge and uses publishedAt when present', () => {
		renderWithProviders(
			<BlogPost
				post={{
					title: 'Draft Post',
					content: <p>Draft content</p>,
					status: 'draft',
					createdAt: '2026-04-19T12:00:00.000Z',
					publishedAt: '2026-04-20T12:00:00.000Z',
				}}
			/>,
		);

		expect(screen.getByRole('heading', { name: 'Draft Post' })).toBeInTheDocument();
		expect(screen.getByText('Draft')).toBeInTheDocument();
		expect(screen.getByText('Draft content')).toBeInTheDocument();
		expect(screen.getByText('April 20, 2026')).toBeInTheDocument();
		expect(screen.getByText('April 20, 2026').closest('time')).toHaveAttribute(
			'dateTime',
			'2026-04-20T12:00:00.000Z',
		);
	});

	it('falls back to createdAt and omits the draft badge for published posts', () => {
		renderWithProviders(
			<BlogPost
				post={{
					title: 'Published Post',
					content: <p>Published content</p>,
					status: 'published',
					createdAt: '2026-04-18T12:00:00.000Z',
				}}
			/>,
		);

		expect(screen.getByText('April 18, 2026')).toBeInTheDocument();
		expect(screen.queryByText(/draft/i)).not.toBeInTheDocument();
	});
});
