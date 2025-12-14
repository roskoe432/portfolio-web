import { Routes, Route, Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import { Suspense } from 'react';
import pages from '@pages';
import styles from './app-navigation.module.less';

export function AppRoutes() {
	const createPageRoutes = () =>
		Object.keys(pages).map((key) => {
			const PageComponent = pages[key].entry;
			return (
				<Route key={key} path={pages[key].path} element={<PageComponent />} />
			);
		});

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>{createPageRoutes()}</Routes>
		</Suspense>
	);
}

export function AppLinks() {
	const createLinks = () =>
		Object.keys(pages).map((key) => (
			<NavLink
				className={styles['nav-link']}
				key={key}
				label={pages[key].name}
				to={pages[key].path}
				component={Link}
			/>
		));

	return <nav className={styles['app-navigation']}>{createLinks()}</nav>;
}

export default AppRoutes;
