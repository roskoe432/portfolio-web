const requiredEnvVars = [
	'VITE_ENV',
	'VITE_GITHUB_URL',
	'VITE_LINKEDIN_URL',
	'VITE_PERLENSPIEL_URL',
	'VITE_SERVER_URL',
	'VITE_GAME_DEBUG_MODE',
	'VITE_GAME_ENABLED',
	'VITE_UI_USE_NAVLINKS',
	'VITE_UI_SHOW_MODAL_ON_START',
	'VITE_EMAIL',
	'VITE_QUERY_CLIENT_STALE_TIME',
	'VITE_QUERY_CLIENT_REFETCH_ON_WINDOW_FOCUS',
	'VITE_QUERY_CLIENT_RETRY',
	'VITE_QUERY_DEVTOOLS_INITIAL_IS_OPEN',
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
const serverUrl = env === 'local' ? '' : import.meta.env.VITE_SERVER_URL;

const config = {
	env,
	serverUrl,
	useNavLinks: import.meta.env.VITE_UI_USE_NAVLINKS === 'true',
	email: import.meta.env.VITE_EMAIL,
	showModalOnStart: import.meta.env.VITE_UI_SHOW_MODAL_ON_START === 'true',
	urls: {
		github: import.meta.env.VITE_GITHUB_URL,
		linkedin: import.meta.env.VITE_LINKEDIN_URL,
		perlenspiel: import.meta.env.VITE_PERLENSPIEL_URL,
		resumeUrl: ``,
	},
	game: {
		debug: import.meta.env.VITE_GAME_DEBUG_MODE === 'true',
		enabled: import.meta.env.VITE_GAME_ENABLED === 'true',
	},
	reactQuery: {
		client: {
			staleTime: parseInt(import.meta.env.VITE_QUERY_CLIENT_STALE_TIME, 10),
			refetchOnWindowFocus: import.meta.env.VITE_QUERY_CLIENT_REFETCH_ON_WINDOW_FOCUS === 'true',
			retry: parseInt(import.meta.env.VITE_QUERY_CLIENT_RETRY, 10),
		},
		devtools: {
			enabled: env === 'local',
			initialIsOpen: import.meta.env.VITE_QUERY_DEVTOOLS_INITIAL_IS_OPEN === 'true',
		},
	},
};

export default config;
