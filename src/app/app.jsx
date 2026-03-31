import { EventBus } from '@game';
import { Modal } from 'react-overlays';
import { useEffect, useState } from 'react';
import AppRoutes from './app-navigation/app-navigation';
import styles from './app.module.less';

function App() {
	const [showModal, setShowModal] = useState(true);
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
		<div className={styles.app}>
			{/* <GameContainer /> */}
			<Modal
				className={styles.modal}
				show={showModal}
				onBackdropClick={() => setShowModal(false)}
				onHide={() => setShowModal(false)}
				centered="true"
			>
				<div className={styles.content}>
					<button
						className={styles.closeBtn}
						onClick={() => setShowModal(false)}
					>
						X
					</button>
					<AppRoutes />
				</div>
			</Modal>
		</div>
	);
}

export default App;
