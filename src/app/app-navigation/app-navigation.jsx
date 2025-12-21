import { Routes, Route, Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import { Suspense } from 'react';
import pages from '@pages';
import { useTranslation } from 'react-i18next';
import styles from './app-navigation.module.less';

export function AppRoutes() {
	const { t } = useTranslation();

	const createPageRoutes = () =>
		Object.keys(pages)
			.filter((key) => !pages[key].disabled)
			.map((key) => {
				const PageComponent = pages[key].entry;
				return <Route key={key} path={key} element={<PageComponent />} />;
			});

	return (
		<Suspense fallback={<div>{t('common.loading')}</div>}>
			<div className={styles['app-routes-wrapper']}>
				<Routes>{createPageRoutes()}</Routes>
			</div>
		</Suspense>
	);
}

export function AppLinks() {
	const { t } = useTranslation();

	const createLinks = () =>
		Object.keys(pages)
			.filter((key) => !pages[key].disabled)
			.map((key) => (
				<NavLink
					className={styles['nav-link']}
					key={key}
					label={t(pages[key].translationKey)}
					to={key}
					component={Link}
				/>
			));

	return <div className={styles['app-navigation']}>{createLinks()}</div>;
}

export default AppRoutes;
