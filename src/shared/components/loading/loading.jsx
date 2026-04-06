import styles from './loading.module.less';

function Loading({ message = 'Loading...', size = 'medium' }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.spinner} ${styles[size]}`}>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
			</div>
			{message && <p className={styles.message}>{message}</p>}
		</div>
	);
}

export default Loading;
