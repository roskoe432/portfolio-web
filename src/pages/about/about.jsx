import { useTranslation, Trans } from 'react-i18next';
import config from '@/config';
import styles from './about.module.less';
import ExternalLink from '@/shared/components/link/external-link';

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
			<p className={styles['mini-level-intro']}>
				{t('pages.about.introToMiniLevelParagraph')}
			</p>
			<ExternalLink href={config.urls.github}>
				{t('pages.about.sourceCodeLinkText')}
			</ExternalLink>
			<ExternalLink href="Benjamin_Snow_Resume.pdf" download>
				{t('pages.resume.resume')}
			</ExternalLink>
			<iframe
				title="Mini Level"
				className={styles['mini-level-iframe']}
				src="./ps3/index.html"
				frameBorder="0"
				allow="fullscreen; vr; vrhmd; gyroscope; accelerometer"
			></iframe>
		</div>
	);
}

export default AboutPage;
