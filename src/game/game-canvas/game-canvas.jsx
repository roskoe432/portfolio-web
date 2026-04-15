import PauseMenu from './pause-menu/pause-menu';
import LoadingScreen from './loading-screen/loading-screen';

function GameCanvas() {
	return (
		<div className="gameCanvas">
			<LoadingScreen />
			<PauseMenu />
		</div>
	);
}

export default GameCanvas;
