import config from '@/config';
import styles from './links.module.less';

function LinksPage() {
	return (
		<div className={styles['links']}>
			<h1 className={styles['title']}>Links</h1>
			<a
				className={styles['external-link']}
				href={config.linkedInUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				LinkedIn
			</a>
			<a
				className={styles['external-link']}
				href={config.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				View Source on GitHub
			</a>
		</div>
	);
}

export default LinksPage;
