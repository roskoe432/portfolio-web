import Counter from '@/examples/counter/counter';
import styles from './app.module.less';
import Logo from '@/shared/components/logo/logo';
import NodeLogo from '@shared/assets/images/nodejs-logo.svg';
import { AppRoutes, AppLinks } from './app-navigation';

console.log(NodeLogo);

function App() {
	return (
		<div className={styles.app}>
			<h1>Ben Snow&apos;s Portfolio</h1>
			<AppLinks />
			<Logo logo={NodeLogo} />
			<Counter />
			<AppRoutes />
		</div>
	);
}

export default App;
