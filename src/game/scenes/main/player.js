function Player(scene) {
	this.scene = scene;
	this.player = null;

	// C:\Users\bensn\Projects\my-projects\portfolio-2025\portfolio-web\public\assets\images\animations\idle\frame_0.png

	this.onPreload = async () => {
		this.scene.load.image(
			'idle_0',
			'/assets/images/animations/idle/frame_0.png',
		);
		this.scene.load.image(
			'idle_1',
			'/assets/images/animations/idle/frame_1.png',
		);
		this.scene.load.image(
			'idle_2',
			'/assets/images/animations/idle/frame_2.png',
		);
		this.scene.load.image(
			'idle_3',
			'/assets/images/animations/idle/frame_3.png',
		);
		this.scene.load.image(
			'walk-right_0',
			'/assets/images/animations/walk/east/frame_0.png',
		);
		this.scene.load.image(
			'walk-right_1',
			'/assets/images/animations/walk/east/frame_1.png',
		);
		this.scene.load.image(
			'walk-right_2',
			'/assets/images/animations/walk/east/frame_2.png',
		);
		this.scene.load.image(
			'walk-right_3',
			'/assets/images/animations/walk/east/frame_3.png',
		);
		this.scene.load.image(
			'walk-right_4',
			'/assets/images/animations/walk/east/frame_4.png',
		);
		this.scene.load.image(
			'walk-right_5',
			'/assets/images/animations/walk/east/frame_5.png',
		);
		this.scene.load.image(
			'walk-left_0',
			'/assets/images/animations/walk/west/frame_0.png',
		);
		this.scene.load.image(
			'walk-left_1',
			'/assets/images/animations/walk/west/frame_1.png',
		);
		this.scene.load.image(
			'walk-left_2',
			'/assets/images/animations/walk/west/frame_2.png',
		);
		this.scene.load.image(
			'walk-left_3',
			'/assets/images/animations/walk/west/frame_3.png',
		);
		this.scene.load.image(
			'walk-left_4',
			'/assets/images/animations/walk/west/frame_4.png',
		);
		this.scene.load.image(
			'walk-left_5',
			'/assets/images/animations/walk/west/frame_5.png',
		);
		this.scene.load.image(
			'walk-up_0',
			'/assets/images/animations/walk/north/frame_0.png',
		);
		this.scene.load.image(
			'walk-up_1',
			'/assets/images/animations/walk/north/frame_1.png',
		);
		this.scene.load.image(
			'walk-up_2',
			'/assets/images/animations/walk/north/frame_2.png',
		);
		this.scene.load.image(
			'walk-up_3',
			'/assets/images/animations/walk/north/frame_3.png',
		);
		this.scene.load.image(
			'walk-up_4',
			'/assets/images/animations/walk/north/frame_4.png',
		);
		this.scene.load.image(
			'walk-up_5',
			'/assets/images/animations/walk/north/frame_5.png',
		);
		this.scene.load.image(
			'walk-down_0',
			'/assets/images/animations/walk/south/frame_0.png',
		);
		this.scene.load.image(
			'walk-down_1',
			'/assets/images/animations/walk/south/frame_1.png',
		);
		this.scene.load.image(
			'walk-down_2',
			'/assets/images/animations/walk/south/frame_2.png',
		);
		this.scene.load.image(
			'walk-down_3',
			'/assets/images/animations/walk/south/frame_3.png',
		);
		this.scene.load.image(
			'walk-down_4',
			'/assets/images/animations/walk/south/frame_4.png',
		);
		this.scene.load.image(
			'walk-down_5',
			'/assets/images/animations/walk/south/frame_5.png',
		);
		this.scene.load.image(
			'walk-ne_0',
			'/assets/images/animations/walk/northeast/frame_0.png',
		);
		this.scene.load.image(
			'walk-ne_1',
			'/assets/images/animations/walk/northeast/frame_1.png',
		);
		this.scene.load.image(
			'walk-ne_2',
			'/assets/images/animations/walk/northeast/frame_2.png',
		);
		this.scene.load.image(
			'walk-ne_3',
			'/assets/images/animations/walk/northeast/frame_3.png',
		);
		this.scene.load.image(
			'walk-ne_4',
			'/assets/images/animations/walk/northeast/frame_4.png',
		);
		this.scene.load.image(
			'walk-ne_5',
			'/assets/images/animations/walk/northeast/frame_5.png',
		);
		this.scene.load.image(
			'walk-nw_0',
			'/assets/images/animations/walk/northwest/frame_0.png',
		);
		this.scene.load.image(
			'walk-nw_1',
			'/assets/images/animations/walk/northwest/frame_1.png',
		);
		this.scene.load.image(
			'walk-nw_2',
			'/assets/images/animations/walk/northwest/frame_2.png',
		);
		this.scene.load.image(
			'walk-nw_3',
			'/assets/images/animations/walk/northwest/frame_3.png',
		);
		this.scene.load.image(
			'walk-nw_4',
			'/assets/images/animations/walk/northwest/frame_4.png',
		);
		this.scene.load.image(
			'walk-nw_5',
			'/assets/images/animations/walk/northwest/frame_5.png',
		);
		this.scene.load.image(
			'walk-se_0',
			'/assets/images/animations/walk/southeast/frame_0.png',
		);
		this.scene.load.image(
			'walk-se_1',
			'/assets/images/animations/walk/southeast/frame_1.png',
		);
		this.scene.load.image(
			'walk-se_2',
			'/assets/images/animations/walk/southeast/frame_2.png',
		);
		this.scene.load.image(
			'walk-se_3',
			'/assets/images/animations/walk/southeast/frame_3.png',
		);
		this.scene.load.image(
			'walk-se_4',
			'/assets/images/animations/walk/southeast/frame_4.png',
		);
		this.scene.load.image(
			'walk-se_5',
			'/assets/images/animations/walk/southeast/frame_5.png',
		);
		this.scene.load.image(
			'walk-sw_0',
			'/assets/images/animations/walk/southwest/frame_0.png',
		);
		this.scene.load.image(
			'walk-sw_1',
			'/assets/images/animations/walk/southwest/frame_1.png',
		);
		this.scene.load.image(
			'walk-sw_2',
			'/assets/images/animations/walk/southwest/frame_2.png',
		);
		this.scene.load.image(
			'walk-sw_3',
			'/assets/images/animations/walk/southwest/frame_3.png',
		);
		this.scene.load.image(
			'walk-sw_4',
			'/assets/images/animations/walk/southwest/frame_4.png',
		);
		this.scene.load.image(
			'walk-sw_5',
			'/assets/images/animations/walk/southwest/frame_5.png',
		);
	};

	this.onCreate = () => {
		this.scene.anims.create({
			key: 'idle',
			frames: [
				{ key: 'idle_0' },
				{ key: 'idle_1' },
				{ key: 'idle_2' },
				{ key: 'idle_3' },
			],
			frameRate: 4,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-right',
			frames: [
				{ key: 'walk-right_0' },
				{ key: 'walk-right_1' },
				{ key: 'walk-right_2' },
				{ key: 'walk-right_3' },
				{ key: 'walk-right_4' },
				{ key: 'walk-right_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-left',
			frames: [
				{ key: 'walk-left_0' },
				{ key: 'walk-left_1' },
				{ key: 'walk-left_2' },
				{ key: 'walk-left_3' },
				{ key: 'walk-left_4' },
				{ key: 'walk-left_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-up',
			frames: [
				{ key: 'walk-up_0' },
				{ key: 'walk-up_1' },
				{ key: 'walk-up_2' },
				{ key: 'walk-up_3' },
				{ key: 'walk-up_4' },
				{ key: 'walk-up_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-down',
			frames: [
				{ key: 'walk-down_0' },
				{ key: 'walk-down_1' },
				{ key: 'walk-down_2' },
				{ key: 'walk-down_3' },
				{ key: 'walk-down_4' },
				{ key: 'walk-down_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-ne',
			frames: [
				{ key: 'walk-ne_0' },
				{ key: 'walk-ne_1' },
				{ key: 'walk-ne_2' },
				{ key: 'walk-ne_3' },
				{ key: 'walk-ne_4' },
				{ key: 'walk-ne_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-nw',
			frames: [
				{ key: 'walk-nw_0' },
				{ key: 'walk-nw_1' },
				{ key: 'walk-nw_2' },
				{ key: 'walk-nw_3' },
				{ key: 'walk-nw_4' },
				{ key: 'walk-nw_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-se',
			frames: [
				{ key: 'walk-se_0' },
				{ key: 'walk-se_1' },
				{ key: 'walk-se_2' },
				{ key: 'walk-se_3' },
				{ key: 'walk-se_4' },
				{ key: 'walk-se_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-sw',
			frames: [
				{ key: 'walk-sw_0' },
				{ key: 'walk-sw_1' },
				{ key: 'walk-sw_2' },
				{ key: 'walk-sw_3' },
				{ key: 'walk-sw_4' },
				{ key: 'walk-sw_5' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.player = this.scene.physics.add.sprite(250, 250, 'idle_0');
		this.player.setZ(2); // Ensure the player is above the desk and floor layers
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
