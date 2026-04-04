import Vec from '../lib/vector';

const GameObject = (() => {
	function GameObject(scene, config) {
		this.scene = scene;
		this.config = config;

		// Create the sprite
		this.sprite = scene.physics.add.image(config.position.x, config.position.y, config.spriteKey);

		// Configure the physics body
		if (config.body.size) {
			this.sprite.body.setSize(config.body.size.x, config.body.size.y, true);
		}

		// Set immovable based on config, defaulting to false
		this.sprite.body.setImmovable(config.body.isStatic || false);
		this.sprite.setScale(config.body.scale || 1);

		// Set depth if provided
		if (config.depth) {
			this.sprite.setDepth(config.depth || 1);
		}

		// Configure body offset if provided
		if (config.body.offset) {
			const offsetX =
				config.body.offset.x ??
				(this.sprite.width - (config.body.size?.x || this.sprite.width)) / 2;

			const offsetY =
				config.body.offset.y ??
				(this.sprite.height - (config.body.size?.y || this.sprite.height)) / 2;

			this.sprite.body.setOffset(offsetX, offsetY);
		}

		// Refresh body if size or offset was set
		if (config.body.size || config.body.offset) {
			this.sprite.refreshBody();
		}

		this.getCollider = () => this.sprite;
	}

	GameObject.factory = (scene, config, positions) => {
		const objs = [];
		positions.forEach((pos) => {
			const objConfig = {
				...config,
				position: new Vec(pos.x, pos.y),
			};
			objs.push(new GameObject(scene, objConfig).getCollider());
		});
		return objs;
	};

	return GameObject;
})();

export default GameObject;
