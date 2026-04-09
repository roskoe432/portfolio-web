import { lazy } from 'react';

export const Page = {
	HOME: '/',
	CONTACT: '/contact',
	BLOG: '/blog',
	BLOG_DETAIL: '/blog/:slug',
};

const pages = {
	[Page.HOME]: {
		translationKey: 'navigation.about',
		entry: lazy(() => import('./about/about')),
	},
	[Page.CONTACT]: {
		disabled: false,
		translationKey: 'navigation.contact',
		entry: lazy(() => import('./contact/contact')),
	},
	[Page.BLOG]: {
		disabled: false,
		translationKey: 'navigation.blog',
		entry: lazy(() => import('./blog/blog-main')),
	},
	[Page.BLOG_DETAIL]: {
		disabled: false,
		createNavLink: false,
		translationKey: 'navigation.blog',
		entry: lazy(() => import('./blog/blog-main')),
	},
};

export default pages;
