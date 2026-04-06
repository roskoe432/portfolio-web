import styles from './error.module.less';

function Error({ message = 'Something went wrong', error, onRetry }) {
	const displayMessage = error?.message || message;

	return (
		<div className={styles.container}>
			<div className={styles.iconWrapper}>
				<svg
					className={styles.icon}
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
					<line
						x1="12"
						y1="8"
						x2="12"
						y2="12"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<circle
						cx="12"
						cy="16"
						r="0.5"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="1"
					/>
				</svg>
			</div>

			<h3 className={styles.title}>Error</h3>
			<p className={styles.message}>{displayMessage}</p>

			{onRetry && (
				<button className={styles.retryButton} onClick={onRetry}>
					Try Again
				</button>
			)}
		</div>
	);
}

export default Error;
