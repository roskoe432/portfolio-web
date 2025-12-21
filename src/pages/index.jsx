import { lazy } from 'react';

const pages = {
	'/': {
		translationKey: 'navigation.home',
		entry: lazy(() => import('./home/home')),
	},
	'/about': {
		disabled: false,
		translationKey: 'navigation.about',
		entry: lazy(() => import('./about/about')),
	},
	'/resume': {
		translationKey: 'navigation.resume',
		entry: lazy(() => import('./resume/resume')),
	},
	'/links': {
		disabled: true,
		translationKey: 'navigation.links',
		entry: lazy(() => import('./links/links')),
	},
	'/contact': {
		disabled: true,
		translationKey: 'navigation.contact',
		entry: lazy(() => import('./contact/contact')),
	},
};

export default pages;
