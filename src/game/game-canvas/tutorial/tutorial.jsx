import { useTranslation } from 'react-i18next';
import { Modal } from 'react-overlays';
import useTutorial from './useTutorial';
import styles from './tutorial.module.less';
import getTutorialContent from './content';
import { useDisableGameInput } from '@game/hooks/event.hooks';

function Tutorial() {
	const { t } = useTranslation();
	const content = getTutorialContent(t);
	const { currentId, prevItem, nextItem, getCurrentItem } =
		useTutorial(content);
	const currentContent = getCurrentItem();

	const tutorialActive = currentContent !== null;

	useDisableGameInput({ active: tutorialActive });

	return (
		<Modal className={styles.tutorial} show={tutorialActive} onHide={nextItem}>
			<div className={styles.content}>
				{currentContent && (
					<p className={styles.message}>{currentContent.message}</p>
				)}
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
						{t('tutorial.buttons.back')}
					</button>
					<span className={styles.steps}>
						{currentId + 1} / {content.length}
					</span>
					<button className={styles.nextBtn} onClick={nextItem}>
						{currentId + 1 >= content.length
							? t('tutorial.buttons.letsPlay')
							: t('tutorial.buttons.next')}
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default Tutorial;
