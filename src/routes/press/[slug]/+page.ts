import { error } from '@sveltejs/kit';
import { getPressRelease } from '$lib/data/pressReleases';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const release = getPressRelease(params.slug);
	if (!release) {
		throw error(404, 'Press release not found');
	}
	return { release };
};
