export const imagesConfig = [
	{
		name: 'computerDesk',
		path: '/assets/images/first-cpu-desk.png',
	},
	{
		name: 'officeTileset',
		path: '/assets/images/office-tileset.png',
	},
	{
		name: 'idle',
		path: '/assets/images/animations/idle',
		anim: {
			frames: 4,
			frameRate: 8,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-right',
		path: '/assets/images/animations/walk/east',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-left',
		path: '/assets/images/animations/walk/west',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-up',
		path: '/assets/images/animations/walk/north',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-down',
		path: '/assets/images/animations/walk/south',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-nw',
		path: '/assets/images/animations/walk/northwest',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-ne',
		path: '/assets/images/animations/walk/northeast',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-sw',
		path: '/assets/images/animations/walk/southwest',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
	{
		name: 'walk-se',
		path: '/assets/images/animations/walk/southeast',
		anim: {
			frames: 6,
			frameRate: 10,
			repeat: -1,
			prefix: 'frame_',
		},
	},
];

const getSceneImageAnimLoader = (scene) => () => {
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

export default getSceneImageAnimLoader;
