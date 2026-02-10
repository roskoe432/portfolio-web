import BlogService from './blog.service';
import config from '../config';

export const blogService = new BlogService(config.serverUrl);
