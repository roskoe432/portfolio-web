import styles from './app-header.module.less';

function AppHeader() {
	return (
		<header className={styles['app-header']}>
			<h1>Ben Snow&apos;s Portfolio</h1>
		</header>
	);
}

export default AppHeader;
