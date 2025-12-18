import './config';
import './i18n';
import '@mantine/core/styles.css';
import './styles/globals.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
