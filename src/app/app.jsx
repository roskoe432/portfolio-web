import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';

function App() {
	return (
		<AppProviders>
			<AppLayout />
		</AppProviders>
	);
}

export default App;
