const requiredEnvVars = ['VITE_ENV', 'VITE_RESUME_DATA_URL'];

const validateEnvVars = () => {
	requiredEnvVars.forEach((varName) => {
		if (!import.meta.env[varName]) {
			throw new Error(`Missing required environment variable: ${varName}`);
		}
	});
};

validateEnvVars();

const config = {
	env: import.meta.env.VITE_ENV,
	resumeDataUrl: import.meta.env.VITE_RESUME_DATA_URL,
};

export default config;
