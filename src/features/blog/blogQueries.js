import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services';
import { unwrapQueryData } from '@/shared/query/query-client';

export const blogQueryKeys = {
	getAllBlogs: ['blogs'],
	getBlog: (id) => ['blogs', id],
};

export function useBlogsQuery() {
	return useQuery({
		queryKey: blogQueryKeys.getAllBlogs,
		queryFn: () => unwrapQueryData(() => blogService.getBlogs()),
	});
}
