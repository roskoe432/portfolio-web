import '../../game';
import styles from './game-container.module.less';

function GameContainer(props) {
	return (
		<div
			id="game-container"
			className={styles['game-container']}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: -1,
			}}
		>
			{/* Phaser game will be injected here */}
			{props.children}
		</div>
	);
}

export default GameContainer;
