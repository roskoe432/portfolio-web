import { useEffect, useState } from 'react';
import { storageService } from '@services';
import { eventBus } from '@game';

function useTutorial(content) {
	const [currentId, setCurrentId] = useState(0);

	useEffect(() => {
		if (storageService.getTutorialViewed()) return;
		eventBus.emitRequestPause({ sender: 'tutorial' });
	}, []);

	const prevItem = () => {
		if (currentId > 0) {
			setCurrentId(currentId - 1);
		}
	};

	const nextItem = () => {
		const next = currentId + 1;
		if (next >= content.length) {
			storageService.setTutorialViewed(true);
			eventBus.emitRequestResume({ sender: 'tutorial' });
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
		prevItem,
		nextItem,
		getCurrentItem,
	};
}

export default useTutorial;
