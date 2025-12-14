import { Button, Paper, Text, Stack, Group } from '@mantine/core';
import useTimerMinigame from '@/pages/home/components/timer-minigame/useTimerMinigame';
import styles from './timer-minigame.module.less';

function TimerMinigame() {
	const {
		formattedTime,
		targetTime,
		result,
		gameState,
		handleStart,
		handleStop,
		handleReset,
	} = useTimerMinigame({
		speedFactor: 0.01,
	});

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
					<Text className={styles.time}>{formattedTime}</Text>
				</div>

				{result && (
					<div
						className={`${styles.result} ${result === 'win' ? styles.win : styles.lose}`}
					>
						<Text size="lg" fw={700}>
							{result === 'win' ? '🎉 Perfect!' : '💔 Try Again!'}
						</Text>
					</div>
				)}

				<Group gap="md">
					{gameState === 'idle' && (
						<Button size="lg" onClick={handleStart}>
							Start
						</Button>
					)}
					{gameState === 'running' && (
						<Button size="lg" color="red" onClick={handleStop}>
							Stop!
						</Button>
					)}
					{gameState === 'stopped' && (
						<Button size="lg" variant="light" onClick={handleReset}>
							Play Again
						</Button>
					)}
				</Group>
			</Stack>
		</Paper>
	);
}

export default TimerMinigame;
