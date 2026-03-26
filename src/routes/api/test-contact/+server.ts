import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type ContactPayload = {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
	topic?: string;
};

function normalizeString(value: unknown): string {
	return typeof value === 'string' ? value.trim() : '';
}

function validate(payload: ContactPayload) {
	if (!payload.firstName || !payload.lastName || !payload.email || !payload.message) {
		return 'Missing required fields: firstName, lastName, email, message.';
	}
	return '';
}

export const POST: RequestHandler = async ({ request }) => {
	if (!dev) {
		return json({ error: 'This endpoint is only available in local dev.' }, { status: 403 });
	}

	const contentType = request.headers.get('content-type') || '';
	let payload: ContactPayload;

	if (contentType.includes('application/json')) {
		const body = await request.json();
		payload = {
			firstName: normalizeString(body?.firstName),
			lastName: normalizeString(body?.lastName),
			email: normalizeString(body?.email),
			message: normalizeString(body?.message),
			topic: normalizeString(body?.topic) || undefined
		};
	} else {
		const form = await request.formData();
		payload = {
			firstName: normalizeString(form.get('firstName')),
			lastName: normalizeString(form.get('lastName')),
			email: normalizeString(form.get('email')),
			message: normalizeString(form.get('message')),
			topic: normalizeString(form.get('topic')) || undefined
		};
	}

	const validationError = validate(payload);
	if (validationError) {
		return json({ ok: false, error: validationError, payload }, { status: 400 });
	}

	// Dev-only visibility to confirm server received the request as expected.
	console.log('[contact-test] Received payload:', payload);

	return json({
		ok: true,
		message: 'Local test endpoint received your contact payload.',
		payload
	});
};
