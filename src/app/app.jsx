// import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';
import GameContainer from '../game';

function App() {
	return (
		<AppProviders>
			<GameContainer />
			{/* <AppLayout /> */}
		</AppProviders>
	);
}

export default App;
