import { useTranslation } from 'react-i18next';
import styles from './loading.module.less';

function Loading({ message, size = 'medium' }) {
	const { t } = useTranslation();
	const displayMessage = message ?? t('common.loading');
	return (
		<div className={styles.container}>
			<div className={`${styles.spinner} ${styles[size]}`}>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
			</div>
			{displayMessage && <p className={styles.message}>{displayMessage}</p>}
		</div>
	);
}

export default Loading;
