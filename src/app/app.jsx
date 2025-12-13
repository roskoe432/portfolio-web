import Counter from '@/examples/counter/counter';
import styles from './app.module.less';
import Logo from '@/shared/components/logo/logo';
import NodeLogo from '@shared/assets/images/nodejs-logo.svg';

console.log(NodeLogo)

function App() {
	return (
		<div className={styles.app}>
            <h1>Ben Snow's Portfolio</h1>
			<Logo logo={NodeLogo}/>
            <Counter />
		</div>
	);
}

export default App;
