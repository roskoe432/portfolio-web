import styles from './custom-loader.module.less';

function CustomLoader() {
	return (
		<div className={styles['loader-overlay']}>
			<div className={styles['loader-spinner']}>
				<div className={styles['loader-cube']}></div>
			</div>
		</div>
	);
}

export default CustomLoader;
