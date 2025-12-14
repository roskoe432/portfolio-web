import styles from './app-layout.module.less';
import { AppShell } from '@mantine/core';
import AppRoutes, { AppLinks } from '../app-navigation/app-navigation';
import AppHeader from '../app-header/app-header';

function AppLayout({ showFooter = false }) {
	return (
		<AppShell
			header={{ height: 100 }}
			navbar={{ width: 250, breakpoint: 'sm' }}
			padding="md"
			classNames={{
				root: styles['app-layout'],
				header: styles.header,
			}}
		>
			<AppShell.Header>
				<AppHeader />
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<AppLinks />
			</AppShell.Navbar>
			<AppShell.Main>
				<AppRoutes />
			</AppShell.Main>
			{showFooter && (
				<AppShell.Footer height={60} p="md">
					© {new Date().getFullYear()} Ben Snow. All rights reserved.
				</AppShell.Footer>
			)}
		</AppShell>
	);
}

export default AppLayout;
