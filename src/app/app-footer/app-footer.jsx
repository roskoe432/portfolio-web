import { useTranslation } from 'react-i18next';

function AppFooter() {
	const { t } = useTranslation();

	return (
		<footer>
			{t('appLayout.footer.copyright', { year: new Date().getFullYear() })}
		</footer>
	);
}

export default AppFooter;
