import { Modal } from 'react-overlays';
import useTutorial from './useTutorial';
import styles from './tutorial.module.less';

const content = [
	{
		message: "Welcome to Benjamin Snow's portfolio!",
	},
	{
		message:
			"Since this is your first time here, let's go through a quick tutorial on how to navigate my site.",
	},
	{
		message: 'Move the character around the scene:',
		controls: [
			{ keys: ['W', '↑'], label: 'Move Up' },
			{ keys: ['A', '←'], label: 'Move Left' },
			{ keys: ['S', '↓'], label: 'Move Down' },
			{ keys: ['D', '→'], label: 'Move Right' },
		],
	},
	{
		message: 'When you see a prompt to interact with an object, press:',
		controls: [{ keys: ['E'], label: 'Interact' }],
	},
	{
		message:
			'No idea why I decided to add this, but you can also pause the game at any time by pressing:',
		controls: [{ keys: ['P'], label: 'Pause Game' }],
	},
];

function Tutorial() {
	const { currentId, prevItem, nextItem, getCurrentItem } = useTutorial(content);
	const currentContent = getCurrentItem();

	return (
		<Modal className={styles.tutorial} show={currentContent !== null} onHide={nextItem}>
			<div className={styles.content}>
				{currentContent && <p className={styles.message}>{currentContent.message}</p>}
				{currentContent?.controls && (
					<ul className={styles.controls}>
						{currentContent.controls.map(({ keys, label }) => (
							<li key={label} className={styles.controlRow}>
								<span className={styles.keyGroup}>
									{keys.map((k) => (
										<kbd key={k} className={styles.key}>
											{k}
										</kbd>
									))}
								</span>
								<span className={styles.keyLabel}>{label}</span>
							</li>
						))}
					</ul>
				)}
				<div className={styles.footer}>
					<button
						className={styles.backBtn}
						onClick={prevItem}
						disabled={currentId === 0}
					>
						Back
					</button>
					<span className={styles.steps}>
						{currentId + 1} / {content.length}
					</span>
					<button className={styles.nextBtn} onClick={nextItem}>
						{currentId + 1 >= content.length ? "Let's Play!" : 'Next'}
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default Tutorial;
