import { eventBus, useOnGamePaused, useOnGameResumed } from '@game';
import styles from './pause-menu.module.less';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@shared/components';
import Settings from './settings/settings';
import Credits from './credits/credits';
import useKeyInput from '@shared/hooks/useKeyInput';

function PauseMenu() {
	const { t } = useTranslation();
	const [showPauseMenu, setShowPauseMenu] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [showCredits, setShowCredits] = useState(false);

	useOnGamePaused(() => {
		setShowPauseMenu(true);
	});

	useOnGameResumed(() => {
		setShowPauseMenu(false);
		setShowSettings(false);
		setShowCredits(false);
	});

	useKeyInput(
		'Escape',
		() => {
			eventBus.emitRequestResume();
			setShowSettings(false);
		},
		{ listenForInput: showPauseMenu },
	);

	if (!showPauseMenu) {
		return <React.Fragment />;
	}

	const showMenu = !showSettings && !showCredits;

	return (
		<div className={styles.pauseMenu}>
			<div className={styles.hud}>
				{showMenu ? (
					<div className={styles.buttonGroup}>
						<Button onClick={() => eventBus.emitRequestResume()}>
							{t('pauseMenu.resume')}
						</Button>
						<Button onClick={() => setShowSettings(true)}>
							{t('pauseMenu.settings')}
						</Button>
						<Button variant="subtle" onClick={() => setShowCredits(true)}>
							{t('pauseMenu.credits')}
						</Button>
					</div>
				) : null}

				<Settings show={showSettings} onBack={() => setShowSettings(false)} />
				<Credits show={showCredits} onBack={() => setShowCredits(false)} />
			</div>
		</div>
	);
}

export default PauseMenu;
