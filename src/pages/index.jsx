import { lazy } from 'react';

const pages = {
	HOME: {
		name: 'Home',
		translationKey: 'navigation.home',
		path: '/',
		entry: lazy(() => import('./home/home')),
	},
	// Not ready yet
	// --------------------------------
	// ABOUT: {
	// 	name: 'About',
	// 	translationKey: 'navigation.about',
	// 	path: '/about',
	// 	entry: lazy(() => import('./about/about')),
	// },
	RESUME: {
		name: 'Resume',
		translationKey: 'navigation.resume',
		path: '/resume',
		entry: lazy(() => import('./resume/resume')),
	},
	UNDER_THE_HOOD: {},
	// Not ready yet
	// --------------------------------
	// CONTACT: {
	// 	name: 'Contact',
	// 	translationKey: 'navigation.contact',
	// 	path: '/contact',
	// 	entry: lazy(() => import('./contact/contact')),
	// },
};

export default pages;
