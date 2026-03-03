import { useEffect } from 'react';
import { createConfig } from '../config';
import styles from './game-container.module.less';

function GameContainer(props) {
	useEffect(() => {
		createConfig();
	}, []);

	return (
		<div id="game-container" className={styles['game-container']}>
			{/* Phaser game will be injected here */}
			{props.children}
		</div>
	);
}

export default GameContainer;
