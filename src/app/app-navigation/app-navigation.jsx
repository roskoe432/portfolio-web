import { Routes, Route } from 'react-router';
import { Suspense } from 'react';
import pages from '@pages';
import { useTranslation } from 'react-i18next';
import CustomLoader from '@shared/components/custom-loader/custom-loader';
import styles from './app-navigation.module.less';

export function AppRoutes(props) {
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
								<h1 className={styles.pageTitle}>
									{t(pages[key].translationKey)}
								</h1>
								<PageComponent {...props} />
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

export default AppRoutes;
