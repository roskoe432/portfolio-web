import PageModal from '@pages/page-modal/page-modal';
import styles from './app.module.less';
import React, { useEffect } from 'react';
import { eventBus } from '@game';
import GameCanvas from '@game/game-canvas/game-canvas';

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
