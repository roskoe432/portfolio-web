import { useEffect, useState } from 'react';
import { storageService } from '@services';
import { gameEvents } from '@features/game';

function useTutorial(content) {
	const [currentId, setCurrentId] = useState(0);

	useEffect(() => {
		gameEvents.emitPauseGame();
	}, [currentId]);

	const nextItem = () => {
		const next = currentId + 1;
		if (next >= content.length) {
			storageService.setTutorialViewed(true);
			gameEvents.emitResumeGame();
		}
		setCurrentId(next);
	};

	const getCurrentItem = () => {
		if (storageService.getTutorialViewed() || currentId >= content.length) {
			return null;
		}

		return content[currentId] ?? null;
	};

	return {
		currentId,
		nextItem,
		getCurrentItem,
	};
}

export default useTutorial;
