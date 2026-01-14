import { pdfjs } from 'react-pdf';
import pdfWorkerURL from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerURL;

import React from 'react';
import { Document, Page } from 'react-pdf';
import resumePDF from '../../shared/assets/docs/resume.pdf';

function ResumeV2() {
	return (
		<div
			style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
		>
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
