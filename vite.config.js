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
					'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
					'mantine-vendor': [
						'@mantine/core',
						'@mantine/form',
						'@mantine/hooks',
					],
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
		globals: true, // Allows using test, expect, describe without importing
		environment: 'jsdom',
		setupFiles: './tests/setup.js',
		css: false,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'json-summary'],
			include: ['src/**/*.{js,jsx}'],
			exclude: ['src/index.jsx', 'src/config.js', 'src/pages/index.jsx'],
			thresholds: {
				statements: 64,
				branches: 35,
				functions: 64,
				lines: 65,
			},
		},
		include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
