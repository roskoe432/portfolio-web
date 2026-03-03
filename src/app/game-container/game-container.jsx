import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import ExampleScene from '../../game/scenes/main/main.scene';
import styles from './game-container.module.less';

function GameContainer(props) {
	const gameRef = useRef(null);

	useEffect(() => {
		// Prevent creating multiple game instances
		if (gameRef.current) return;

		const config = {
			type: Phaser.AUTO,
			title: 'Overlord Rising',
			description: '',
			parent: 'game-container',
			width: 1280,
			height: 720,
			backgroundColor: '#000000',
			pixelArt: false,
			scene: [ExampleScene],
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 300 },
					debug: false,
				},
			},
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
				width: 1280,
				height: 720,
				autoRound: true,
			},
		};

		gameRef.current = new Phaser.Game(config);

		// Cleanup on unmount
		return () => {
			if (gameRef.current) {
				gameRef.current.destroy(true);
				gameRef.current = null;
			}
		};
	}, []);

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
