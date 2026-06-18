/**
 * Endorsements (English source). Spanish role overrides: $messages.endorsementsPage.byId[id].
 * The /endorsements page splits these into People and Organizations sections by `category`.
 *
 * Source: campaign "PC - Endorsements" sheet — confirmed (Received = "Y") endorsements only.
 * Roles/descriptions were blank for every confirmed row, so these are names only for now;
 * add `role` (and Spanish overrides) + `photo` as the campaign supplies them.
 */
export type Endorsement = {
	id: string;
	/** Which section this belongs to on the page. */
	category: 'person' | 'organization';
	/** Endorser's name — the English source of truth (not translated). */
	name: string;
	/** Optional title/affiliation shown in muted text, e.g. "Mayor, Kaysville". */
	role?: string;
	/** Portrait image path under /images. Falls back to initials when omitted. */
	photo?: string;
};

export const endorsements: Endorsement[] = [
	// People
	{ id: 'rosemary-lesser', category: 'person', name: 'Dr. Rosemary Lesser', role:  'Physician, Veteran, Utah House District 10'},
	{ id: 'dakota-wurth', category: 'person', name: 'Dakota Wurth', role:'Clearfield City Council, State Senate Candidate' },
	{ id: 'john-arthur', category: 'person', name: 'John Arthur', role: 'Utah House District 41' },
	{ id: 'stephanie-pitcher', category: 'person', name: 'Stephanie Pitcher', role: 'Utah Senate District 14' },
	{ id: 'abigail-treasure', category: 'person', name: 'Abigail Treasure', role: 'Candidate - Utah House District 16' },
	{ id: 'caroline-gleich', category: 'person', name: 'Caroline Gleich', role: 'US Senate Candidate - Utah' },
	{ id: 'anna-graff', category: 'person', name: 'Anna Graff', role: 'Candidate - Utah House District 12' },
	{ id: 'garret-rushforth', category: 'person', name: 'Garret Rushforth', role: 'Candidate - Utah Senate District 7' },
	{ id: 'kim-james', category: 'person', name: 'Kim James', role: 'Candidate - Utah House District 8' },
	{ id: 'bianca-mittendorf', category: 'person', name: 'Bianca Mittendorf', role: 'Candidate - Utah House District 7' },

	// Businesses & organizations
	{ id: 'wsu-democrats', category: 'organization', name: 'WSU Democrats' },
	{ id: 'weber-county-progressives', category: 'organization', name: 'Weber County Progressives' },
	{ id: 'ogden-50501', category: 'organization', name: 'Ogden 50501' },
	{
		id: 'weber-dem-womens-caucus',
		category: 'organization',
		name: 'Weber Democratic Women’s Caucus'
	},
	{ id: 'utah-dem-black-caucus', category: 'organization', name: 'Utah Democratic Black Caucus' },
	{ id: 'labor-caucus', category: 'organization', name: 'Labor Caucus' },
	{ id: 'nalc-branch-68', category: 'organization', name: 'NALC - Branch 68' },
	{ id: 'nalc-branch-970', category: 'organization', name: 'NALC - Branch 970' },
	{ id: 'afscme-1004', category: 'organization', name: 'AFSCME - 1004' },
	{ id: 'utah-veterans-caucus', category: 'organization', name: 'Utah Veterans Caucus' },
	{ id: 'environmental-caucus', category: 'organization', name: 'Environmental Caucus' },
	{ id: 'womens-dem-club-utah', category: 'organization', name: 'Women’s Democratic Club of Utah' }
];

/** Individual endorsers. */
export const peopleEndorsements: Endorsement[] = endorsements.filter(
	(e) => e.category === 'person'
);

/** Business & organization endorsers. */
export const orgEndorsements: Endorsement[] = endorsements.filter(
	(e) => e.category === 'organization'
);
