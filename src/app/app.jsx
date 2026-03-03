// import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';
import GameContainer from '../game';
import { useEffect } from 'react';
import EventBus from '@/game/event-bus';

function App() {
	useEffect(() => {
		// Any global initialization logic can go here
		console.log('App component mounted');
		EventBus.on('desk-interact', () => {
			console.log('Desk interaction event received in App component!');
			// You can handle global events here, such as showing a modal or updating state
		});

		return () => {
			EventBus.off('desk-interact');
		};
	}, []);

	return (
		<AppProviders>
			<GameContainer />
			{/* <AppLayout /> */}
		</AppProviders>
	);
}

export default App;
