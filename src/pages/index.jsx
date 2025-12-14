import { lazy } from 'react';

const pages = {
	HOME: {
		name: 'Home',
		path: '/',
		entry: lazy(() => import('./home/home')),
	},
	ABOUT: {
		name: 'About',
		path: '/about',
		entry: lazy(() => import('./about/about')),
	},
	CONTACT: {
		name: 'Contact',
		path: '/contact',
		entry: lazy(() => import('./contact/contact')),
	},
};

export default pages;
