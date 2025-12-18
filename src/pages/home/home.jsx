import { useTranslation } from 'react-i18next';
import TimerMinigame from './components/timer-minigame/timer-minigame';

function HomePage() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('pages.home.title')}</h1>
			<TimerMinigame targetTime={10} />
		</div>
	);
}

export default HomePage;
