function Player(scene) {
	this.scene = scene;
	this.player = null;
	this.animLoader = null;

	this.onPreload = async () => {};

	this.onCreate = (startX = 200, startY = 250) => {
		this.player = this.scene.physics.add.sprite(startX, startY, 'idle');
		this.player.setDepth(2);
		this.player.setScale(2);
		this.player.refreshBody();
		this.player.body.setSize(14, 36);
		this.player.play('idle');
	};

	this.onUpdate = (cursors, wasdKeys) => {
		const speed = 100;
		let moving = false;

		this.player.setVelocity(0);

		// Check for diagonal movement first
		if (
			(cursors.left.isDown || wasdKeys.left.isDown) &&
			(cursors.up.isDown || wasdKeys.up.isDown)
		) {
			this.player.setVelocityX(-speed);
			this.player.setVelocityY(-speed);
			this.player.play('walk-nw', true);
			moving = true;
		} else if (
			(cursors.right.isDown || wasdKeys.right.isDown) &&
			(cursors.up.isDown || wasdKeys.up.isDown)
		) {
			this.player.setVelocityX(speed);
			this.player.setVelocityY(-speed);
			this.player.play('walk-ne', true);
			moving = true;
		} else if (
			(cursors.left.isDown || wasdKeys.left.isDown) &&
			(cursors.down.isDown || wasdKeys.down.isDown)
		) {
			this.player.setVelocityX(-speed);
			this.player.setVelocityY(speed);
			this.player.play('walk-sw', true);
			moving = true;
		} else if (
			(cursors.right.isDown || wasdKeys.right.isDown) &&
			(cursors.down.isDown || wasdKeys.down.isDown)
		) {
			this.player.setVelocityX(speed);
			this.player.setVelocityY(speed);
			this.player.play('walk-se', true);
			moving = true;
		}
		// Then check cardinal directions
		else if (cursors.left.isDown || wasdKeys.left.isDown) {
			this.player.setVelocityX(-speed);
			this.player.play('walk-west', true);
			moving = true;
		} else if (cursors.right.isDown || wasdKeys.right.isDown) {
			this.player.setVelocityX(speed);
			this.player.play('walk-east', true);
			moving = true;
		} else if (cursors.up.isDown || wasdKeys.up.isDown) {
			this.player.setVelocityY(-speed);
			this.player.play('walk-north', true);
			moving = true;
		} else if (cursors.down.isDown || wasdKeys.down.isDown) {
			this.player.setVelocityY(speed);
			this.player.play('walk-south', true);
			moving = true;
		}

		if (!moving) {
			this.player.play('idle', true);
		}
	};

	this.addCollisions = (layers) => {
		layers.forEach((layer) => {
			this.scene.physics.add.collider(this.player, layer);
		});
	};
}

export default Player;
