import { useState, useRef } from 'react';

function useTimerMinigame({ targetTime = 3 }) {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [gameState, setGameState] = useState('idle'); // idle, running, stopped
	const [result, setResult] = useState(null);
	const startTimeRef = useRef(null);
	const rafIdRef = useRef(null);

	const step = (timestamp) => {
		if (!startTimeRef.current) {
			startTimeRef.current = timestamp;
		}

		const realElapsedMs = timestamp - startTimeRef.current;
		const realElapsedSeconds = realElapsedMs / 1000;

		setElapsedTime(realElapsedSeconds);

		rafIdRef.current = requestAnimationFrame(step);
	};

	const start = () => {
		setIsRunning(true);
		startTimeRef.current = null;
		rafIdRef.current = requestAnimationFrame(step);
	};

	const stop = () => {
		setIsRunning(false);
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}
	};

	const reset = () => {
		setElapsedTime(0);
		setIsRunning(false);
		startTimeRef.current = null;
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}
	};

	const checkDidWin = () => {
		const formattedElapsed = formatTime(elapsedTime);
		const formattedTarget = formatTime(targetTime);
		console.log(
			'Formatted Elapsed:',
			formattedElapsed,
			'Formatted Target:',
			formattedTarget,
		);
		return formattedElapsed === formattedTarget;
	};

	const formatTime = (seconds) => {
		const secs = Math.floor(seconds % 60);
		const ms = Math.floor((seconds % 1) * 100);
		return `${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
	};

	const handleStart = () => {
		setGameState('running');
		setResult(null);
		start();
	};

	const handleStop = () => {
		stop();
		setGameState('stopped');
		const won = checkDidWin();
		setResult(won ? 'win' : 'lose');
	};

	const handleReset = () => {
		reset();
		setGameState('idle');
		setResult(null);
	};

	return {
		isRunning,
		formattedTime: formatTime(elapsedTime),
		targetTime,
		gameState,
		result,
		handleReset,
		handleStart,
		handleStop,
		checkDidWin,
	};
}

export default useTimerMinigame;
