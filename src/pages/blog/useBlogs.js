import { useEffect } from 'react';
import useBlogStore from './blog.store';
import { useParams } from 'react-router-dom';

function useBlogs() {
	const { blogs, fetchBlogs } = useBlogStore();
	const { slug } = useParams();

	useEffect(() => {
		fetchBlogs();
	}, [fetchBlogs]);

	useEffect(() => {
		if (blogs?.length) {
			console.log('Blogs fetched successfully:', blogs);
		}
	}, [blogs]);

	const selectedBlog = blogs.find((blog) => blog.slug === slug);

	return { blogs, selectedBlog, slug };
}

export default useBlogs;
