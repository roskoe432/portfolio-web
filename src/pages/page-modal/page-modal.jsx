import React, { useState, useEffect } from 'react';
import { Modal } from 'react-overlays';
import AppRoutes from '../../app/app-navigation/app-navigation';
import { EventBus } from '@game';
import { useNavigate } from 'react-router-dom';
import styles from './page-modal.module.less';

function PageModal() {
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();
	useEffect(() => {
		const handleDeskInteract = (payload) => {
			console.log('Desk interaction event received in App component!', payload);
			navigate(payload.page);
			setShowModal(true);
		};

		console.log('App component mounted');
		EventBus.on('interact', handleDeskInteract);

		return () => {
			EventBus.off('interact', handleDeskInteract);
		};
	}, [navigate]);

	return (
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
				<AppRoutes />
			</div>
		</Modal>
	);
}

export default PageModal;
