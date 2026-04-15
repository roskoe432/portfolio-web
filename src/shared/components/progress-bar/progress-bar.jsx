import styles from './progress-bar.module.less';

function ProgressBar({
	value = 0,
	color = 'blue',
	size = 'medium',
	label,
	animated = false,
	dark = false,
	className = '',
}) {
	const clampedValue = Math.min(1, Math.max(0, value));
	const colorClass = styles[`bar-${color}`];
	const sizeClass = styles[`track-${size}`];
	const animatedClass = animated ? styles['bar-animated'] : '';
	const darkClass = dark ? styles['track-dark'] : '';

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<div
				className={`${styles.track} ${sizeClass} ${darkClass}`}
				role="progressbar"
				aria-valuenow={clampedValue}
				aria-valuemin={0}
				aria-valuemax={1}
				aria-label={label ?? `Progress: ${Math.round(clampedValue * 100)}%`}
			>
				<div
					className={`${styles.bar} ${colorClass} ${animatedClass}`}
					style={{ width: `${clampedValue * 100}%` }}
				/>
			</div>
			{label && <span className={styles.label}>{label}</span>}
		</div>
	);
}

export default ProgressBar;
