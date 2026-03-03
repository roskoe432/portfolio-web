import getSceneImageAnimLoader from './images';

function Player(scene) {
	this.scene = scene;
	this.player = null;
	this.loadImages = getSceneImageAnimLoader(scene);
	this.animLoader = null;

	// C:\Users\bensn\Projects\my-projects\portfolio-2025\portfolio-web\public\assets\images\animations\idle\frame_0.png

	this.onPreload = async () => {
		this.animLoader = this.loadImages();
	};

	this.onCreate = () => {
		this.animLoader(); // Create animations after loading images
		this.player = this.scene.physics.add.sprite(200, 250, 'idle_0');
		this.player.setDepth(2); // Ensure the player is above the desk and floor layers
		this.player.setScale(2);
		this.player.refreshBody();
		this.player.body.setSize(18, 36);
		this.player.play('idle');
	};

	this.onUpdate = (cursors) => {
		const speed = 100;
		let moving = false;

		this.player.setVelocity(0);

		// Check for diagonal movement first
		if (cursors.left.isDown && cursors.up.isDown) {
			this.player.setVelocityX(-speed);
			this.player.setVelocityY(-speed);
			this.player.play('walk-nw', true);
			moving = true;
		} else if (cursors.right.isDown && cursors.up.isDown) {
			this.player.setVelocityX(speed);
			this.player.setVelocityY(-speed);
			this.player.play('walk-ne', true);
			moving = true;
		} else if (cursors.left.isDown && cursors.down.isDown) {
			this.player.setVelocityX(-speed);
			this.player.setVelocityY(speed);
			this.player.play('walk-sw', true);
			moving = true;
		} else if (cursors.right.isDown && cursors.down.isDown) {
			this.player.setVelocityX(speed);
			this.player.setVelocityY(speed);
			this.player.play('walk-se', true);
			moving = true;
		}
		// Then check cardinal directions
		else if (cursors.left.isDown) {
			this.player.setVelocityX(-speed);
			this.player.play('walk-left', true);
			moving = true;
		} else if (cursors.right.isDown) {
			this.player.setVelocityX(speed);
			this.player.play('walk-right', true);
			moving = true;
		} else if (cursors.up.isDown) {
			this.player.setVelocityY(-speed);
			this.player.play('walk-up', true);
			moving = true;
		} else if (cursors.down.isDown) {
			this.player.setVelocityY(speed);
			this.player.play('walk-down', true);
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
