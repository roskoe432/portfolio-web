import { useGameEvent, Event, gameEvents } from '@game/events';
import styles from './pause-menu.module.less';
import React, { useState } from 'react';
import { Button, Select } from '@/shared/components';
import { changeLanguage, getAvailableLanguages, getCurrentLanguage } from '@i18n/index.js';

function PauseMenu() {
	const [showPauseMenu, setShowPauseMenu] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	useGameEvent(Event.GAME_HANDLE_PAUSE, (isPaused) => {
		console.log('Pause state changed:', isPaused);
		setShowPauseMenu(isPaused);
	});

	if (!showPauseMenu) {
		return <React.Fragment />;
	}

	return (
		<div className={styles.pauseMenu}>
			{!showSettings ? (
				<div className={styles.buttonGroup}>
					<Button onClick={() => gameEvents.emit(Event.GAME_HANDLE_PAUSE, false)}>Resume</Button>
					<Button onClick={() => setShowSettings(true)}>Settings</Button>
				</div>
			) : (
				<></>
			)}

			{showSettings ? (
				<div className={styles.settings}>
					<div className={styles.settingsHeader}>
						<h2>Settings</h2>
						<Button onClick={() => setShowSettings(false)}>Back</Button>
					</div>
					<Select
						label="Language"
						defaultValue={getCurrentLanguage()}
						options={getAvailableLanguages()}
						onChange={(value) => changeLanguage(value)}
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default PauseMenu;
