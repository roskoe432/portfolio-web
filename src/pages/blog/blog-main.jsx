import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import BlogPost from './components/post/post';
import useBlogs from './useBlogs';
import styles from './blog-main.module.less';
import Error from '@shared/components/error';
import Loading from '@shared/components/loading';

function BlogPage() {
	const { t } = useTranslation();
	const { data: blogs, isLoading, error, selectedBlog, slug } = useBlogs();

	if (isLoading) {
		return <Loading message={t('pages.blog.loading')} />;
	}

	if (error) {
		return <Error message={t('pages.blog.loadError')} />;
	}

	const generateLinksFromSlugs = (blogs) => {
		return blogs.map((blog) => (
			<li key={blog.slug}>
				<NavLink to={`/blog/${blog.slug}`}>{blog.title}</NavLink>
			</li>
		));
	};

	return (
		<article className={styles['blog-page']}>
			{slug ? (
				<div>
					<div className={styles['subject-header']}>
						<h2>{selectedBlog?.title}</h2>
						{selectedBlog?.description && (
							<p className={styles.description}>{selectedBlog.description}</p>
						)}
					</div>
					{selectedBlog?.posts.length ? (
						<div className={styles['posts-container']}>
							{selectedBlog.posts.map((post) => (
								<BlogPost key={post.id} post={post} />
							))}
						</div>
					) : (
						<p className={styles['no-posts']}>{t('pages.blog.noPosts')}</p>
					)}
				</div>
			) : (
				<div>
					{blogs?.length ? (
						<ul className={styles['blog-list']}>{generateLinksFromSlugs(blogs)}</ul>
					) : (
						<p className={styles['no-blogs']}>{t('pages.blog.noBlogs')}</p>
					)}
				</div>
			)}
		</article>
	);
}

export default BlogPage;
