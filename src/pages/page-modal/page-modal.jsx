import React from 'react';
import { Modal } from 'react-overlays';
import AppRoutes, { AppLinks } from '@app/app-navigation/app-navigation';
import styles from './page-modal.module.less';
import config from '@config';
import usePageModal from './usePageModal';
import { useDisableGameInput } from '@game';

function PageModal() {
	const { showModal, handleOnModalClose } = usePageModal();
	useDisableGameInput(showModal);

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
					<button
						className={styles.closeBtn}
						onClick={handleOnModalClose}
						aria-label="X"
					>
						X
					</button>
					<AppRoutes closePageModal={handleOnModalClose} />
				</main>
			</Modal>
		</React.Fragment>
	);
}

export default PageModal;
