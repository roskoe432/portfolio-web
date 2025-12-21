import { useTranslation, Trans } from 'react-i18next';
import config from '@/config';
import styles from './about.module.less';

function AboutPage() {
	const { t } = useTranslation();

	return (
		<div className={styles['about']}>
			<h1 className={styles['title']}>{t('pages.about.title')}</h1>
			<p>{t('pages.about.zeldaParagraph')}</p>
			<p>
				<Trans
					i18nKey="pages.about.perlenspielParagraph"
					components={{
						perlenspielLink: (
							<a
								href={config.urls.perlenspiel}
								target="_blank"
								rel="noopener noreferrer"
							>
								Perlenspiel
							</a>
						),
					}}
				></Trans>
			</p>
			<p>
				<Trans
					i18nKey="pages.about.quoteParagraph"
					components={{
						quoteStyle: <i />,
					}}
				></Trans>
			</p>
			{/* Commented out until I host perlenspiel mini game */}
			{/* <p>{t('pages.about.introToMiniLevelParagraph')}</p> */}
		</div>
	);
}

export default AboutPage;
