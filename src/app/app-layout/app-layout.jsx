import styles from './app-layout.module.less';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AppRoutes, { AppLinks } from '../app-navigation/app-navigation';
import AppHeader from '../app-header/app-header';
import AppFooter from '../app-footer/app-footer';

function AppLayout({ showFooter = true }) {
	const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 140 }}
			navbar={{
				width: { base: 200, sm: 250 },
				breakpoint: 'sm',
				collapsed: { mobile: !navOpened },
			}}
			footer={{ height: 60 }}
			padding={{ base: 'md', sm: 'lg', md: 'xl' }}
			classNames={{
				root: styles['app-layout'],
				header: styles['header'],
				navbar: styles['nav-bar'],
				main: styles['main'],
				footer: styles['footer'],
			}}
		>
			<AppShell.Header>
				<AppHeader navOpened={navOpened} toggleNav={toggleNav} />
			</AppShell.Header>
			<AppShell.Navbar p="md" onClick={closeNav}>
				<AppLinks />
			</AppShell.Navbar>
			<AppShell.Main>
				<AppRoutes />
			</AppShell.Main>
			{showFooter && (
				<AppShell.Footer>
					<AppFooter />
				</AppShell.Footer>
			)}
		</AppShell>
	);
}

export default AppLayout;
