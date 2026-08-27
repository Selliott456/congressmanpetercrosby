import { writable } from 'svelte/store';

/**
 * Global open/closed state for the yard-sign request modal. The modal is mounted
 * once in `+layout.svelte`; the Nav and Footer triggers (and the `?yardsign`
 * deep link) all flip this store instead of each owning a local copy.
 */
export const yardSignOpen = writable(false);

/** Open the yard-sign request modal. */
export function openYardSign(): void {
	yardSignOpen.set(true);
}

/** Close the yard-sign request modal. */
export function closeYardSign(): void {
	yardSignOpen.set(false);
}
