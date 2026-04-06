import { Routes, Route, NavLink } from 'react-router';
import { Suspense } from 'react';
import pages from '@pages';
import { useTranslation } from 'react-i18next';
import CustomLoader from '@/shared/components/custom-loader/custom-loader';
import styles from './app-navigation.module.less';

export function AppRoutes() {
	const { t } = useTranslation();
	const createPageRoutes = () =>
		Object.keys(pages)
			.filter((key) => !pages[key].disabled)
			.map((key) => {
				const PageComponent = pages[key].entry;
				return (
					<Route
						key={key}
						path={key}
						element={
							<div>
								<h1 className={styles.pageTitle}>{t(pages[key].translationKey)}</h1>
								<PageComponent />
							</div>
						}
					/>
				);
			});

	return (
		<Suspense fallback={<CustomLoader />}>
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
			.filter((key) => !pages[key].disabled && pages[key].createNavLink !== false)
			.map((key) => (
				<NavLink className={styles['nav-link']} key={key} to={key}>
					{t(pages[key].translationKey)}
				</NavLink>
			));

	return <div className={styles['app-navigation']}>{createLinks()}</div>;
}

export default AppRoutes;
