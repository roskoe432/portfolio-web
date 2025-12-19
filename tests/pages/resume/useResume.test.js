import useResume from '@pages/resume/useResume';
import data from '@pages/resume/data.json';

describe('useResume', () => {
	it('should return resume data', () => {
		const { data: resumeData } = useResume();
		expect(resumeData).toEqual(data);
	});
});
