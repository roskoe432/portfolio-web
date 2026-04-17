import { Events } from 'phaser';
import GameEvents from './game-events';

export const eventBus = new GameEvents(new Events.EventEmitter());
