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
	useEffect(() => {
		const handleObjectInteract = (payload) => {
			navigate(payload.page);
			setShowModal(true);
		};

		EventBus.on('interact', handleObjectInteract);

		return () => {
			EventBus.off('interact', handleObjectInteract);
		};
	}, [navigate]);

	const handleOnModalClose = () => {
		setShowModal(false);
		EventBus.emit('resume-game');
	};

	return (
		<React.Fragment>
			<Modal
				className={styles.modal}
				show={showModal}
				onBackdropClick={handleOnModalClose}
				onHide={handleOnModalClose}
				centered="true"
			>
				<div className={styles.content}>
					{config.useNavLinks && <AppLinks />}
					<button className={styles.closeBtn} onClick={handleOnModalClose}>
						X
					</button>
					<AppRoutes />
				</div>
			</Modal>
		</React.Fragment>
	);
}

export default PageModal;
