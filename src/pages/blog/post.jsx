import { Link } from 'react-router-dom';
import { Badge, Button } from '@mantine/core';
import styles from './post.module.less';

function BlogPost({ post }) {
	if (!post) {
		return (
			<div className={styles.post}>
				<p>Post not found</p>
				<Button component={Link} to="/blog" variant="subtle">
					← Back to Blog
				</Button>
			</div>
		);
	}

	const displayDate = post.publishedAt || post.createdAt;
	const formattedDate = new Date(displayDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<article className={styles.post}>
			<Button
				component={Link}
				to="/blog"
				variant="subtle"
				className={styles.backButton}
			>
				← Back to Blog
			</Button>

			<header className={styles.header}>
				<h1 className={styles.title}>{post.title}</h1>
				<div className={styles.meta}>
					<time dateTime={displayDate}>{formattedDate}</time>
					{post.status === 'draft' && (
						<Badge color="yellow" variant="light">
							Draft
						</Badge>
					)}
				</div>
			</header>

			<div className={styles.content}>{post.content}</div>
		</article>
	);
}

export default BlogPost;
