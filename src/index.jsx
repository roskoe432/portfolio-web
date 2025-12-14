import './config';
// import '@mantine/core/styles.css';
import './index.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import AppProviders from './app/app-providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProviders>
            <App />
        </AppProviders>
    </React.StrictMode>
);