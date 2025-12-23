import styles from './external-link.module.less';

function ExternalLink({ href, children }) {
	return (
		<a
			className={styles['external-link']}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
}

export default ExternalLink;
