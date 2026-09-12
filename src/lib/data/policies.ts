/**
 * Structure for the /policies page.
 *
 * The copy lives in the i18n dictionaries (`$messages.policies.items`, en + es) so
 * both languages carry the same shape. This file owns the types and the section →
 * video mapping.
 *
 * ⚠️ `pagesEs` is typed as the shape of `pagesEn`, but that only checks fields. It
 * does NOT catch a Spanish section with a missing bullet, a dropped sub-list, or
 * blocks in a different order. When editing copy, change both languages together.
 */

/** A bullet. An object carries one level of sub-bullets (the source doc never nests deeper). */
export type PolicyListItem = string | { text: string; items: string[] };

export type PolicyBlock =
	/** Paragraph. Supports **bold** runs. */
	| { type: 'p'; text: string }
	/** A standalone bold statement that opens a section or subsection. */
	| { type: 'lede'; text: string }
	/** Sub-header within a section. `id` is its deep-link anchor — identical in en and es. */
	| { type: 'h3'; id: string; text: string }
	/** Bulleted list. Items and sub-items support **bold** runs. */
	| { type: 'ul'; items: PolicyListItem[] }
	/** Headline priorities shown as linked chips. Each `target` is a section id on this page. */
	| { type: 'pillars'; items: { text: string; target: string }[] };

export type PolicyItem = {
	/** Section anchor (`/policies#id`). Keep stable: links to these are shared off-site. */
	id: string;
	/** Short label for the sticky "On this page" ribbon. */
	navLabel: string;
	heading: string;
	/** Starts a new group (e.g. "Other Policy Positions") just before this section. */
	groupHeading?: string;
	parts: PolicyBlock[];
};

/**
 * Identity helper for the dictionaries: `items: definePolicyItems([...])` checks every
 * section and block against `PolicyItem` — including misspelled or extra fields — and
 * widens the result. The Spanish dictionary is then checked against `PolicyItem[]`
 * too, instead of against the exact shape of the English literal.
 */
export function definePolicyItems(items: PolicyItem[]): PolicyItem[] {
	return items;
}

export type PolicyMedia = {
	src: string;
	poster: string;
	labelKey: 'videoAffordabilityLabel' | 'videoAccountabilityLabel' | 'videoStewardshipLabel';
};

/**
 * Sections that carry a vertical (9:16) message video, keyed by section id. These
 * get the two-column layout; every other section is full-width text.
 */
export const policyMedia: Record<string, PolicyMedia> = {
	affordability: {
		src: '/images/policies/affordability.mp4',
		poster: '/images/policies/affordability-poster.jpg',
		labelKey: 'videoAffordabilityLabel'
	},
	'government-integrity': {
		src: '/images/policies/accountability.mp4',
		poster: '/images/policies/accountability-poster.jpg',
		labelKey: 'videoAccountabilityLabel'
	},
	'great-salt-lake': {
		src: '/images/policies/stewardship.mp4',
		poster: '/images/policies/stewardship-poster.jpg',
		labelKey: 'videoStewardshipLabel'
	}
};
