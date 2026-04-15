import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-overlays';
import AppRoutes, { AppLinks } from '@app/app-navigation/app-navigation';
import styles from './page-modal.module.less';
import config from '@/config';
import usePageModal from './usePageModal';

function PageModal() {
	const { t } = useTranslation();
	const { showModal, handleOnModalClose } = usePageModal();

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
						aria-label={t('common.close')}
					>
						{t('common.close')}
					</button>
					<AppRoutes />
				</main>
			</Modal>
		</React.Fragment>
	);
}

export default PageModal;
