import { EventBus } from '@game';
import { Modal } from 'react-overlays';
import { useEffect, useState } from 'react';
import AppRoutes, { AppLinks } from './app-navigation/app-navigation';
import GameContainer from '../game/game-container/game-container';
import styles from './app.module.less';
import { useNavigate } from 'react-router-dom';

function App() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const handleDeskInteract = () => {
			console.log('Desk interaction event received in App component!');
			setShowModal(true);
		};

		console.log('App component mounted');
		EventBus.on('desk-interact', handleDeskInteract);

		return () => {
			EventBus.off('desk-interact', handleDeskInteract);
		};
	}, [navigate]);

	return (
		<div className={styles.app}>
			<GameContainer />
			<Modal
				className={styles.modal}
				show={showModal}
				onBackdropClick={() => setShowModal(false)}
				onHide={() => setShowModal(false)}
				centered="true"
			>
				<div className={styles.content}>
					<button className={styles.closeBtn} onClick={() => setShowModal(false)}>
						X
					</button>
					<AppLinks />
					<AppRoutes />
				</div>
			</Modal>
		</div>
	);
}

export default App;
