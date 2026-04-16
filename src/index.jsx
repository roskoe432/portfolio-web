import './config';
import './i18n';
import './styles/globals.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import Providers from './app/providers';
import { createGame } from './game/game-config';
import '@i18n';

createGame();

setTimeout(() => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<React.StrictMode>
			<Providers>
				<App />
			</Providers>
		</React.StrictMode>,
	);
}, 2000);
