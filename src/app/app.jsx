import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';
import { blogService } from '../services/index.js';

blogService.getBlogs().then((posts) => {
	console.log('Fetched posts:', posts);
});

function App() {
	return (
		<AppProviders>
			<AppLayout />
		</AppProviders>
	);
}

export default App;
