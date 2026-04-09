import { useParams } from 'react-router';
import { useBlogsQuery } from './blogQueries';

function useBlogs() {
	const { data: blogs, isLoading, error } = useBlogsQuery();
	const { slug } = useParams();
	const selectedBlog = blogs?.find((blog) => blog.slug === slug);

	return { data: blogs, isLoading, error, selectedBlog: selectedBlog || {}, slug };
}

export default useBlogs;
