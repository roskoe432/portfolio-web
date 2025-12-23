import { useTranslation } from 'react-i18next';
import { Anchor } from '@mantine/core';
import config from '@/config';
import styles from './app-footer.module.less';

function AppFooter() {
	const { t } = useTranslation();

	return (
		<footer className={styles['app-footer']}>
			<small>
				{t('appLayout.footer.copyright', { year: new Date().getFullYear() })}
			</small>
			<Anchor
				href={config.urls.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				className={styles['linkedin-link']}
			>
				LinkedIn
			</Anchor>
		</footer>
	);
}

export default AppFooter;
