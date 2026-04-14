import PageModal from '@pages/page-modal/page-modal';
import styles from './app.module.less';
import React from 'react';
import Tutorial from '@features/tutorial/tutorial';
import PauseMenu from '@features/pause-menu/pause-menu';

function App() {
	return (
		<div className={styles.app}>
			<Tutorial />
			<PageModal />
			<PauseMenu />
		</div>
	);
}

export default App;
