import { Button, Paper, Text, Stack, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import useTimerMinigame from '@/pages/home/components/timer-minigame/useTimerMinigame';
import styles from './timer-minigame.module.less';

function TimerMinigame() {
	const { t } = useTranslation();
	const {
		formattedTime,
		targetTime,
		// result,
		isIdleState,
		isRunningState,
		isStoppedState,
		didWin,
		handleStart,
		handleStop,
		handleReset,
	} = useTimerMinigame();

	return (
		<Paper className={styles.container} shadow="md" p="xl" radius="md">
			<Stack align="center" gap="lg">
				<Text className={styles.title} size="xl" fw={700}>
					{t('timerMinigame.title')}
				</Text>

				<Text size="sm" c="dimmed" ta="center">
					{t('timerMinigame.instructions')}{' '}
					<Text span fw={700} c="blue">
						{t('timerMinigame.targetTime', { time: targetTime })}
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
							{t('timerMinigame.buttons.start')}
						</Button>
					)}
					{isRunningState() && (
						<Button size="lg" color="red" onClick={handleStop}>
							{t('timerMinigame.buttons.stop')}
						</Button>
					)}
					{isStoppedState() && (
						<Button size="lg" variant="light" onClick={handleReset}>
							{t('timerMinigame.buttons.tryAgain')}
						</Button>
					)}
				</Group>

				{didWin() && (
					<div className={`${styles.result} ${styles.win}`}>
						<Text size="lg" fw={700}>
							{t('timerMinigame.result.perfect')}
						</Text>
					</div>
				)}
			</Stack>
		</Paper>
	);
}

export default TimerMinigame;
