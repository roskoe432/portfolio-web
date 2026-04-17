function Player(scene, eventBus, settings = { speed: 100 }) {
	this.scene = scene;
	this.player = null;
	this.animLoader = null;
	this.settings = settings;

	this.anims = {
		'(0, 0)': 'idle',
		'(0, -1)': 'walk-north',
		'(1, -1)': 'walk-ne',
		'(1, 0)': 'walk-east',
		'(1, 1)': 'walk-se',
		'(0, 1)': 'walk-south',
		'(-1, 1)': 'walk-sw',
		'(-1, 0)': 'walk-west',
		'(-1, -1)': 'walk-nw',
	};

	this.currentAnimKey = `(0, 0)`;

	this.onPreload = async () => {};

	this.handleNavigation = ({ direction }) => {
		this.player.setVelocity(
			direction.x * this.settings.speed,
			direction.y * this.settings.speed,
		);

		const animKey = `(${direction.x}, ${direction.y})`;
		this.player.play(this.anims[animKey], true);
	};

	this.onCreate = (startX = 200, startY = 250) => {
		eventBus.onNavigationKeysPressed(this.handleNavigation);

		this.player = this.scene.physics.add.sprite(startX, startY, 'idle');
		this.player.setDepth(2);
		this.player.setScale(2);
		this.player.refreshBody();
		this.player.body.setSize(14, 36);
		this.player.play('idle');
	};

	this.onUpdate = () => {
		// Leave here for now - may need to add other player-related updates here in the future
	};

	this.addCollisions = (layers) => {
		layers.forEach((layer) => {
			this.scene.physics.add.collider(this.player, layer);
		});
	};
}

export default Player;
