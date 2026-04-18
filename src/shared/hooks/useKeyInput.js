import { useCallback, useEffect, useRef } from 'react';

function useKeyInput(
	key,
	onPress,
	{ listenForInput = true, filterTags = [] } = {},
) {
	const handlerRef = useRef(onPress);

	useEffect(() => {
		handlerRef.current = onPress;
	}, [onPress]);

	const checkTags = useCallback(
		(event) => {
			if (filterTags.length === 0) return true;

			return filterTags.some(
				(tag) => event.target?.tagName.toLowerCase() === tag.toLowerCase(),
			);
		},
		[filterTags],
	);

	useEffect(() => {
		if (!listenForInput) return;

		const handleKeyDown = (event) => {
			if (event.key !== key || event.repeat || !checkTags(event)) return;
			handlerRef?.current(event);
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [key, listenForInput, checkTags]);
}

export default useKeyInput;
