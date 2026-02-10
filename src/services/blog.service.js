const BlogService = (() => {
	function BlogService(url) {
		this.url = url;

		this.getBlogs = async () => {
			try {
				const response = await fetch(`${this.url}api/v1/blog`, {
					method: 'GET',
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				return data;
			} catch (error) {
				console.error('Error fetching blogs:', error);
				// throw error;
			}
		};
	}

	return BlogService;
})();

export default BlogService;
