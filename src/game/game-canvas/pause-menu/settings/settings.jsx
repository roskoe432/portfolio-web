import { Button, Select } from '@shared/components';
import styles from './settings.module.less';
import { useTranslation } from 'react-i18next';
import i18n from '@i18n';

function Settings({ show, onBack }) {
	const { t } = useTranslation();

	if (!show) {
		return null;
	}

	return (
		<div className={styles.settings}>
			<div className={styles.settingsHeader}>
				<h2>{t('pauseMenu.settings')}</h2>
				<Button variant="subtle" onClick={onBack}>
					{t('common.back')}
				</Button>
			</div>
			<Select
				label={t('pauseMenu.language')}
				defaultValue={i18n.getCurrentLanguage()}
				options={i18n.getAvailableLanguages()}
				onChange={(value) => i18n.changeLanguage(value)}
			/>
		</div>
	);
}

export default Settings;
