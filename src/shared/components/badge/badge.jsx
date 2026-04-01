import styles from './badge.module.less';

function Badge({
	children,
	color = 'gray',
	variant = 'light',
	className = '',
}) {
	const colorClass = styles[`badge-${color}`];
	const variantClass = styles[`badge-${variant}`];

	return (
		<span
			className={`${styles.badge} ${colorClass} ${variantClass} ${className}`}
		>
			{children}
		</span>
	);
}

export default Badge;
