import PageModal from '@pages/page-modal/page-modal';
import styles from './app.module.less';
import React from 'react';
import Tutorial from '@features/tutorial/tutorial';

function App() {
	return (
		<div className={styles.app}>
			<Tutorial />
			<PageModal />
		</div>
	);
}

export default App;
