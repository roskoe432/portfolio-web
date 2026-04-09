import GameContainer from '@/app/game-container/game-container';
import PageModal from '@/features/page-modal/page-modal';
import styles from './app.module.less';
import config from '@/config';
import React from 'react';
import Tutorial from '@/features/tutorial/tutorial';

function App() {
	return (
		<div className={styles.app}>
			<Tutorial />
			{config.game.enabled && <GameContainer />}
			<PageModal />
		</div>
	);
}

export default App;
