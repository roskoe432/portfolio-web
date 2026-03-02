import idleAnim1 from '../../assets/images/animations/idle/south/frame_0.png';
import idleAnim2 from '../../assets/images/animations/idle/south/frame_1.png';
import idleAnim3 from '../../assets/images/animations/idle/south/frame_2.png';
import idleAnim4 from '../../assets/images/animations/idle/south/frame_3.png';
import walkRightAnim1 from '../../assets/images/animations/walk/east/frame_0.png';
import walkRightAnim2 from '../../assets/images/animations/walk/east/frame_1.png';
import walkRightAnim3 from '../../assets/images/animations/walk/east/frame_2.png';
import walkRightAnim4 from '../../assets/images/animations/walk/east/frame_3.png';
import walkRightAnim5 from '../../assets/images/animations/walk/east/frame_4.png';
import walkRightAnim6 from '../../assets/images/animations/walk/east/frame_5.png';
import walkLeftAnim1 from '../../assets/images/animations/walk/west/frame_0.png';
import walkLeftAnim2 from '../../assets/images/animations/walk/west/frame_1.png';
import walkLeftAnim3 from '../../assets/images/animations/walk/west/frame_2.png';
import walkLeftAnim4 from '../../assets/images/animations/walk/west/frame_3.png';
import walkLeftAnim5 from '../../assets/images/animations/walk/west/frame_4.png';
import walkLeftAnim6 from '../../assets/images/animations/walk/west/frame_5.png';
import walkUpAnim1 from '../../assets/images/animations/walk/north/frame_0.png';
import walkUpAnim2 from '../../assets/images/animations/walk/north/frame_1.png';
import walkUpAnim3 from '../../assets/images/animations/walk/north/frame_2.png';
import walkUpAnim4 from '../../assets/images/animations/walk/north/frame_3.png';
import walkUpAnim5 from '../../assets/images/animations/walk/north/frame_4.png';
import walkUpAnim6 from '../../assets/images/animations/walk/north/frame_5.png';
import walkDownAnim1 from '../../assets/images/animations/walk/south/frame_0.png';
import walkDownAnim2 from '../../assets/images/animations/walk/south/frame_1.png';
import walkDownAnim3 from '../../assets/images/animations/walk/south/frame_2.png';
import walkDownAnim4 from '../../assets/images/animations/walk/south/frame_3.png';
import walkDownAnim5 from '../../assets/images/animations/walk/south/frame_4.png';
import walkDownAnim6 from '../../assets/images/animations/walk/south/frame_5.png';
import walkNEAnim1 from '../../assets/images/animations/walk/north-east/frame_0.png';
import walkNEAnim2 from '../../assets/images/animations/walk/north-east/frame_1.png';
import walkNEAnim3 from '../../assets/images/animations/walk/north-east/frame_2.png';
import walkNEAnim4 from '../../assets/images/animations/walk/north-east/frame_3.png';
import walkNEAnim5 from '../../assets/images/animations/walk/north-east/frame_4.png';
import walkNEAnim6 from '../../assets/images/animations/walk/north-east/frame_5.png';
import walkNWAnim1 from '../../assets/images/animations/walk/north-west/frame_0.png';
import walkNWAnim2 from '../../assets/images/animations/walk/north-west/frame_1.png';
import walkNWAnim3 from '../../assets/images/animations/walk/north-west/frame_2.png';
import walkNWAnim4 from '../../assets/images/animations/walk/north-west/frame_3.png';
import walkNWAnim5 from '../../assets/images/animations/walk/north-west/frame_4.png';
import walkNWAnim6 from '../../assets/images/animations/walk/north-west/frame_5.png';
import walkSEAnim1 from '../../assets/images/animations/walk/south-east/frame_0.png';
import walkSEAnim2 from '../../assets/images/animations/walk/south-east/frame_1.png';
import walkSEAnim3 from '../../assets/images/animations/walk/south-east/frame_2.png';
import walkSEAnim4 from '../../assets/images/animations/walk/south-east/frame_3.png';
import walkSEAnim5 from '../../assets/images/animations/walk/south-east/frame_4.png';
import walkSEAnim6 from '../../assets/images/animations/walk/south-east/frame_5.png';
import walkSWAnim1 from '../../assets/images/animations/walk/south-west/frame_0.png';
import walkSWAnim2 from '../../assets/images/animations/walk/south-west/frame_1.png';
import walkSWAnim3 from '../../assets/images/animations/walk/south-west/frame_2.png';
import walkSWAnim4 from '../../assets/images/animations/walk/south-west/frame_3.png';
import walkSWAnim5 from '../../assets/images/animations/walk/south-west/frame_4.png';
import walkSWAnim6 from '../../assets/images/animations/walk/south-west/frame_5.png';

function Player(scene) {
	this.scene = scene;
	this.player = null;

	this.onPreload = async () => {
		this.scene.load.image('idle_1', idleAnim1);
		this.scene.load.image('idle_2', idleAnim2);
		this.scene.load.image('idle_3', idleAnim3);
		this.scene.load.image('idle_4', idleAnim4);
		this.scene.load.image('walk-right_1', walkRightAnim1);
		this.scene.load.image('walk-right_2', walkRightAnim2);
		this.scene.load.image('walk-right_3', walkRightAnim3);
		this.scene.load.image('walk-right_4', walkRightAnim4);
		this.scene.load.image('walk-right_5', walkRightAnim5);
		this.scene.load.image('walk-right_6', walkRightAnim6);
		this.scene.load.image('walk-left_1', walkLeftAnim1);
		this.scene.load.image('walk-left_2', walkLeftAnim2);
		this.scene.load.image('walk-left_3', walkLeftAnim3);
		this.scene.load.image('walk-left_4', walkLeftAnim4);
		this.scene.load.image('walk-left_5', walkLeftAnim5);
		this.scene.load.image('walk-left_6', walkLeftAnim6);
		this.scene.load.image('walk-up_1', walkUpAnim1);
		this.scene.load.image('walk-up_2', walkUpAnim2);
		this.scene.load.image('walk-up_3', walkUpAnim3);
		this.scene.load.image('walk-up_4', walkUpAnim4);
		this.scene.load.image('walk-up_5', walkUpAnim5);
		this.scene.load.image('walk-up_6', walkUpAnim6);
		this.scene.load.image('walk-down_1', walkDownAnim1);
		this.scene.load.image('walk-down_2', walkDownAnim2);
		this.scene.load.image('walk-down_3', walkDownAnim3);
		this.scene.load.image('walk-down_4', walkDownAnim4);
		this.scene.load.image('walk-down_5', walkDownAnim5);
		this.scene.load.image('walk-down_6', walkDownAnim6);
		this.scene.load.image('walk-ne_1', walkNEAnim1);
		this.scene.load.image('walk-ne_2', walkNEAnim2);
		this.scene.load.image('walk-ne_3', walkNEAnim3);
		this.scene.load.image('walk-ne_4', walkNEAnim4);
		this.scene.load.image('walk-ne_5', walkNEAnim5);
		this.scene.load.image('walk-ne_6', walkNEAnim6);
		this.scene.load.image('walk-nw_1', walkNWAnim1);
		this.scene.load.image('walk-nw_2', walkNWAnim2);
		this.scene.load.image('walk-nw_3', walkNWAnim3);
		this.scene.load.image('walk-nw_4', walkNWAnim4);
		this.scene.load.image('walk-nw_5', walkNWAnim5);
		this.scene.load.image('walk-nw_6', walkNWAnim6);
		this.scene.load.image('walk-se_1', walkSEAnim1);
		this.scene.load.image('walk-se_2', walkSEAnim2);
		this.scene.load.image('walk-se_3', walkSEAnim3);
		this.scene.load.image('walk-se_4', walkSEAnim4);
		this.scene.load.image('walk-se_5', walkSEAnim5);
		this.scene.load.image('walk-se_6', walkSEAnim6);
		this.scene.load.image('walk-sw_1', walkSWAnim1);
		this.scene.load.image('walk-sw_2', walkSWAnim2);
		this.scene.load.image('walk-sw_3', walkSWAnim3);
		this.scene.load.image('walk-sw_4', walkSWAnim4);
		this.scene.load.image('walk-sw_5', walkSWAnim5);
		this.scene.load.image('walk-sw_6', walkSWAnim6);
	};

	this.onCreate = () => {
		this.scene.anims.create({
			key: 'idle',
			frames: [
				{ key: 'idle_1' },
				{ key: 'idle_2' },
				{ key: 'idle_3' },
				{ key: 'idle_4' },
			],
			frameRate: 4,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-right',
			frames: [
				{ key: 'walk-right_1' },
				{ key: 'walk-right_2' },
				{ key: 'walk-right_3' },
				{ key: 'walk-right_4' },
				{ key: 'walk-right_5' },
				{ key: 'walk-right_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-left',
			frames: [
				{ key: 'walk-left_1' },
				{ key: 'walk-left_2' },
				{ key: 'walk-left_3' },
				{ key: 'walk-left_4' },
				{ key: 'walk-left_5' },
				{ key: 'walk-left_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-up',
			frames: [
				{ key: 'walk-up_1' },
				{ key: 'walk-up_2' },
				{ key: 'walk-up_3' },
				{ key: 'walk-up_4' },
				{ key: 'walk-up_5' },
				{ key: 'walk-up_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-down',
			frames: [
				{ key: 'walk-down_1' },
				{ key: 'walk-down_2' },
				{ key: 'walk-down_3' },
				{ key: 'walk-down_4' },
				{ key: 'walk-down_5' },
				{ key: 'walk-down_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-ne',
			frames: [
				{ key: 'walk-ne_1' },
				{ key: 'walk-ne_2' },
				{ key: 'walk-ne_3' },
				{ key: 'walk-ne_4' },
				{ key: 'walk-ne_5' },
				{ key: 'walk-ne_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-nw',
			frames: [
				{ key: 'walk-nw_1' },
				{ key: 'walk-nw_2' },
				{ key: 'walk-nw_3' },
				{ key: 'walk-nw_4' },
				{ key: 'walk-nw_5' },
				{ key: 'walk-nw_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-se',
			frames: [
				{ key: 'walk-se_1' },
				{ key: 'walk-se_2' },
				{ key: 'walk-se_3' },
				{ key: 'walk-se_4' },
				{ key: 'walk-se_5' },
				{ key: 'walk-se_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'walk-sw',
			frames: [
				{ key: 'walk-sw_1' },
				{ key: 'walk-sw_2' },
				{ key: 'walk-sw_3' },
				{ key: 'walk-sw_4' },
				{ key: 'walk-sw_5' },
				{ key: 'walk-sw_6' },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.player = this.scene.physics.add.sprite(250, 250, 'idle_1');
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
