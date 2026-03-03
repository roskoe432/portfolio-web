import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'certs/**',
			'logs/**',
			'stats.html',
			'coverage/**',
			'public/ps3/**',
			'**/*.tsx',
		],
	},
	{
		files: ['vite.config.js', 'eslint.config.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.{js,jsx}'],
		plugins: {
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.jest,
				vi: 'writable',
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
	prettier,
];
