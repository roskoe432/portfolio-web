import reactLogo from '@shared/assets/images/react-logo.svg';
import styles from './logo.module.less';

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={reactLogo} alt="React Logo" className={styles.logo} />
    </div>
  )
}

export default Logo
