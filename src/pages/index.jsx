import { lazy } from 'react';

const pages = {
	HOME: {
		name: 'Home',
		translationKey: 'navigation.home',
		path: '/',
		entry: lazy(() => import('./home/home')),
	},
	ABOUT: {
		name: 'About',
		translationKey: 'navigation.about',
		path: '/about',
		entry: lazy(() => import('./about/about')),
	},
	CONTACT: {
		name: 'Contact',
		translationKey: 'navigation.contact',
		path: '/contact',
		entry: lazy(() => import('./contact/contact')),
	},
};

export default pages;
