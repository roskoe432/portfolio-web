import { lazy } from 'react';

const pages = {
	'/': {
		translationKey: 'navigation.about',
		entry: lazy(() => import('./about/about')),
	},
	'/resume': {
		translationKey: 'navigation.resume',
		entry: lazy(() => import('./resume/resume-v2')),
	},
	'/contact': {
		disabled: true,
		translationKey: 'navigation.contact',
		entry: lazy(() => import('./contact/contact')),
	},
};

export default pages;
