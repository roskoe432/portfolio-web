import styles from './external-link.module.less';

function ExternalLink({ href, children, ...props }) {
	return (
		<a
			className={styles['external-link']}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		>
			{children}
		</a>
	);
}

export default ExternalLink;
