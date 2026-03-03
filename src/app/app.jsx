// import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';
import GameContainer from '../game';
import { Modal } from 'react-overlays';
import { useEffect, useState } from 'react';
import EventBus from '@/game/event-bus';

function App() {
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		// Any global initialization logic can go here
		console.log('App component mounted');
		EventBus.on('desk-interact', () => {
			console.log('Desk interaction event received in App component!');
			// You can handle global events here, such as showing a modal or updating state
			setShowModal(true);
		});

		return () => {
			EventBus.off('desk-interact');
		};
	}, []);

	return (
		<AppProviders>
			<GameContainer />
			<Modal show={showModal}>
				<div
					style={{ background: 'white', padding: '20px', borderRadius: '8px' }}
				>
					<h2>Computer Desk Interaction</h2>
					<p>
						You have interacted with the computer desk! This is a placeholder
						modal.
					</p>
					{/* You can add more interactive content here, such as buttons or additional information */}
				</div>
			</Modal>
		</AppProviders>
	);
}

export default App;
