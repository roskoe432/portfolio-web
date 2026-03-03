export const getSceneImageAnimLoader = (scene, imagesConfig) => () => {
	const animationLoaders = [];
	Object.keys(imagesConfig).forEach((key) => {
		const config = imagesConfig[key];
		if (!config.anim) {
			scene.load.image(config.name, config.path);
			console.log(`Loaded image: ${config.name} from ${config.path}`);
			return;
		}

		const animCreateFrames = [];
		for (let i = 0; i < config.anim.frames; i++) {
			const imageKey = `${config.name}_${i}`;
			const imagePath = `${config.path}/${config.anim.prefix}${i}.png`;
			console.log(`Loading image: ${imageKey} from ${imagePath}`);
			scene.load.image(imageKey, imagePath);
			console.log(`Loaded image: ${imageKey} from ${imagePath}`);
			animCreateFrames.push({ key: imageKey });
		}

		animationLoaders.push(() => {
			scene.anims.create({
				key: config.name,
				frames: animCreateFrames,
				frameRate: config.anim.frameRate,
				repeat: config.anim.repeat,
			});
		});
	});
	return () => animationLoaders.forEach((loader) => loader());
};
