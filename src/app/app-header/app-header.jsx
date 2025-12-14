import { Burger } from '@mantine/core';
import styles from './app-header.module.less';

function AppHeader({ navOpened, toggleNav }) {
	return (
		<div className={styles['header-content']}>
			<Burger
				opened={navOpened}
				onClick={toggleNav}
				hiddenFrom="sm"
				size="sm"
			/>
			<div className={styles['header-title']}>
				<h1 className={styles['title']}>Ben Snow&apos;s Portfolio</h1>
			</div>
		</div>
	);
}

export default AppHeader;
