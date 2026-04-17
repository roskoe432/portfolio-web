import config from '@config';

const ShorthandLevels = {
	debug: 'DBG',
	info: 'INF',
	warn: 'WRN',
	error: 'ERR',
};

class Logger {
	minLevel;
	levels;
	minLevelIndex;

	constructor(minLevel = config.logging.level) {
		this.minLevel = minLevel;
		this.levels = Object.keys(ShorthandLevels);
		this.minLevelIndex = this.levels.indexOf(minLevel);
	}

	formatTimestamp() {
		const dateAndTime = new Date().toISOString().split('T');
		const date = dateAndTime[0];
		const time = dateAndTime[1].split('.')[0];
		return `${date} ${time}`;
	}

	log(level, message) {
		const levelIndex = this.levels.indexOf(level);
		if (levelIndex < this.minLevelIndex) {
			return;
		}
		const shorthand = ShorthandLevels[level];
		const timestamp = this.formatTimestamp();
		console.log(`[${timestamp}] [${shorthand}] ${message}`);
	}

	debug(message) {
		this.log('debug', message);
	}

	info(message) {
		this.log('info', message);
	}

	warn(message) {
		this.log('warn', message);
	}

	error(message) {
		this.log('error', message);
	}
}

export default new Logger();
