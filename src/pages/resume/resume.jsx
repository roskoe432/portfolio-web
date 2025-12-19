import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import MyDocument from './documents';
import useResume from './useResume';
import styles from './resume.module.less';

function Resume() {
	const { t } = useTranslation();
	const { data, loading } = useResume();

	if (loading) {
		return <div>{t('common.loading')}</div>;
	}

	if (!data) {
		return <div>{t('common.error')}</div>;
	}

	return (
		<div className={styles.resumeContainer}>
			<div className={styles.controls}>
				<PDFDownloadLink
					document={<MyDocument data={data} />}
					fileName="Benjamin_Snow_Resume.pdf"
				>
					{({ loading }) => (
						<Button color="grey" size="compact-xs" loading={loading}>
							{loading
								? t('pages.resume.preparingDownload')
								: t('common.download')}
						</Button>
					)}
				</PDFDownloadLink>
			</div>
			<PDFViewer width="100%" height="700" showToolbar={false}>
				<MyDocument data={data} />
			</PDFViewer>
		</div>
	);
}

export default Resume;
