import { useEffect } from 'react';
import { createGame, destroyGame } from '@game/game-config';
import styles from './game-container.module.less';

if (import.meta.hot) {
	import.meta.hot.accept(() => {
		window.location.reload();
	});
}

function GameContainer(props) {
	useEffect(() => {
		createGame(false);

		return () => {
			destroyGame();
		};
	}, []);

	return (
		<div id="game-container" className={styles.gameContainer}>
			{/* Phaser game will be injected here */}
			{props.children}
		</div>
	);
}

export default GameContainer;
