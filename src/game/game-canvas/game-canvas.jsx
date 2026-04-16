import PauseMenu from './pause-menu/pause-menu';
import LoadingScreen from './loading-screen/loading-screen';
import Tutorial from './tutorial/tutorial';

function GameCanvas() {
	return (
		<div className="gameCanvas">
			<Tutorial />
			<LoadingScreen />
			<PauseMenu />
		</div>
	);
}

export default GameCanvas;
