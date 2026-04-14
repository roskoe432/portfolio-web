import { useGameEvent, Event } from '@game/events';
import styles from './pause-menu.module.less';
import { useState } from 'react';

function PauseMenu() {
	const [showPauseMenu, setShowPauseMenu] = useState(false);
	useGameEvent(Event.GAME_PAUSE, () => {
		setShowPauseMenu(true);
	});

	useGameEvent(Event.GAME_RESUME, () => {
		console.log('Game resumed, hiding pause menu');
		setShowPauseMenu(false);
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
