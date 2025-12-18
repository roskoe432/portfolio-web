import { Routes, Route, Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import { Suspense } from 'react';
import pages from '@pages';
import { useTranslation } from 'react-i18next';
import styles from './app-navigation.module.less';

export function AppRoutes() {
	const { t } = useTranslation();

	const createPageRoutes = () =>
		Object.keys(pages).map((key) => {
			const PageComponent = pages[key].entry;
			return (
				<Route key={key} path={pages[key].path} element={<PageComponent />} />
			);
		});

	return (
		<Suspense fallback={<div>{t('common.loading')}</div>}>
			<Routes>{createPageRoutes()}</Routes>
		</Suspense>
	);
}

export function AppLinks() {
	const { t } = useTranslation();

	const createLinks = () =>
		Object.keys(pages).map((key) => (
			<NavLink
				className={styles['nav-link']}
				key={key}
				label={t(pages[key].translationKey)}
				to={pages[key].path}
				component={Link}
			/>
		));

	return <nav className={styles['app-navigation']}>{createLinks()}</nav>;
}

export default AppRoutes;
