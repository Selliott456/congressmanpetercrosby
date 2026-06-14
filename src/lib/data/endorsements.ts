/**
 * Endorsements (English source). Spanish role overrides: $messages.endorsementsPage.byId[id].
 * The /endorsements page splits these into People and Organizations sections by `category`.
 * Placeholder content — replace with the campaign's real endorsers, logos, and photos.
 */
export type Endorsement = {
	id: string;
	/** Which section this belongs to on the page. */
	category: 'person' | 'organization';
	/** Endorser's name — the English source of truth (not translated). */
	name: string;
	/** Optional title/affiliation shown in muted text, e.g. "Mayor, Kaysville". */
	role?: string;
	/** Image path under /images: a portrait (person) or logo (organization). Falls back to initials. */
	photo?: string;
};

export const endorsements: Endorsement[] = [
	{ id: 'en-001', category: 'person', name: 'Jane Whitfield', role: 'Mayor, Kaysville' },
	{ id: 'en-002', category: 'person', name: 'Robert Alvarez', role: 'Cache County Commissioner' },
	{ id: 'en-003', category: 'person', name: 'Dr. Susan Mei', role: 'Pediatrician, Logan' },
	{ id: 'en-004', category: 'person', name: 'Patricia Nguyen', role: 'Small Business Owner, Ogden' },
	{ id: 'en-005', category: 'person', name: 'Daniel Okafor' },
	{ id: 'en-101', category: 'organization', name: 'Cache Valley Labor Council', role: 'Local 405' },
	{ id: 'en-102', category: 'organization', name: 'Northern Utah Educators', role: 'Teachers’ association' },
	{ id: 'en-103', category: 'organization', name: 'Ogden Main Street Alliance', role: 'Small business coalition' },
	{ id: 'en-104', category: 'organization', name: 'Bear River Conservation Fund' }
];

/** Individual endorsers. */
export const peopleEndorsements: Endorsement[] = endorsements.filter(
	(e) => e.category === 'person'
);

/** Business & organization endorsers. */
export const orgEndorsements: Endorsement[] = endorsements.filter(
	(e) => e.category === 'organization'
);
