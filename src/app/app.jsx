import PageModal from '@pages/page-modal/page-modal';
import styles from './app.module.less';
import React, { useEffect } from 'react';
import Tutorial from '@features/tutorial/tutorial';
import PauseMenu from '@features/pause-menu/pause-menu';
import LoadingScreen from '@features/loading-screen/loading-screen';
import { gameEvents, Event } from '@game';

function App() {
	useEffect(() => {
		// Notify game that UI has mounted
		console.log('UI mounted, emitting SYSTEM_UI_MOUNTED event');
		gameEvents.emit(Event.SYSTEM_UI_MOUNTED);
	}, []);

	return (
		<div className={styles.app}>
			<Tutorial />
			<PageModal />
			<PauseMenu />
			<LoadingScreen />
		</div>
	);
}

export default App;
