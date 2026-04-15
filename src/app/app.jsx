import PageModal from '@pages/page-modal/page-modal';
import styles from './app.module.less';
import React, { useEffect } from 'react';
import PauseMenu from '@features/pause-menu/pause-menu';
import LoadingScreen from '@features/loading-screen/loading-screen';
import { gameEvents, Event } from '@game';

function App() {
	useEffect(() => {
		gameEvents.emit(Event.SYSTEM_UI_MOUNTED);
	}, []);

	return (
		<div className={styles.app}>
			<PageModal />
			<PauseMenu />
			<LoadingScreen />
		</div>
	);
}

export default App;
