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
			'@tests': path.resolve(__dirname, '__tests__'),
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
					'phaser-vendor': ['phaser'],
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
		allowedHosts: ['dev.local', 'localhost'],
		port: 3000,
		open: true,
		proxy: {
			'/api/v1': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
				configure: (proxy) => {
					proxy.on('proxyReq', (proxyReq, req) => {
						console.log(`[Proxy] Sending ${req.method} request to: ${req.url}`);
					});
					proxy.on('proxyRes', (proxyRes, req) => {
						console.log(
							`[Proxy] Received ${proxyRes.statusCode} from: ${req.url}`,
						);
					});
					proxy.on('error', (err) => {
						console.error('[Proxy] Error:', err);
					});
				},
			},
			'/health': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './__tests__/setup.js',
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
				'src/pages/links/links.jsx', // Just keeping until I move links elsewhere.
				'**/*.json',
			],
			thresholds: {
				statements: 25,
				branches: 25,
				functions: 25,
				lines: 25,
			},
		},
		include: ['__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
