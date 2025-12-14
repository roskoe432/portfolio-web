import TimerMinigame from './components/timer-minigame/timer-minigame';

function HomePage() {
	return (
		<div>
			<h1>Home Page</h1>
			<TimerMinigame targetTime={10} />
		</div>
	);
}

export default HomePage;
