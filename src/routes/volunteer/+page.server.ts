import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const HELP_FIELDS = [
	'help_canvassing',
	'help_phone_banking',
	'help_text_banking',
	'help_hosting_event',
	'help_data_entry',
	'help_wherever_needed'
] as const;

function readHelp(formData: FormData) {
	const out: Record<string, boolean> = {};
	for (const key of HELP_FIELDS) {
		out[key] = formData.get(key) === 'yes';
	}
	return out;
}

export const actions: Actions = {
	default: async ({ request, fetch, url }) => {
		const formData = await request.formData();
		const botField = String(formData.get('bot-field') ?? '').trim();
		if (botField) {
			return { success: true };
		}

		const firstName = String(formData.get('firstName') ?? '').trim();
		const lastName = String(formData.get('lastName') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const phone = String(formData.get('phone') ?? '').trim();
		const zip = String(formData.get('zip') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();
		const topic = String(formData.get('topic') ?? '').trim();
		const help = readHelp(formData);

		if (!firstName || !lastName || !email || !phone || !message) {
			return fail(400, {
				error: 'Please complete all required fields.',
				values: { firstName, lastName, email, phone, zip, message, ...help }
			});
		}

		const submit = new URLSearchParams();
		submit.set('form-name', 'contact');
		submit.set('bot-field', '');
		submit.set('firstName', firstName);
		submit.set('lastName', lastName);
		submit.set('email', email);
		submit.set('phone', phone);
		if (zip) submit.set('zip', zip);
		submit.set('message', message);
		submit.set('topic', topic);
		for (const key of HELP_FIELDS) {
			if (help[key]) submit.set(key, 'yes');
		}

		const endpoint = new URL('/netlify-form-detection.html', url.origin);
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: submit.toString()
		});

		if (!response.ok) {
			return fail(500, {
				error: 'Submission failed. Please try again in a moment.',
				values: { firstName, lastName, email, phone, zip, message, ...help }
			});
		}

		return { success: true };
	}
};
