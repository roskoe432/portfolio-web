import logger from './logger';
import { eventBus } from '@game/events';
import PauseManager from './pause.manager';
import InputManager from './input.manager';
import AssetManager from './asset.manager';

export const pauseManager = new PauseManager(eventBus, logger);
export const inputManager = new InputManager(eventBus, logger);
export const assetManager = new AssetManager(eventBus, logger);
