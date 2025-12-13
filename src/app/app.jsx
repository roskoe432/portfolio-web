import styles from './app.module.less';
import Logo from '@/shared/components/logo/logo';

function App() {
	return (
		<div className={styles.app}>
            <h1>Ben Snow's Portfolio</h1>
			<Logo />
		</div>
	);
}

export default App;
