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
	UNDER_THE_HOOD: {
		name: 'Under The Hood',
		translationKey: 'navigation.underTheHood',
		path: '/under-the-hood',
		entry: lazy(() => import('./under-the-hood/under-the-hood')),
	},
	RESUME: {
		name: 'Resume',
		translationKey: 'navigation.resume',
		path: '/resume',
		entry: lazy(() => import('./resume/resume')),
	},
	CONTACT: {
		name: 'Contact',
		translationKey: 'navigation.contact',
		path: '/contact',
		entry: lazy(() => import('./contact/contact')),
	},
};

export default pages;
