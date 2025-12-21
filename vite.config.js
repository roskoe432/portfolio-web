import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

const certPath = path.resolve(__dirname, 'certs/server.crt');
const keyPath = path.resolve(__dirname, 'certs/server.key');

export default defineConfig({
	plugins: [
		react(),
		visualizer({
			open: false,
			gzipSize: true,
			brotliSize: true,
			filename: 'stats.html',
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@tests': path.resolve(__dirname, 'tests'),
			'@i18n': path.resolve(__dirname, 'src/i18n'),
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': [
						'react',
						'react-dom',
						'react-dom/client',
						'react-router-dom',
					],
					'mantine-vendor': [
						'@mantine/core',
						'@mantine/form',
						'@mantine/hooks',
					],
					'pdf-vendor': ['@react-pdf/renderer'],
				},
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
			},
		},
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				passes: 2,
			},
			format: {
				comments: false,
			},
		},
		target: 'esnext',
		cssCodeSplit: true,
		reportCompressedSize: true,
		assetsInlineLimit: 4096,
	},
	server: {
		https: {
			key: keyPath,
			cert: certPath,
		},
		host: 'dev.local',
		allowedHosts: ['dev.local'],
		port: 3000,
		open: true,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './tests/setup.js',
		css: false,
		env: {
			VITE_ENV: 'test',
			VITE_GITHUB_URL: 'https://github.com/test',
			VITE_LINKEDIN_URL: 'https://linkedin.com/test',
			VITE_PERLENSPIEL_URL: 'https://perlenspiel.test',
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'json-summary'],
			include: ['src/**/*.{js,jsx}'],
			exclude: [
				'src/index.jsx',
				'src/config.js',
				'src/pages/index.jsx',
				'src/pages/resume/stylesheet.js',
				'src/pages/resume/resume.jsx', // Skip coverage for resume PDF generation page
				'src/pages/resume/my-document.jsx', // Skip coverage for resume PDF generation document
				'**/*.json',
			],
			thresholds: {
				statements: 90,
				branches: 50,
				functions: 90,
				lines: 90,
			},
		},
		include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
