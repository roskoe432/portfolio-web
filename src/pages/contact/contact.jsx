import { useTranslation } from 'react-i18next';

function ContactPage() {
	const { t } = useTranslation();

	return <h1>{t('pages.contact.title')}</h1>;
}

export default ContactPage;
