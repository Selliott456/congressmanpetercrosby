import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch, url }) => {
		const formData = await request.formData();
		const firstName = String(formData.get('firstName') ?? '').trim();
		const lastName = String(formData.get('lastName') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();
		const topic = String(formData.get('topic') ?? '').trim();

		if (!firstName || !lastName || !email || !message) {
			return fail(400, {
				error: 'Please complete all required fields.',
				values: { firstName, lastName, email, message }
			});
		}

		const submit = new URLSearchParams();
		submit.set('form-name', 'contact');
		submit.set('firstName', firstName);
		submit.set('lastName', lastName);
		submit.set('email', email);
		submit.set('message', message);
		submit.set('topic', topic);

		const endpoint = new URL('/netlify-form-detection.html', url.origin);
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: submit.toString()
		});

		if (!response.ok) {
			return fail(500, {
				error: 'Submission failed. Please try again in a moment.',
				values: { firstName, lastName, email, message }
			});
		}

		return { success: true };
	}
};
