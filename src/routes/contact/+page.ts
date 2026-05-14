import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	if (url.searchParams.get('topic') === 'volunteer') {
		throw redirect(302, '/volunteer');
	}
};
