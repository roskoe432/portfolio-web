import { Events } from 'phaser';
export { useGameEvent } from './game.hooks';
import GameEvents from './game-events';

export const Event = {
	GAME_PAUSE: 'game:pause-game',
	GAME_RESUME: 'game:resume-game',
	GAME_INTERACT: 'game:interact',

	NAVIGATE_TO_PAGE: 'ui:navigation.navigate',
};

export const gameEvents = new GameEvents(new Events.EventEmitter());
