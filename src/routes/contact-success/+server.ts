import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	// Safety fallback: if Netlify form interception misses, avoid 405 and still land on success page.
	throw redirect(303, '/contact-success');
};
