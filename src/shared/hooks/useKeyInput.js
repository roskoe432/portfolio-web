import { useEffect, useRef } from 'react';

// TODO: Add scope option to only listen when a specific element is focused (e.g. game canvas)
function useKeyInput(key, onPress, { listenForInput = true } = {}) {
	const handlerRef = useRef(onPress);

	useEffect(() => {
		handlerRef.current = onPress;
	}, [onPress]);

	useEffect(() => {
		if (!listenForInput) return;

		const listener = (...args) => handlerRef?.current(...args);

		window.addEventListener('keydown', listener);
		return () => window.removeEventListener('keydown', listener);
	}, [key, listenForInput]);
}

export default useKeyInput;
