import { useGameEvent, Event, gameEvents } from '@game';
import styles from './pause-menu.module.less';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Select } from '@/shared/components';
import i18n from '@i18n';

function PauseMenu() {
	const { t } = useTranslation();
	const [showPauseMenu, setShowPauseMenu] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	useGameEvent(Event.GAME_BROADCAST_PAUSE, (isPaused) => {
		setShowPauseMenu(isPaused);
	});

	if (!showPauseMenu) {
		return <React.Fragment />;
	}

	return (
		<div className={styles.pauseMenu}>
			<div className={styles.hud}>
				{!showSettings ? (
					<div className={styles.buttonGroup}>
						<Button onClick={() => gameEvents.emit(Event.GAME_RESUME)}>
							{t('pauseMenu.resume')}
						</Button>
						<Button onClick={() => setShowSettings(true)}>
							{t('pauseMenu.settings')}
						</Button>
					</div>
				) : null}

				{showSettings ? (
					<div className={styles.settings}>
						<div className={styles.settingsHeader}>
							<h2>{t('pauseMenu.settings')}</h2>
							<Button variant="subtle" onClick={() => setShowSettings(false)}>
								{t('common.back')}
							</Button>
						</div>
						<Select
							label={t('pauseMenu.language')}
							defaultValue={i18n.getCurrentLanguage()}
							options={i18n.getAvailableLanguages()}
							onChange={(value) => i18n.changeLanguage(value)}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default PauseMenu;
