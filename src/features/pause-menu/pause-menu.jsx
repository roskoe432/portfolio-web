import { useGameEvent, Event } from '@game/events';
import styles from './pause-menu.module.less';
import { useState } from 'react';

function PauseMenu() {
	const [showPauseMenu, setShowPauseMenu] = useState(false);
	useGameEvent(Event.GAME_HANDLE_PAUSE, (isPaused) => {
		setShowPauseMenu(isPaused);
	});

	if (!showPauseMenu) {
		return null;
	}

	return (
		<div className={styles.pauseMenu}>
			<h1>Pause Menu</h1>
		</div>
	);
}

export default PauseMenu;
