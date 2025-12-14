import { Routes, Route, Link } from 'react-router-dom';
import { Suspense } from 'react';
import Pages from '@pages';
import styles from './app-navigation.module.less';

export function AppRoutes() {
	const createPageRoutes = () =>
		Object.keys(Pages).map((key) => {
			const PageComponent = Pages[key].entry;
			return <Route key={key} path={Pages[key].path} element={<PageComponent />} />;
		});

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>{createPageRoutes()}</Routes>
		</Suspense>
	);
}

export function AppLinks() {
	const createLinks = () =>
		Object.keys(Pages).map((key) => {
			return (
				<Link key={key} to={Pages[key].path}>
					{Pages[key].name}
				</Link>
			);
		});

	return <nav className={styles['nav-links']}>{createLinks()}</nav>;
}

export default AppRoutes;
