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
	'/blog': {
		disabled: false,
		translationKey: 'navigation.blog',
		entry: lazy(() => import('./blog/blog')),
	},
	'/blog/:slug': {
		disabled: false,
		createNavLink: false,
		translationKey: 'navigation.blog',
		entry: lazy(() => import('./blog/blog')),
	},
};

export default pages;
