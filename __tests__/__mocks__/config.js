const getMockConfig = (overrides = {}) => ({
	env: 'test',
	logging: {
		level: 'debug',
	},
	serverUrl: 'http://localhost:5500',
	useNavLinks: false,
	showModalOnStart: false,
	urls: {
		github: 'https://github.com/test',
		linkedin: 'https://linkedin.com/test',
		perlenspiel: 'https://perlenspiel.test',
		resumeUrl: 'https://example.com/resume.pdf',
	},
	game: {
		debug: false,
		enabled: false,
	},
	reactQuery: {
		client: {
			staleTime: 0,
			refetchOnWindowFocus: false,
			retry: 0,
		},
		devtools: {
			enabled: false,
			initialIsOpen: false,
		},
	},
	...overrides,
});

export default getMockConfig;
