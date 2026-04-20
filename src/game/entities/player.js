import Phaser from 'phaser';

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
	Phaser.Physics.Arcade.Sprite.call(this, scene, 250, 250, ANIMS[IDLE_KEY]);
	scene.add.existing(this);
	scene.physics.add.existing(this);

	const handleNavigation = function ({ direction }) {
		this.setVelocity(
			direction.x * settings.speed,
			direction.y * settings.speed,
		);

		const animKey = getAnimKey(direction);
		this.play(ANIMS[animKey], true);
	};

	eventBus.onNavigationKeysPressed(handleNavigation.bind(this));

	this.setDepth(2);
	this.setScale(2);
	this.refreshBody();
	this.body.setSize(14, 36);

	this.play(ANIMS[IDLE_KEY]);
}
Player.prototype = Object.create(Phaser.Physics.Arcade.Sprite.prototype);
Player.prototype.constructor = Player;

export default Player;
