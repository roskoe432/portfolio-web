import { eventBus } from '@game/events';
import { useEffect, useRef } from 'react';

function useGameEvent(subscribeFn, callback) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const off = subscribeFn((...args) => callbackRef.current(...args));

		return () => {
			off();
		};
	}, [subscribeFn]);
}

export function useOnPlayerInteract(handler) {
	useGameEvent((callback) => eventBus.onPlayerInteract(callback), handler);
}

export function useOnPageNavigate(handler) {
	useGameEvent((callback) => eventBus.onPageNavigate(callback), handler);
}

export function useOnGamePaused(handler) {
	useGameEvent((callback) => eventBus.onGamePaused(callback), handler);
}

export function useOnGameResumed(handler) {
	useGameEvent((callback) => eventBus.onGameResumed(callback), handler);
}
