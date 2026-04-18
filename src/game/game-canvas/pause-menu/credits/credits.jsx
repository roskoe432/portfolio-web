import { Button } from '@shared/components';
import styles from './credits.module.less';
import { useTranslation } from 'react-i18next';
import credits from './credits-data';

function Credits({ show, onBack }) {
	const { t } = useTranslation();

	if (!show) {
		return null;
	}

	return (
		<div className={styles.credits}>
			<div className={styles.creditsHeader}>
				<h2>{t('pauseMenu.credits')}</h2>
				<Button variant="subtle" onClick={onBack}>
					{t('common.back')}
				</Button>
			</div>

			<ul className={styles.creditsList}>
				{credits.map((entry, index) => (
					<li key={index} className={styles.creditEntry}>
						<p className={styles.entryTitle}>{entry.title}</p>
						<p className={styles.entryMeta}>
							<span className={styles.label}>{t('credits.author')}</span>
							<span>{entry.author}</span>
						</p>
						<p className={styles.entryMeta}>
							<span className={styles.label}>{t('credits.category')}</span>
							<span>{entry.category}</span>
						</p>
						<p className={styles.entryMeta}>
							<span className={styles.label}>{t('credits.license')}</span>
							<a
								className={styles.link}
								href={entry.licenseUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								{entry.license}
							</a>
						</p>
						{entry.url && (
							<p className={styles.entryMeta}>
								<span className={styles.label}>{t('credits.source')}</span>
								<a
									className={styles.link}
									href={entry.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{t('credits.viewSource')}
								</a>
							</p>
						)}
						{entry.notes && <p className={styles.entryNotes}>{entry.notes}</p>}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Credits;
