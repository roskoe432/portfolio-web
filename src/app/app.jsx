import GameContainer from '@game/components/game-container/game-container';
import PageModal from '@/pages/page-modal/page-modal';
import styles from './app.module.less';

function App() {
	return (
		<div className={styles.app}>
			{/* The GameContainer component is responsible for rendering the Phaser game canvas and managing the game instance. */}
			<GameContainer />
			{/* The PageModal component is responsible for rendering modal content when triggered by game events. */}
			<PageModal />
		</div>
	);
}

export default App;
