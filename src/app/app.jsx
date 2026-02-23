import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';
import GameContainer from './game-container/game-container';

function App() {
	return (
		<AppProviders>
			<GameContainer />
			<AppLayout />
		</AppProviders>
	);
}

export default App;
