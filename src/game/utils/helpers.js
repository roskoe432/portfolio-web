export const getSceneImageLoader =
	(scene) => async (name, importPath, prefix, frameCount) => {
		for (let i = 0; i < frameCount; i++) {
			const fullPath = `${importPath}/${prefix}${String(i).padStart(3, '0')}.png`;
			let pathToImg = await import(fullPath);
			scene.load.image(`${name}_${i + 1}`, pathToImg.default);
		}
	};
