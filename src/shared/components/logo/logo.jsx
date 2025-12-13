import reactLogo from '@shared/assets/images/react-logo.svg';
import styles from './logo.module.less';

function Logo({ logo }) {
  return (
    <div className={styles.logoContainer}>
      <img src={logo || reactLogo} alt="Logo" className={styles.logo} />
    </div>
  )
}

export default Logo
