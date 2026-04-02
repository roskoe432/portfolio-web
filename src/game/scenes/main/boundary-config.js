export function createBoundaries(scene, map) {
	const boundaries = [
		// Top boundary
		{
			x: map.widthInPixels / 2,
			y: 115,
			width: map.widthInPixels,
			height: 20,
		},
		// Bottom boundary
		{
			x: map.widthInPixels / 2,
			y: map.heightInPixels,
			width: map.widthInPixels,
			height: 20,
		},
		// Left-Upper boundary
		{
			x: 25,
			y: 145,
			width: 20,
			height: 285,
		},
		// Left-Lower boundary
		{
			x: 0,
			y: 385,
			width: 20,
			height: 200,
		},
		// Right-Upper boundary
		{
			x: map.widthInPixels - 25,
			y: 145,
			width: 20,
			height: 285,
		},
		// Right-Lower boundary
		{
			x: map.widthInPixels,
			y: 385,
			width: 20,
			height: 200,
		},
	];

	return boundaries.map((config) => {
		const zone = scene.add.zone(config.x, config.y, config.width, config.height);
		scene.physics.add.existing(zone, true);
		return zone;
	});
}
