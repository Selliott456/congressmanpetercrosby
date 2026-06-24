import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'pcc-rsvped';

function load(): Set<string> {
	if (!browser) return new Set();
	try {
		const raw = localStorage.getItem(KEY);
		return new Set(raw ? (JSON.parse(raw) as string[]) : []);
	} catch {
		return new Set();
	}
}

/** Event ids the visitor has RSVP'd to (persisted in localStorage). */
export const rsvpedEvents = writable<Set<string>>(load());

/** Mark an event as RSVP'd and persist it. */
export function markRsvped(id: string): void {
	rsvpedEvents.update((current) => {
		const next = new Set(current);
		next.add(id);
		if (browser) {
			try {
				localStorage.setItem(KEY, JSON.stringify([...next]));
			} catch {
				/* ignore quota/availability errors */
			}
		}
		return next;
	});
}
