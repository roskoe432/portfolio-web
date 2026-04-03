import styles from './button.module.less';

function Button({
	children,
	variant = 'filled',
	component,
	className = '',
	...props
}) {
	const variantClass = styles[`button-${variant}`];
	const Component = component || 'button';

	return (
		<Component
			className={`${styles.button} ${variantClass} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
}

export default Button;
