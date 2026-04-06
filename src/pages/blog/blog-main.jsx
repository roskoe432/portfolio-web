import { NavLink } from 'react-router-dom';
import BlogPost from './components/post/post';
import useBlogs from './useBlogs';
import styles from './blog-main.module.less';

function BlogPage() {
	const { data: blogs, isLoading, error, selectedBlog, slug } = useBlogs();

	if (isLoading) {
		return <p className={styles['loading']}>Loading blogs...</p>;
	}

	if (error) {
		return <p className={styles['error']}>Error loading blogs: {error.message}</p>;
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
						<p className={styles['no-posts']}>No posts available for this blog.</p>
					)}
				</div>
			) : (
				<div>
					{blogs?.length ? (
						<ul className={styles['blog-list']}>{generateLinksFromSlugs(blogs)}</ul>
					) : (
						<p className={styles['no-blogs']}>No blogs available.</p>
					)}
				</div>
			)}
		</article>
	);
}

export default BlogPage;
