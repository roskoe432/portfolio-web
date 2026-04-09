import styles from './logo.module.less';

function Logo({ logo }) {
	return (
		<div className={styles.logoContainer}>
			<img src={logo} alt="Logo" className={styles.logo} />
		</div>
	);
}

export default Logo;
