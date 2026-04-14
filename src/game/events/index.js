import { Events } from 'phaser';
import GameEvents from './game-events';
export { default as Event } from './constants';

export const gameEvents = new GameEvents(new Events.EventEmitter());
