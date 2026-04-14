import { Events } from 'phaser';
export { useGameEvent } from './game.hooks';
import GameEvents from './game-events';

export const Event = {
	GAME_HANDLE_PAUSE: 'game:pause-change',
	GAME_INTERACT: 'game:interact',
	GAME_NAVIGATE: 'game:navigation:navigate',
};

export const gameEvents = new GameEvents(new Events.EventEmitter());
