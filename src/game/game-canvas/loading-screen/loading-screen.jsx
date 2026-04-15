import ProgressBar from '@shared/components/progress-bar/progress-bar';
import styles from './loading-screen.module.less';
import { useState } from 'react';
import { useGameEvent, Event } from '@game';

function LoadingScreen() {
	const [showProgress, setShowProgress] = useState(false);
	const [progress, setProgress] = useState(0);

	useGameEvent(Event.SYSTEM_ASSET_LOAD_START, () => {
		setShowProgress(true);
		setProgress(0);
	});

	useGameEvent(Event.SYSTEM_ASSET_LOAD_PROGRESS, (value) => {
		setProgress(value);
	});

	useGameEvent(Event.SYSTEM_ASSET_LOAD_COMPLETE, () => {
		setTimeout(() => {
			setShowProgress(false);
		}, 500);
	});

	if (!showProgress) {
		return <></>;
	}

	return (
		<div className={styles.screen}>
			<div className={styles.content}>
				<ProgressBar value={progress} color="blue" size="large" dark className={styles.bar} />
				<span className={styles.percent}>{Math.round(progress * 100)}%</span>
			</div>
		</div>
	);
}

export default LoadingScreen;
