import React, { useState, useEffect } from 'react';
import { Modal } from 'react-overlays';
import AppRoutes from '../../app/app-navigation/app-navigation';
import { EventBus } from '@game';
import { useNavigate } from 'react-router-dom';
import styles from './page-modal.module.less';

function PageModal() {
	const [showModal, setShowModal] = useState(false);
	const [pageTitle, setPageTitle] = useState('');

	const navigate = useNavigate();
	useEffect(() => {
		const handleObjectInteract = (payload) => {
			console.log('Object interaction event received in App component!', payload);
			navigate(payload.page);
			setShowModal(true);
			setPageTitle(payload.title);
		};

		console.log('App component mounted');
		EventBus.on('interact', handleObjectInteract);

		return () => {
			EventBus.off('interact', handleObjectInteract);
		};
	}, [navigate]);

	return (
		<React.Fragment>
			<Modal
				className={styles.modal}
				show={showModal}
				onBackdropClick={() => setShowModal(false)}
				onHide={() => setShowModal(false)}
				centered="true"
			>
				<div className={styles.content}>
					<h1 className={styles.title}>{pageTitle}</h1>

					<button className={styles.closeBtn} onClick={() => setShowModal(false)}>
						X
					</button>
					<AppRoutes />
				</div>
			</Modal>
		</React.Fragment>
	);
}

export default PageModal;
