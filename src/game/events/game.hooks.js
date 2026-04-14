import { gameEvents } from '@game/events';
import { useEffect, useRef } from 'react';

export function useGameEvent(event, handler) {
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const off = gameEvents.on(event, (...args) => {
			if (handlerRef.current) {
				handlerRef.current(...args);
			}
		});

		return () => {
			off();
		};
	}, [event]);
}

export const emit = (event, payload) => {
	gameEvents.emit(event, payload);
};
