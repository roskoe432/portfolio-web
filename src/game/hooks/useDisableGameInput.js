import { useEffect } from 'react';
import { gameEvents, Event } from '../events';

function useDisableGameInput() {
	useEffect(() => {
		gameEvents.emit(Event.SYSTEM_INPUT_DISABLED);
		return () => {
			gameEvents.emit(Event.SYSTEM_INPUT_ENABLED);
		};
	}, []);
}

export default useDisableGameInput;
