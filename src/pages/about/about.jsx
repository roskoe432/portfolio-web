import { useTranslation } from 'react-i18next';

function AboutPage() {
	const { t } = useTranslation();

	return <h1>{t('common.underConstruction')}</h1>;
}

export default AboutPage;
