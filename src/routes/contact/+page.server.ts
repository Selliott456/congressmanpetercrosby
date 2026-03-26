import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

const FALLBACK_TO_EMAIL = 'petercrosbyforcongress@gmail.com';

/** Netlify Functions expose secrets on `process.env`; `$env/dynamic/private` can be empty in production. */
function privateEnv(key: 'RESEND_API_KEY' | 'CONTACT_TO_EMAIL' | 'CONTACT_FROM_EMAIL'): string | undefined {
	const fromProcess = typeof process !== 'undefined' ? process.env[key] : undefined;
	const fromKit = env[key];
	const raw = fromProcess ?? fromKit;
	if (typeof raw !== 'string') return undefined;
	const trimmed = raw.trim();
	return trimmed.length > 0 ? trimmed : undefined;
}

export const actions: Actions = {
	default: async ({ request, fetch }) => {
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

		const resendApiKey = privateEnv('RESEND_API_KEY');
		if (!resendApiKey) {
			return fail(500, {
				error: 'Contact form is not configured yet. Please email us directly for now.',
				values: { firstName, lastName, email, message }
			});
		}

		const toEmail = privateEnv('CONTACT_TO_EMAIL') || FALLBACK_TO_EMAIL;
		const fromEmail = privateEnv('CONTACT_FROM_EMAIL') || 'Campaign Website <onboarding@resend.dev>';
		const subject = topic === 'volunteer' ? 'Volunteering' : 'Contact from website';
		const text = `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;

		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${resendApiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [toEmail],
				reply_to: email,
				subject,
				text
			})
		});

		if (!response.ok) {
			return fail(500, {
				error: 'Unable to send your message right now. Please try again shortly.',
				values: { firstName, lastName, email, message }
			});
		}

		return { success: true };
	}
};
