/**
 * Split copy into runs on markdown-style `[text](https://…)` links, so data and
 * dictionary strings can carry a link without HTML (same idea as `emphasis.ts`):
 *
 *   linkRuns('RSVP at [bit.ly/x](https://bit.ly/x).')
 *   → [{ text: 'RSVP at ', href: null }, { text: 'bit.ly/x', href: 'https://bit.ly/x' }, { text: '.', href: null }]
 *
 * Only https URLs become links; anything else is left as literal text.
 */
export type LinkRun = { text: string; href: string | null };

const LINK = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;

export function linkRuns(text: string): LinkRun[] {
	const runs: LinkRun[] = [];
	let last = 0;
	for (const m of text.matchAll(LINK)) {
		runs.push({ text: text.slice(last, m.index), href: null });
		runs.push({ text: m[1], href: m[2] });
		last = m.index + m[0].length;
	}
	runs.push({ text: text.slice(last), href: null });
	return runs;
}

/**
 * The same copy with link markup written out, for plain-text destinations
 * (calendar exports). A label that is just the URL collapses to the URL.
 */
export function linksToPlainText(text: string): string {
	return text.replace(LINK, (_, label: string, href: string) =>
		href.replace(/^https:\/\//, '') === label ? href : `${label} (${href})`
	);
}
