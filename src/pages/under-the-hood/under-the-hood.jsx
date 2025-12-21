import styles from './under-the-hood.module.less';

function UnderTheHoodPage() {
	return (
		<div className={styles['under-the-hood']}>
			<h1>Under The Hood</h1>
			<p>
				This page provides insights into the technical aspects of the project.
			</p>
		</div>
	);
}

export default UnderTheHoodPage;
