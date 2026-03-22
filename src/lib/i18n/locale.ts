import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { dictionaries, type Locale } from './dictionaries';

const STORAGE_KEY = 'pcc-locale';

function readStoredLocale(): Locale {
	if (!browser) return 'en';
	try {
		const s = localStorage.getItem(STORAGE_KEY);
		if (s === 'es' || s === 'en') return s;
	} catch {
		/* ignore */
	}
	return 'en';
}

export const locale = writable<Locale>('en');

export const messages = derived(locale, ($l) => dictionaries[$l]);

export function setLocale(next: Locale): void {
	locale.set(next);
	if (browser) {
		try {
			localStorage.setItem(STORAGE_KEY, next);
			document.documentElement.lang = next === 'es' ? 'es' : 'en';
		} catch {
			/* ignore */
		}
	}
}

/** Call once on the client so saved language applies after hydration */
export function initLocaleFromStorage(): void {
	if (!browser) return;
	const stored = readStoredLocale();
	locale.set(stored);
	document.documentElement.lang = stored === 'es' ? 'es' : 'en';
}
