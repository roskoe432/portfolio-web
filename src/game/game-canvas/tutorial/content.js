const getTutorialContent = (t) => [
	{
		message: t('tutorial.steps.welcome'),
	},
	{
		message: t('tutorial.steps.intro'),
	},
	{
		message: t('tutorial.steps.moveCharacter'),
		controls: [
			{ keys: ['W', '↑'], label: t('tutorial.controls.moveUp') },
			{ keys: ['A', '←'], label: t('tutorial.controls.moveLeft') },
			{ keys: ['S', '↓'], label: t('tutorial.controls.moveDown') },
			{ keys: ['D', '→'], label: t('tutorial.controls.moveRight') },
		],
	},
	{
		message: t('tutorial.steps.interact'),
		controls: [{ keys: ['E'], label: t('tutorial.controls.interact') }],
	},
	{
		message: t('tutorial.steps.pause'),
		controls: [{ keys: ['P'], label: t('tutorial.controls.pauseGame') }],
	},
];

export default getTutorialContent;
