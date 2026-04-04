function createBoundaries(scene, map) {
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
			y: map.heightInPixels - 15,
			width: map.widthInPixels,
			height: 20,
		},
		// Left-Upper boundary
		{
			x: 22,
			y: 113,
			width: 32,
			height: 215,
		},
		// Left-Lower boundary
		{
			x: 0,
			y: 340,
			width: 10,
			height: 250,
		},
		// Right-Upper boundary
		{
			x: map.widthInPixels - 25,
			y: 113,
			width: 20,
			height: 215,
		},
		// Right-Lower boundary
		{
			x: map.widthInPixels,
			y: 340,
			width: 20,
			height: 250,
		},
	];

	return boundaries.map((config) => {
		const zone = scene.add.zone(config.x, config.y, config.width, config.height);
		scene.physics.add.existing(zone, true);
		return zone;
	});
}

export default createBoundaries;
