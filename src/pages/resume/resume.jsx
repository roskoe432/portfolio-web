import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@mantine/core';
import MyDocument from './documents';
import styles from './resume.module.less';

function Resume() {
	return (
		<div className={styles.resumeContainer}>
			<div className={styles.controls}>
				{/* <h1>Resume</h1> */}
				<PDFDownloadLink
					document={<MyDocument />}
					fileName="Benjamin_Snow_Resume.pdf"
					// type="pdf"
				>
					{({ loading }) => (
						<Button color="grey" size="compact-xs" loading={loading}>
							{loading ? 'Preparing PDF...' : 'Download Resume'}
						</Button>
					)}
				</PDFDownloadLink>
			</div>
			<PDFViewer width="100%" height="700" showToolbar={false}>
				<MyDocument />
			</PDFViewer>
		</div>
	);
}

export default Resume;
