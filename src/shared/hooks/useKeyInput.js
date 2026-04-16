import { useEffect, useRef } from 'react';

function useKeyInput(key, onPress) {
	const handlerRef = useRef(onPress);

	useEffect(() => {
		handlerRef.current = onPress;
	}, [onPress]);

	useEffect(() => {
		const listener = (...args) => handlerRef?.current(...args);

		window.addEventListener('keydown', listener);
		return () => {
			window.removeEventListener('keydown', listener);
		};
	}, [key]);
}

export default useKeyInput;
