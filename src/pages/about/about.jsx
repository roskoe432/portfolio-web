import { useTranslation } from 'react-i18next';

function AboutPage() {
	const { t } = useTranslation();

	return <h1>{t('pages.about.title')}</h1>;
}

export default AboutPage;
