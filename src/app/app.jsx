// import AppLayout from './app-layout/app-layout';
import AppProviders from './app-providers';
import { EventBus, GameContainer } from '@game';
import { Modal } from 'react-overlays';
import { useEffect, useState } from 'react';
import AppRoutes from './app-navigation/app-navigation';

function App() {
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		const handleDeskInteract = () => {
			console.log('Desk interaction event received in App component!');
			setShowModal(true);
		};

		// Any global initialization logic can go here
		console.log('App component mounted');
		EventBus.on('desk-interact', handleDeskInteract);

		return () => {
			EventBus.off('desk-interact', handleDeskInteract);
		};
	}, []);

	return (
		<AppProviders>
			<GameContainer />
			<Modal
				show={showModal}
				onBackdropClick={() => setShowModal(false)}
				onHide={() => setShowModal(false)}
				centered="true"
			>
				<div
					style={{
						margin: '30px',
						background: 'white',
						color: 'black',
						padding: '20px',
						borderRadius: '8px',
						overflow: 'scroll',
						maxHeight: '95vh',
					}}
				>
					<button
						style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							background: 'transparent',
							border: 'none',
							fontSize: '16px',
							cursor: 'pointer',
							color: 'black',
						}}
						onClick={() => setShowModal(false)}
					>
						X
					</button>
					<AppRoutes />
				</div>
			</Modal>
		</AppProviders>
	);
}

export default App;
