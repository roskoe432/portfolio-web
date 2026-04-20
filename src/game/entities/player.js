const IDLE_KEY = '(0,0)';
const ANIMS = {
	'(0,0)': 'idle',
	'(0,-1)': 'walk-north',
	'(1,-1)': 'walk-ne',
	'(1,0)': 'walk-east',
	'(1,1)': 'walk-se',
	'(0,1)': 'walk-south',
	'(-1,1)': 'walk-sw',
	'(-1,0)': 'walk-west',
	'(-1,-1)': 'walk-nw',
};
const getAnimKey = (direction) => `(${direction.x},${direction.y})`;

function Player(scene, eventBus, settings = { speed: 100 }) {
	this.player = null;

	const handleNavigation = function ({ direction }) {
		this.player.setVelocity(
			direction.x * settings.speed,
			direction.y * settings.speed,
		);

		const animKey = getAnimKey(direction);
		this.player.play(ANIMS[animKey], true);
	};

	this.player = scene.physics.add.sprite(200, 250, ANIMS[IDLE_KEY]);

	eventBus.onNavigationKeysPressed(handleNavigation.bind(this));

	this.player.setDepth(2);
	this.player.setScale(2);
	this.player.refreshBody();
	this.player.body.setSize(14, 36);

	this.player.play(ANIMS[IDLE_KEY]);
}

export default Player;
