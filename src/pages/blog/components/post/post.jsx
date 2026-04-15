import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Badge from '@shared/components/badge/badge';
import Button from '@shared/components/button/button';
import styles from './post.module.less';

function BlogPost({ post }) {
	const { t, i18n } = useTranslation();

	if (!post) {
		return (
			<div className={styles.post}>
				<p>{t('pages.blog.postNotFound')}</p>
				<Button component={Link} to="/blog" variant="subtle">
					{t('pages.blog.backToBlog')}
				</Button>
			</div>
		);
	}

	const displayDate = post.publishedAt || post.createdAt;
	const formattedDate = new Date(displayDate).toLocaleDateString(i18n.language, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<article className={styles.post}>
			<Button component={Link} to="/blog" variant="subtle" className={styles.backButton}>
			{t('pages.blog.backToBlog')}
		</Button>
			<header className={styles.header}>
				<h1 className={styles.title}>{post.title}</h1>
				<div className={styles.meta}>
					<time dateTime={displayDate}>{formattedDate}</time>
					{post.status === 'draft' && (
						<Badge color="yellow" variant="light">
							{t('pages.blog.draft')}
						</Badge>
					)}
				</div>
			</header>

			<div className={styles.content}>{post.content}</div>
		</article>
	);
}

export default BlogPost;
