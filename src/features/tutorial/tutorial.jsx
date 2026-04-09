import { Modal } from 'react-overlays';
import useTutorial from './useTutorial';
import styles from './tutorial.module.less';

const content = [
	{
		key: 1,
		message: 'Welcome to the tutorial!',
	},
	{
		key: 2,
		message: 'This is how you use the app.',
	},
	{
		key: 3,
		message: 'Enjoy exploring the features!',
	},
];

function Tutorial() {
	const { nextItem, getCurrentItem } = useTutorial(content);
	const CurrentContent = getCurrentItem();
	console.log('CurrentContent:', CurrentContent);

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
