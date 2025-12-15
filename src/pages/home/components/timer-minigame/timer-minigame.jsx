import { Button, Paper, Text, Stack, Group } from '@mantine/core';
import useTimerMinigame from '@/pages/home/components/timer-minigame/useTimerMinigame';
import styles from './timer-minigame.module.less';

function TimerMinigame() {
	const {
		formattedTime,
		targetTime,
		// result,
		isIdleState,
		isRunningState,
		isStoppedState,
		// didWin,
		handleStart,
		handleStop,
		handleReset,
	} = useTimerMinigame();

	return (
		<Paper className={styles.container} shadow="md" p="xl" radius="md">
			<Stack align="center" gap="lg">
				<Text className={styles.title} size="xl" fw={700}>
					⏱️ Postman Challenge
				</Text>

				<Text size="sm" c="dimmed" ta="center">
					Stop the timer at exactly{' '}
					<Text span fw={700} c="blue">
						{targetTime}.00 seconds
					</Text>
				</Text>

				<div className={styles.timerDisplay}>
					<Text role="timer" className={styles.time}>
						{formattedTime}
					</Text>
				</div>

				<Group gap="md">
					{isIdleState() && (
						<Button size="lg" onClick={handleStart}>
							Start
						</Button>
					)}
					{isRunningState() && (
						<Button size="lg" color="red" onClick={handleStop}>
							Stop!
						</Button>
					)}
					{isStoppedState() && (
						<Button size="lg" variant="light" onClick={handleReset}>
							Try Again
						</Button>
					)}
				</Group>

				{/* {result && (
					<div
						className={`${styles.result} ${didWin() ? styles.win : styles.lose}`}
					>
						<Text size="lg" fw={700}>
							{didWin() ? '🎉 Perfect!' : 'Try Again!'}
						</Text>
					</div>
				)} */}
			</Stack>
		</Paper>
	);
}

export default TimerMinigame;
