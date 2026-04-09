import { Modal } from 'react-overlays';
import useTutorial from './useTutorial';
import styles from './tutorial.module.less';

const content = [
	{
		message: 'Welcome to the tutorial!',
	},
	{
		message: 'This is how you use the app.',
	},
	{
		message: 'Enjoy exploring the features!',
	},
];

function Tutorial() {
	const { nextItem, getCurrentItem } = useTutorial(content);
	const CurrentContent = getCurrentItem();

	return (
		<Modal className={styles.tutorial} show={CurrentContent !== null} onHide={nextItem}>
			<div>
				{CurrentContent && <p>{CurrentContent.message}</p>}
				<button onClick={nextItem}>Next</button>
			</div>
		</Modal>
	);
}

export default Tutorial;
