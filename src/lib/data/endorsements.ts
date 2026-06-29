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
	{ id: 'rosemary-lesser', category: 'person', name: 'Dr. Rosemary Lesser', role: 'Physician, Veteran, Utah House District 10', photo: '/images/endorsements/rosemary_lesser.jpg' },
	{ id: 'dakota-wurth', category: 'person', name: 'Dakota Wurth', role: 'Clearfield City Council, State Senate Candidate', photo: '/images/endorsements/dakota_wurth.jpg' },
    { id: 'bianca-mittendorf', category: 'person', name: 'Bianca Mittendorf', role: 'Candidate - Utah House District 7', photo: '/images/endorsements/bianca_mittendorf.jpg' },
      { id: 'caroline-gleich', category: 'person', name: 'Caroline Gleich', role: 'US Senate Candidate - Utah', photo: '/images/endorsements/caroline_gleich.jpg' },
	{ id: 'john-arthur', category: 'person', name: 'John Arthur', role: 'Utah House District 41', photo: '/images/endorsements/john_arthur.jpg' },
	{ id: 'stephanie-pitcher', category: 'person', name: 'Stephanie Pitcher', role: 'Utah Senate District 14', photo: '/images/endorsements/stephanie_pitcher.jpg' },
	{ id: 'abigail-treasure', category: 'person', name: 'Abigail Treasure', role: 'Candidate - Utah House District 16', photo: '/images/endorsements/abigail_treasure.jpg' },
	{ id: 'anna-graff', category: 'person', name: 'Anna Graff', role: 'Candidate - Utah House District 12', photo: '/images/endorsements/anna_graff.jpg' },
	{ id: 'garret-rushforth', category: 'person', name: 'Garret Rushforth', role: 'Candidate - Utah Senate District 7', photo: '/images/endorsements/garret_rushforth.jpg' },
	{ id: 'kim-james', category: 'person', name: 'Kim James', role: 'Candidate - Utah House District 8', photo: '/images/endorsements/kim_james.jpg' },

	// Businesses & organizations
	{ id: 'wsu-democrats', category: 'organization', name: 'WSU Democrats', photo: '/images/endorsements/wsu_democrats.jpg' },
	{ id: 'weber-county-progressives', category: 'organization', name: 'Weber County Progressive Caucus', photo: '/images/endorsements/weber_county_progressive_caucus.jpg' },
	{ id: 'ogden-50501', category: 'organization', name: 'Ogden 50501', photo: '/images/endorsements/ogden_50501.jpg' },
	{
		id: 'weber-dem-womens-caucus',
		category: 'organization',
		name: 'Weber Democratic Women’s Caucus',
		photo: '/images/endorsements/weber_democratic_womens_caucus.jpg'
	},
	{ id: 'utah-dem-black-caucus', category: 'organization', name: 'Utah Democratic Black Caucus', photo: '/images/endorsements/utah_democratic_black_caucus.jpg' },
	{ id: 'labor-caucus', category: 'organization', name: 'Labor Caucus', photo: '/images/endorsements/labor_caucus.jpg' },
	{ id: 'nalc-branch-68', category: 'organization', name: 'NALC - Branch 68', photo: '/images/endorsements/NALC.jpg' },
	{ id: 'nalc-branch-970', category: 'organization', name: 'NALC - Branch 970', photo: '/images/endorsements/NALC.jpg' },
	{ id: 'afscme-1004', category: 'organization', name: 'AFSCME - 1004', photo: '/images/endorsements/afscme_1004.jpg' },
	{ id: 'utah-veterans-caucus', category: 'organization', name: 'Utah Veterans Democratic Caucus', photo: '/images/endorsements/utah_veterans_democratic_caucus.jpg' },
	{ id: 'environmental-caucus', category: 'organization', name: 'Environmental Caucus', photo: '/images/endorsements/environmental_caucus.jpg' },
	{ id: 'womens-dem-club-utah', category: 'organization', name: 'Women’s Democratic Club of Utah', photo: '/images/endorsements/womens_democratic_club_of_utah.jpg' },
	{ id: 'utah-state-progressive-caucus', category: 'organization', name: 'Utah State Progressive Caucus', photo: '/images/endorsements/utah_state_progressive_caucus.jpg' }
];

/** Individual endorsers. */
export const peopleEndorsements: Endorsement[] = endorsements.filter(
	(e) => e.category === 'person'
);

/** Business & organization endorsers. */
export const orgEndorsements: Endorsement[] = endorsements.filter(
	(e) => e.category === 'organization'
);
