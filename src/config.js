const requiredEnvVars = ['VITE_ENV', 'VITE_GITHUB_URL', 'VITE_LINKEDIN_URL'];

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
	githubUrl: import.meta.env.VITE_GITHUB_URL,
	linkedInUrl: import.meta.env.VITE_LINKEDIN_URL,
};

export default config;
