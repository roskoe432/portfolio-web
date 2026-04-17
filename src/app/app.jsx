import PageModal from '@pages/page-modal/page-modal';
import styles from './app.module.less';
import React, { useEffect } from 'react';
import { gameEvents, Event } from '@game';
import GameCanvas from '@game/game-canvas/game-canvas';

function App() {
	useEffect(() => {
		gameEvents.emit(Event.SYSTEM_UI_MOUNTED);
	}, []);

	return (
		<div className={styles.app}>
			<GameCanvas />
			<PageModal />
		</div>
	);
}

export default App;
