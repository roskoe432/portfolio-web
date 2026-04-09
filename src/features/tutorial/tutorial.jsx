import { Modal } from 'react-overlays';
import useTutorial from './useTutorial';
import styles from './tutorial.module.less';

const content = [
	{
		message: 'Welcome! Here\u2019s a quick look at the controls before you start.',
	},
	{
		message: 'Move your character around the scene:',
		controls: [
			{ keys: ['W', '↑'], label: 'Move Up' },
			{ keys: ['A', '←'], label: 'Move Left' },
			{ keys: ['S', '↓'], label: 'Move Down' },
			{ keys: ['D', '→'], label: 'Move Right' },
		],
	},
	{
		message: 'Other actions:',
		controls: [
			{ keys: ['P'], label: 'Pause' },
			{ keys: ['E'], label: 'Interact' },
		],
	},
];

function Tutorial() {
	const { currentId, nextItem, getCurrentItem } = useTutorial(content);
	const CurrentContent = getCurrentItem();

	return (
		<Modal className={styles.tutorial} show={CurrentContent !== null} onHide={nextItem}>
			<div className={styles.content}>
				{CurrentContent && <p className={styles.message}>{CurrentContent.message}</p>}
				{CurrentContent?.controls && (
					<ul className={styles.controls}>
						{CurrentContent.controls.map(({ keys, label }) => (
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
