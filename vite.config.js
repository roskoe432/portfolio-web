import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import react from '@vitejs/plugin-react';
import path from 'path';

const certPath = path.resolve(__dirname, 'certs/server.crt');
const keyPath = path.resolve(__dirname, 'certs/server.key');

// Tiled Application JSON (TMJ) plugin
const tmjPlugin = () => {
	return {
		name: 'tmj-plugin',
		transform(src, id) {
			if (id.endsWith('.tmj')) {
				try {
					JSON.parse(src);
					return { code: `export default ${src};`, map: null };
				} catch {
					this.error(`Invalid JSON in ${id}`);
				}
			}
		},
	};
};

export default defineConfig({
	plugins: [react(), tmjPlugin(), analyzer()],
	resolve: {
		alias: {
			'@config': path.resolve(__dirname, 'src/config.js'),
			'@shared': path.resolve(__dirname, 'src/shared'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@app': path.resolve(__dirname, 'src/app'),
			'@tests': path.resolve(__dirname, '__tests__'),
			'@i18n': path.resolve(__dirname, 'src/i18n'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@game': path.resolve(__dirname, 'src/game'),
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				// TODO: Need to check this with documentation
				// now that Vite uses rolldown
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (
							id.includes('react') ||
							id.includes('react-dom') ||
							id.includes('react-router')
						) {
							return 'react-vendor';
						}
						if (id.includes('phaser')) {
							return 'phaser-vendor';
						}
					}
				},
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
			},
		},
		minify: 'oxc',
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
		port: 4000,
		open: false,
		proxy: {
			'/api/v1': {
				target: 'http://localhost:5500',
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
				target: 'http://localhost:5500',
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
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './__tests__/setup.js',
		css: false,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'json-summary'],
			include: ['src/**/*.{js,jsx}'],
			exclude: [
				'src/**/index.{js,jsx}',
				'src/pages/links/links.jsx',
				'**/*.json',
				// Temporary until React coverage is improved
				'src/game/**',
			],
			thresholds: {
				lines: 52,
				branches: 24,
				statements: 51,
				functions: 50,
			},
		},
		include: ['__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		exclude: ['node_modules', 'dist', 'coverage'],
	},
});
