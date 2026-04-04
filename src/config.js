const requiredEnvVars = [
	'VITE_ENV',
	'VITE_GITHUB_URL',
	'VITE_LINKEDIN_URL',
	'VITE_PERLENSPIEL_URL',
	'VITE_SERVER_URL',
	'VITE_DEBUG_GAME',
	'VITE_GAME_ENABLED',
	'VITE_USE_NAVLINKS',
	'VITE_SHOW_MODAL_ON_START',
	'VITE_EMAIL',
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
	useNavLinks: import.meta.env.VITE_USE_NAVLINKS === 'true',
	email: import.meta.env.VITE_EMAIL,
	urls: {
		github: import.meta.env.VITE_GITHUB_URL,
		linkedin: import.meta.env.VITE_LINKEDIN_URL,
		perlenspiel: import.meta.env.VITE_PERLENSPIEL_URL,
		resumeUrl: ``,
	},
	serverUrl,
	game: {
		debug: import.meta.env.VITE_DEBUG_GAME === 'true',
		enabled: import.meta.env.VITE_GAME_ENABLED === 'true',
	},
	showModalOnStart: import.meta.env.VITE_SHOW_MODAL_ON_START === 'true',
};

export default config;
