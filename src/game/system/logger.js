import config from '@config';

const ShorthandLevels = {
	debug: 'DBG',
	info: 'INF',
	warn: 'WRN',
	error: 'ERR',
};

function Logger(minLevel = config.logging.level) {
	this.minLevel = minLevel;
	this.levels = Object.keys(ShorthandLevels);
	this.minLevelIndex = this.levels.indexOf(minLevel);
}

Logger.prototype.formatTimestamp = function () {
	const dateAndTime = new Date().toISOString().split('T');
	const date = dateAndTime[0];
	const time = dateAndTime[1].split('.')[0];
	return `${date} ${time}`;
};

Logger.prototype.log = function (level, message) {
	const levelIndex = this.levels.indexOf(level);
	if (levelIndex < this.minLevelIndex) {
		return;
	}
	const shorthand = ShorthandLevels[level];
	const timestamp = this.formatTimestamp();
	console.log(`[${timestamp}] [${shorthand}] ${message}`);
};

Logger.prototype.debug = function (message) {
	this.log('debug', message);
};

Logger.prototype.info = function (message) {
	this.log('info', message);
};

Logger.prototype.warn = function (message) {
	this.log('warn', message);
};

Logger.prototype.error = function (message) {
	this.log('error', message);
};

export default new Logger();
