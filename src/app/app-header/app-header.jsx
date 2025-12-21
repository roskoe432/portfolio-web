import { Burger } from '@mantine/core';
import styles from './app-header.module.less';
import { useTranslation } from 'react-i18next';

function AppHeader({ navOpened, toggleNav }) {
	const { t } = useTranslation();

	return (
		<div className={styles['header-content']}>
			<Burger
				opened={navOpened}
				onClick={toggleNav}
				hiddenFrom="sm"
				size="sm"
			/>
			<div className={styles['header-title-group']}>
				<h1 className={styles['title']}>{t('appLayout.header.title')}</h1>
				<h2 className={styles['subtitle']}>{t('appLayout.header.subtitle')}</h2>
			</div>
		</div>
	);
}

export default AppHeader;
