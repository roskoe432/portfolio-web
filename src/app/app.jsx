import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';
import Background from '@/shared/components/background/background';

function App() {
	return (
		<AppProviders>
			<Background />
			<AppLayout />
		</AppProviders>
	);
}

export default App;
