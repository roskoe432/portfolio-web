import { useState } from 'react';

function useGallery(canView, onComplete) {
	const [currentId, setCurrentId] = useState(0);

	const nextItem = () => {
		setCurrentId(currentId + 1);
	};

	const getCurrentItem = (components) => {
		if (!canView) {
			return null;
		}

		if (currentId >= components.length) {
			if (onComplete) {
				onComplete();
			}
			return null;
		}

		return components[currentId];
	};

	return {
		nextItem,
		getCurrentItem,
	};
}

export default useGallery;
