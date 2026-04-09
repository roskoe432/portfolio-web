import { useState } from 'react';
import { storageService } from '@services';
import { EventBus } from '@features/game';

function useTutorial(content) {
	const [currentId, setCurrentId] = useState(0);

	const nextItem = () => {
		const next = currentId + 1;
		if (next >= content.length) {
			// storageService.setTutorialViewed(true);
			EventBus.emit('resume-game');
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
		nextItem,
		getCurrentItem,
	};
}

export default useTutorial;
