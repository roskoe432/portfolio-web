import { useState, useEffect } from 'react';
import defaultData from './default-data.json';
import config from '@/config';

console.log(defaultData);
function useResume() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (config.env !== 'production') {
			setData(defaultData);
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				const response = await fetch(`${config.resumeDataUrl}?v=${Date.now()}`);
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error('Error fetching resume data:', error);
				setData(defaultData);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return { data, loading };
}

export default useResume;
