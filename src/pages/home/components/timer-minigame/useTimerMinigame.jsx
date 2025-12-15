import { useState, useRef } from 'react';

const GameState = {
	IDLE: 'idle',
	RUNNING: 'running',
	STOPPED: 'stopped',
};

const WinStatus = {
	WIN: 'win',
	LOSE: 'lose',
};

function useTimerMinigame({ targetTime = 3 } = {}) {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [currentGameState, setCurrentGameState] = useState(GameState.IDLE);
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

	const formatTime = (seconds) => {
		const secs = Math.floor(seconds % 60);
		const ms = Math.floor((seconds % 1) * 100);
		return `${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
	};

	const handleStart = () => {
		setCurrentGameState(GameState.RUNNING);
		setResult(null);
		startTimeRef.current = null;
		rafIdRef.current = requestAnimationFrame(step);
	};

	const handleStop = () => {
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}
		setCurrentGameState(GameState.STOPPED);
		const won = formatTime(elapsedTime) === formatTime(targetTime);
		setResult(won ? WinStatus.WIN : WinStatus.LOSE);
	};

	const handleReset = () => {
		startTimeRef.current = null;
		if (rafIdRef.current) {
			cancelAnimationFrame(rafIdRef.current);
		}
		setElapsedTime(0);
		setCurrentGameState(GameState.IDLE);
		setResult(null);
	};

	const isIdleState = () => currentGameState === GameState.IDLE;
	const isRunningState = () => currentGameState === GameState.RUNNING;
	const isStoppedState = () => currentGameState === GameState.STOPPED;
	const didWin = () => result === WinStatus.WIN;

	return {
		formattedTime: formatTime(elapsedTime),
		targetTime,
		result,
		didWin,
		isIdleState,
		isRunningState,
		isStoppedState,
		handleReset,
		handleStart,
		handleStop,
	};
}

export default useTimerMinigame;
