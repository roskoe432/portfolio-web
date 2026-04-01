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

const env = import.meta.env.VITE_ENV;
const serverUrl = env === 'local' ? '/' : import.meta.env.VITE_SERVER_URL;

const config = {
	env,
	urls: {
		github: import.meta.env.VITE_GITHUB_URL,
		linkedin: import.meta.env.VITE_LINKEDIN_URL,
		perlenspiel: import.meta.env.VITE_PERLENSPIEL_URL,
		resumeUrl: ``,
	},
	serverUrl,
	debugGame: import.meta.env.VITE_DEBUG_GAME === 'true',
};

export default config;
