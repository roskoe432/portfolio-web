import React, { useEffect } from 'react';
import PageModal from '@pages/page-modal/page-modal';
import { eventBus, GameCanvas } from '@game';
import styles from './app.module.less';

function App() {
	useEffect(() => {
		eventBus.emitUIMounted();
	}, []);

	return (
		<div className={styles.app}>
			<GameCanvas />
			<PageModal />
		</div>
	);
}

export default App;
