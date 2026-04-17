import { Events } from 'phaser';
import GameEvents from './game-events';
export { default as Event } from './constants';

// migration from gameEvents to eventBus - will be used for global events that need to be listened to across multiple scenes/components
export const gameEvents = new GameEvents(new Events.EventEmitter());
export const eventBus = new GameEvents(new Events.EventEmitter());
