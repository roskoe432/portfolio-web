import React, { useEffect } from 'react';
import PageModal from '@pages/page-modal/page-modal';
import { eventBus, GameCanvas } from '@game';
import styles from './app.module.less';

function App() {
	useEffect(() => {
		let cancelled = false;

		const startGame = async () => {
			if ('fonts' in document) {
				try {
					await Promise.all([
						document.fonts.load('30px "pixelFont"'),
						document.fonts.ready,
					]);
				} catch {
					// Fall through and let the game boot with the browser fallback font.
				}
			}

			if (!cancelled) {
				eventBus.emitUIMounted();
			}
		};

		startGame();

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className={styles.app}>
			<GameCanvas />
			<PageModal />
		</div>
	);
}

export default App;
