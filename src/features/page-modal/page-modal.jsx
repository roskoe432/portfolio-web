import React, { useState, useEffect } from 'react';
import { Modal } from 'react-overlays';
import AppRoutes, { AppLinks } from '@app/app-navigation/app-navigation';
import { EventBus } from '@game';
import { useNavigate } from 'react-router';
import styles from './page-modal.module.less';
import config from '@/config';

function PageModal() {
	const [showModal, setShowModal] = useState(config.showModalOnStart);

	const navigate = useNavigate();

	const handleOnModalClose = () => {
		setShowModal(false);
		EventBus.emit('resume-game');
	};

	useEffect(() => {
		const handleObjectInteract = () => {
			setShowModal(true);
		};

		const handleNavigate = (payload) => {
			navigate(payload.page);
		};

		EventBus.on('navigate', handleNavigate);
		EventBus.on('interact', handleObjectInteract);

		return () => {
			EventBus.off('interact', handleObjectInteract);
			EventBus.off('navigate', handleNavigate);
		};
	}, [navigate]);

	return (
		<React.Fragment>
			<Modal
				className={styles.modal}
				show={showModal}
				onBackdropClick={handleOnModalClose}
				onHide={handleOnModalClose}
				centered="true"
			>
				<main className={styles.content}>
					{config.useNavLinks && <AppLinks />}
					<button className={styles.closeBtn} onClick={handleOnModalClose}>
						X
					</button>
					<AppRoutes />
				</main>
			</Modal>
		</React.Fragment>
	);
}

export default PageModal;
