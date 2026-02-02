import { lazy } from 'react';

const pages = {
	'/': {
		translationKey: 'navigation.about',
		entry: lazy(() => import('./about/about')),
	},
	'/contact': {
		disabled: true,
		translationKey: 'navigation.contact',
		entry: lazy(() => import('./contact/contact')),
	},
};

export default pages;
