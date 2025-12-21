import styles from './under-the-hood.module.less';

function UnderTheHoodPage() {
	return (
		<div className={styles['under-the-hood']}>
			<h1>Under The Hood</h1>
			<p>
				This page provides insights into the inner workings of the application.
			</p>
		</div>
	);
}

export default UnderTheHoodPage;
