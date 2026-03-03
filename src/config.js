const requiredEnvVars = [
	'VITE_ENV',
	'VITE_GITHUB_URL',
	'VITE_LINKEDIN_URL',
	'VITE_PERLENSPIEL_URL',
	'VITE_SERVER_URL',
	'VITE_DEBUG_GAME',
];

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
	urls: {
		github: import.meta.env.VITE_GITHUB_URL,
		linkedin: import.meta.env.VITE_LINKEDIN_URL,
		perlenspiel: import.meta.env.VITE_PERLENSPIEL_URL,
	},
	serverUrl: import.meta.env.VITE_SERVER_URL,
	debugGame: import.meta.env.VITE_DEBUG_GAME === 'true',
};

export default config;
