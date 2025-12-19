import MyDocument from '@pages/resume/my-document';
import data from '@/pages/resume/data.json';
import { renderWithProviders } from '@tests/utils';

describe('MyDocument', () => {
	it('should render without crashing', () => {
		renderWithProviders(<MyDocument data={data} />);
	});
});
