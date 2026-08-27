import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/**
 * Shareable short link for the campaign: `/yard-sign` redirects to the home page
 * with the `?yardsign` deep-link param, which `+layout.svelte` uses to open the
 * request-a-yard-sign modal. Keeps one clean, circulatable URL without a
 * standalone form page.
 */
export const load: PageLoad = () => {
	throw redirect(307, '/?yardsign');
};
