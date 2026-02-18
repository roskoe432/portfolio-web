import styles from './blog.module.less';
import { Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import BlogPost from './post';
import useBlogs from './useBlogs';

function BlogPage() {
	const { blogs, selectedBlog, slug } = useBlogs();

	const generateLinksFromSlugs = (blogs) => {
		return blogs.map((blog) => (
			<li key={blog.slug}>
				<NavLink
					component={Link}
					to={`/blog/${blog.slug}`}
					label={blog.title}
				/>
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
						<p className={styles['no-posts']}>
							No posts available for this blog.
						</p>
					)}
				</div>
			) : (
				<div>
					<ul className={styles['blog-list']}>
						{generateLinksFromSlugs(blogs)}
					</ul>
				</div>
			)}
		</article>
	);
}

export default BlogPage;
