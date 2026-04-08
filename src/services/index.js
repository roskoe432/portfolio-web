import BlogService from './blog.service';
import config from '../config';

export const blogService = new BlogService(config.serverUrl);

export const serverConnectionTest = async (retryIntervalSecs = 2, attempts = 3) => {
	try {
		const response = await fetch(`${config.serverUrl}/health`);
		if (!response.ok) {
			throw new Error(`Server responded with status ${response.status}`);
		}
		return true;
	} catch (error) {
		if (attempts > 0) {
			await new Promise((resolve) => setTimeout(resolve, retryIntervalSecs * 1000));
			return serverConnectionTest(retryIntervalSecs, attempts - 1);
		}
		throw error;
	}
};
