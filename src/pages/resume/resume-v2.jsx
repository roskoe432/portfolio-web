import { pdfjs } from 'react-pdf';
import pdfWorkerURL from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerURL;

import React from 'react';
import { Document, Page } from 'react-pdf';
import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import resumePDF from '../../shared/assets/docs/resume.pdf';
import styles from './resume.module.less';

function ResumeV2() {
	const { t } = useTranslation();

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = resumePDF;
		link.download = 'Benjamin_Snow_Resume.pdf';
		link.click();
	};

	return (
		<div className={styles.resumeContainer}>
			<div className={styles.controls}>
				<Button color="grey" size="compact-xs" onClick={handleDownload}>
					{t('common.download')}
				</Button>
			</div>
			<Document file={resumePDF} options={{ workerSrc: pdfWorkerURL }}>
				<Page
					pageNumber={1}
					width={800}
					renderTextLayer={false}
					renderAnnotationLayer={false}
				/>
			</Document>
		</div>
	);
}

export default ResumeV2;
