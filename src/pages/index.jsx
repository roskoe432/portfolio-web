import { lazy } from 'react';

const pages = {
	'/home': {
		translationKey: 'navigation.home',
		entry: lazy(() => import('./home/home')),
	},
	'/about': {
		disabled: true,
		translationKey: 'navigation.about',
		entry: lazy(() => import('./about/about')),
	},
	'/under-the-hood': {
		translationKey: 'navigation.underTheHood',
		entry: lazy(() => import('./under-the-hood/under-the-hood')),
	},
	'/resume': {
		translationKey: 'navigation.resume',
		entry: lazy(() => import('./resume/resume')),
	},
	'/contact': {
		disabled: true,
		translationKey: 'navigation.contact',
		entry: lazy(() => import('./contact/contact')),
	},
};

export default pages;
