import TimerMinigame from './components/timer-minigame/timer-minigame';

function HomePage() {
	return (
		<div>
			<TimerMinigame targetTime={10} />
		</div>
	);
}

export default HomePage;
