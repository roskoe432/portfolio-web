import Phaser from 'phaser';

export const createRect = (scene, options) =>
	scene.add
		.rectangle(0, 0, scene.cameras.main.width, scene.cameras.main.height, options.color)
		.setDepth(options.depth)
		.setOrigin(0)
		.setAlpha(1);

const setupRect = (
	transitionScene,
	rect,
	{ originX = 0, originY = 0, x = 0, y = 0, alpha = 1, scale = 1 } = {},
) => {
	rect.setOrigin(originX, originY);
	rect.x = x;
	rect.y = y;
	rect.width = transitionScene.cameras.main.width;
	rect.height = transitionScene.cameras.main.height;
	rect.alpha = alpha;
	rect.setScale(scale);
};

const runTween = (transitionScene, rect, tweenProps, options) =>
	new Promise((resolve) => {
		transitionScene.tweens.add({
			targets: rect,
			...tweenProps,
			duration: options.durationInSeconds * 1000,
			ease: options.ease,
			onComplete: () => {
				if (options.destroy) rect.destroy();
				resolve();
			},
		});
	});

export const fade = (transitionScene, rect, options) => {
	setupRect(transitionScene, rect, { alpha: options.reverse ? 1 : 0 });
	return runTween(transitionScene, rect, { alpha: options.reverse ? 0 : 1 }, options);
};

export const swipeDown = (transitionScene, rect, options) => {
	const { height } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, { y: options.reverse ? 0 : -height });
	return runTween(transitionScene, rect, { y: options.reverse ? -height : 0 }, options);
};

export const swipeLeft = (transitionScene, rect, options) => {
	const { width } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, { x: options.reverse ? 0 : width });
	return runTween(transitionScene, rect, { x: options.reverse ? width : 0 }, options);
};

export const swipeUp = (transitionScene, rect, options) => {
	const { height } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, { y: options.reverse ? 0 : height });
	return runTween(transitionScene, rect, { y: options.reverse ? height : 0 }, options);
};

export const swipeRight = (transitionScene, rect, options) => {
	const { width } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, { x: options.reverse ? 0 : -width });
	return runTween(transitionScene, rect, { x: options.reverse ? -width : 0 }, options);
};

export const growFromTopLeft = (transitionScene, rect, options) => {
	setupRect(transitionScene, rect, { scale: options.reverse ? 1 : 0 });
	return runTween(transitionScene, rect, { scale: options.reverse ? 0 : 1 }, options);
};

export const growFromTopRight = (transitionScene, rect, options) => {
	const { width } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, { originX: 1, x: width, scale: options.reverse ? 1 : 0 });
	return runTween(transitionScene, rect, { scale: options.reverse ? 0 : 1 }, options);
};

export const growFromBottomLeft = (transitionScene, rect, options) => {
	const { height } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, { originY: 1, y: height, scale: options.reverse ? 1 : 0 });
	return runTween(transitionScene, rect, { scale: options.reverse ? 0 : 1 }, options);
};

export const growFromBottomRight = (transitionScene, rect, options) => {
	const { width, height } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, {
		originX: 1,
		originY: 1,
		x: width,
		y: height,
		scale: options.reverse ? 1 : 0,
	});
	return runTween(transitionScene, rect, { scale: options.reverse ? 0 : 1 }, options);
};

export const growFromCenter = (transitionScene, rect, options) => {
	const { width, height } = transitionScene.cameras.main;
	setupRect(transitionScene, rect, {
		originX: 0.5,
		originY: 0.5,
		x: width / 2,
		y: height / 2,
		scale: options.reverse ? 1 : 0,
	});
	return runTween(transitionScene, rect, { scale: options.reverse ? 0 : 1 }, options);
};

export const TransitionKey = {
	fadeIn: 'fadeIn',
	fadeOut: 'fadeOut',
	swipeDownStart: 'swipeDownStart',
	swipeDownEnd: 'swipeDownEnd',
	swipeLeftStart: 'swipeLeftStart',
	swipeLeftEnd: 'swipeLeftEnd',
	swipeUpStart: 'swipeUpStart',
	swipeUpEnd: 'swipeUpEnd',
	swipeRightStart: 'swipeRightStart',
	swipeRightEnd: 'swipeRightEnd',
	growFromTopLeftStart: 'growFromTopLeftStart',
	growFromTopLeftEnd: 'growFromTopLeftEnd',
	growFromTopRightStart: 'growFromTopRightStart',
	growFromTopRightEnd: 'growFromTopRightEnd',
	growFromBottomLeftStart: 'growFromBottomLeftStart',
	growFromBottomLeftEnd: 'growFromBottomLeftEnd',
	growFromBottomRightStart: 'growFromBottomRightStart',
	growFromBottomRightEnd: 'growFromBottomRightEnd',
	growFromCenterStart: 'growFromCenterStart',
	growFromCenterEnd: 'growFromCenterEnd',
};

const transitions = {
	[TransitionKey.fadeIn]: fade,
	[TransitionKey.fadeOut]: (transitionScene, rect, options) =>
		fade(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.swipeDownStart]: swipeDown,
	[TransitionKey.swipeDownEnd]: (transitionScene, rect, options) =>
		swipeDown(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.swipeLeftStart]: swipeLeft,
	[TransitionKey.swipeLeftEnd]: (transitionScene, rect, options) =>
		swipeLeft(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.swipeUpStart]: swipeUp,
	[TransitionKey.swipeUpEnd]: (transitionScene, rect, options) =>
		swipeUp(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.swipeRightStart]: swipeRight,
	[TransitionKey.swipeRightEnd]: (transitionScene, rect, options) =>
		swipeRight(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.growFromTopLeftStart]: growFromTopLeft,
	[TransitionKey.growFromTopLeftEnd]: (transitionScene, rect, options) =>
		growFromTopLeft(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.growFromTopRightStart]: growFromTopRight,
	[TransitionKey.growFromTopRightEnd]: (transitionScene, rect, options) =>
		growFromTopRight(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.growFromBottomLeftStart]: growFromBottomLeft,
	[TransitionKey.growFromBottomLeftEnd]: (transitionScene, rect, options) =>
		growFromBottomLeft(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.growFromBottomRightStart]: growFromBottomRight,
	[TransitionKey.growFromBottomRightEnd]: (transitionScene, rect, options) =>
		growFromBottomRight(transitionScene, rect, { ...options, reverse: true, destroy: true }),
	[TransitionKey.growFromCenterStart]: growFromCenter,
	[TransitionKey.growFromCenterEnd]: (transitionScene, rect, options) =>
		growFromCenter(transitionScene, rect, { ...options, reverse: true, destroy: true }),
};

export const doSceneTransition = async (
	transitionScene,
	targetSceneKey,
	startTransitionKey,
	endTransitionKey,
	options,
) => {
	if (!transitions[startTransitionKey] || !transitions[endTransitionKey]) {
		throw new Error('Invalid transition key(s) provided');
	}
	const rect = createRect(transitionScene, { color: options.color ?? 0x000000, depth: 100 });

	await transitions[startTransitionKey](transitionScene, rect, { ...options, destroy: false });
	transitionScene.scene.launch(targetSceneKey);
	transitionScene.scene.bringToTop();
	await transitions[endTransitionKey](transitionScene, rect, {
		...options,
	});
};

export class TransitionScene extends Phaser.Scene {
	transitionData = null;
	requiredDataKeys = ['targetSceneKey', 'startTransitionKey', 'endTransitionKey'];
	constructor() {
		super('Transition');
	}

	validateData(data) {
		const missingKeys = this.requiredDataKeys.filter((key) => !(key in data));
		if (missingKeys.length > 0) {
			throw new Error(`Missing required data keys: ${missingKeys.join(', ')}`);
		}
	}

	init(data) {
		this.validateData(data);
		this.transitionData = data;
	}

	preload() {}

	async create() {
		await doSceneTransition(
			this,
			this.transitionData.targetSceneKey,
			this.transitionData.startTransitionKey,
			this.transitionData.endTransitionKey,
			this.transitionData.options,
		);
		this.scene.stop();
	}
}

export const transitionTo = (
	callerScene,
	targetSceneKey,
	startTransitionKey,
	endTransitionKey,
	options,
	transitionSceneKey = 'Transition',
) => {
	callerScene.scene.launch(transitionSceneKey, {
		targetSceneKey,
		startTransitionKey,
		endTransitionKey,
		options,
	});
};

export default transitions;
