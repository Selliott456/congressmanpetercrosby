/**
 * Data for the /analytics dashboard.
 *
 * ⚠️ SOURCING RULE — read before adding anything here.
 * Every number on this page is published, attributable data. Two sources only:
 *   1. The campaign's August internal poll, transcribed from the 2026-08-21 press
 *      release (`pressReleases.ts` → 'august-internal-polling').
 *   2. The Deseret News / Hinckley Institute of Politics August 2026 statewide poll,
 *      as cited in that same release.
 *
 * Do NOT add modeled, projected, smoothed, or illustrative figures. This page is
 * public-facing on a campaign site; a fabricated trendline or win probability would
 * read as a real finding. If a series has no source, it does not belong here.
 *
 * Note what the source data does NOT contain, so nobody "fills it in" later:
 *   • no head-to-head Crosby-vs-Moore ballot test
 *   • no time series of polls (only one field period)
 *   • no county-level crosstabs
 *   • no forecast / win probability
 */

/** Shared methodology for the campaign's internal survey. */
export const INTERNAL_POLL = {
	pollster: 'Peter Crosby for Congress (internal)',
	/** Flagged prominently in the UI — this is a partisan-sponsored survey. */
	partisan: true,
	sampleSize: 565,
	population: 'randomized, registered voters',
	geography: 'Davis, Weber, Box Elder, Cache & Rich Counties (UT-02)',
	fieldStart: '2026-08-03',
	fieldEnd: '2026-08-17',
	fieldLabel: 'Aug 3–17, 2026',
	marginOfError: 4,
	releaseId: 'august-internal-polling',
	releaseDate: '2026-08-21'
} as const;

export const HINCKLEY_POLL = {
	pollster: 'Deseret News / Hinckley Institute of Politics',
	partisan: false,
	fieldLabel: 'August 2026',
	geography: 'Statewide (Utah)',
	url: 'https://www.deseret.com/politics/2026/08/17/utah-voters-disapprove-of-governor-cox-senator-lee-and-senator-curtis-in-new-poll/'
} as const;

/**
 * Validated diverging ramp for the Likert questions.
 * Blue (positive) ↔ amber/rust (negative) with a neutral gray for "unsure".
 * Checked with the dataviz palette validator on the #F7FAFC surface:
 * lightness band PASS · chroma floor PASS · CVD separation ΔE 21.3 (protan) ·
 * normal-vision floor ΔE 23.8. The two light steps sit below 3:1 contrast, so
 * every chart ships direct labels + a table view as the required relief.
 */
export const SCALE_COLORS = {
	posStrong: '#2E5FA0',
	posSoft: '#5FAEDE',
	negSoft: '#E8A33D',
	negStrong: '#A9501C',
	neutral: '#7A7A7A'
} as const;

/** One response option in an ordered (Likert) question. */
export type LikertSegment = {
	label: string;
	value: number;
	color: string;
	/** 'pos' and 'neg' arms diverge from the center; 'neutral' is shown separately. */
	side: 'pos' | 'neg' | 'neutral';
};

export type LikertQuestion = {
	id: string;
	/** Verbatim question wording, as asked. */
	question: string;
	/** Short label for nav/headings. */
	shortTitle: string;
	/** The finding, in plain language. */
	takeaway: string;
	segments: LikertSegment[];
	/** Percentage-point total of the negative arm — the headline for this question. */
	netNegative: number;
	responseRate?: number;
	source: string;
};

const INTERNAL_SOURCE = `Internal poll, Peter Crosby for Congress. ${INTERNAL_POLL.sampleSize} randomized registered voters across ${INTERNAL_POLL.geography}, ${INTERNAL_POLL.fieldLabel}. ±${INTERNAL_POLL.marginOfError}% margin of error.`;

export const likertQuestions: LikertQuestion[] = [
	{
		id: 'satisfaction',
		question: 'How satisfied are you with our current representative (Rep. Blake Moore)?',
		shortTitle: 'Satisfaction with Rep. Moore',
		takeaway:
			'57% of district voters report dissatisfaction with the incumbent; 43% report satisfaction.',
		segments: [
			{ label: 'Very satisfied', value: 9, color: SCALE_COLORS.posStrong, side: 'pos' },
			{ label: 'Somewhat satisfied', value: 34, color: SCALE_COLORS.posSoft, side: 'pos' },
			{ label: 'Somewhat dissatisfied', value: 25, color: SCALE_COLORS.negSoft, side: 'neg' },
			{ label: 'Very dissatisfied', value: 32, color: SCALE_COLORS.negStrong, side: 'neg' }
		],
		netNegative: 57,
		responseRate: 89,
		source: INTERNAL_SOURCE
	},
	{
		id: 'vote-likelihood',
		question: 'How likely are you to vote for Blake Moore this November?',
		shortTitle: 'Likelihood to re-elect',
		takeaway:
			'30% say they are likely to vote for the incumbent. 70% are unlikely to, or undecided.',
		segments: [
			{ label: 'Very likely', value: 13, color: SCALE_COLORS.posStrong, side: 'pos' },
			{ label: 'Somewhat likely', value: 17, color: SCALE_COLORS.posSoft, side: 'pos' },
			{ label: 'Somewhat unlikely', value: 11, color: SCALE_COLORS.negSoft, side: 'neg' },
			{ label: 'Very unlikely', value: 40, color: SCALE_COLORS.negStrong, side: 'neg' },
			{ label: 'Unsure', value: 19, color: SCALE_COLORS.neutral, side: 'neutral' }
		],
		netNegative: 70,
		source: INTERNAL_SOURCE
	}
];

/**
 * Soft support for the incumbent, by party. Share saying they are unlikely to vote
 * for Rep. Moore, or are unsure. Reported in the release prose as crosstabs.
 */
export type CrosstabRow = {
	/** Stable id — keys the Spanish override in `$messages.analytics.byId`. */
	id: string;
	group: string;
	value: number;
	/** Share of the district electorate this group represents, where reported. */
	electorateShare?: number;
	note?: string;
};

export const softSupportByParty: CrosstabRow[] = [
	{
		id: 'soft-all',
		group: 'All district voters',
		value: 70,
		note: 'Unlikely to vote for Moore, or unsure'
	},
	{
		id: 'soft-unaffiliated',
		group: 'Unaffiliated & independent',
		value: 47,
		electorateShare: 43,
		note: 'Unlikely to vote for Moore'
	},
	{
		id: 'soft-republican',
		group: 'Registered Republicans',
		value: 33,
		note: 'Unlikely to vote for Moore, or unsure'
	}
];

/** Top-priority issues, overall and by party. Percent naming each a top priority. */
export type IssuePriority = {
	/** Stable id — keys the Spanish override in `$messages.analytics.byId`. */
	id: string;
	issue: string;
	detail: string;
	all: number;
	republican: number;
	unaffiliated: number;
};

export const issuePriorities: IssuePriority[] = [
	{
		id: 'issue-affordability',
		issue: 'Affordability',
		detail: 'Housing, healthcare & food prices',
		all: 79,
		republican: 73,
		unaffiliated: 80
	},
	{
		id: 'issue-accountability',
		issue: 'Government accountability',
		detail: 'Ethics, insider trading & closing loopholes',
		all: 68,
		republican: 65,
		unaffiliated: 71
	}
];

/**
 * Statewide job approval, Deseret News / Hinckley Institute, August 2026.
 * `approve`/`disapprove` are percentages; net is derived. Curtis's disapproval and
 * the Congress figures were not broken out in the cited reporting — only the
 * numbers actually published appear here.
 */
export type ApprovalRow = {
	/** Stable id — keys the Spanish override in `$messages.analytics.byId`. */
	id: string;
	name: string;
	role: string;
	approve: number | null;
	disapprove: number | null;
	/** Published net figure, used when the components were not both reported. */
	net: number;
};

export const statewideApproval: ApprovalRow[] = [
	{ id: 'appr-cox', name: 'Gov. Spencer Cox', role: 'Governor', approve: 41, disapprove: 49, net: -8 },
	{ id: 'appr-lee', name: 'Sen. Mike Lee', role: 'U.S. Senate', approve: 39, disapprove: 46, net: -7 },
	{
		id: 'appr-legislature',
		name: 'Utah State Legislature',
		role: 'State legislature',
		approve: 44,
		disapprove: 45,
		net: -1
	},
	{
		id: 'appr-congress',
		name: 'U.S. Congress',
		role: 'Institution',
		approve: null,
		disapprove: null,
		net: -30
	}
];

/** Gov. Cox's approval, January vs August 2026 — the only two-point trend published. */
export const coxApprovalTrend = {
	label: 'Gov. Spencer Cox job approval',
	points: [
		{ period: 'January 2026', value: 51 },
		{ period: 'August 2026', value: 41 }
	],
	source: `${HINCKLEY_POLL.pollster}, ${HINCKLEY_POLL.fieldLabel}. Statewide.`
};

/**
 * Campaign organizing metrics reported in the August release. These are campaign-
 * reported operational counts, not survey results — labeled as such in the UI.
 */
export const groundGame = [
	{
		id: 'ground-townhalls',
		label: 'In-person town halls',
		value: 28,
		unit: '',
		note: 'Held across UT-02 since launch'
	},
	{
		id: 'ground-virtual',
		label: 'Virtual town halls',
		value: 4,
		unit: '',
		note: 'For expanded accessibility'
	},
	{
		id: 'ground-volunteers',
		label: 'Registered volunteers',
		value: 400,
		unit: '+',
		// Was "One of the largest in the state" — a comparative claim with no published
		// source behind it, which the sourcing rule above does not allow.
		note: 'Signed up since launch'
	},
	{
		id: 'ground-donors',
		label: 'Individual donors',
		value: 550,
		unit: '+',
		note: 'No corporate PAC money accepted'
	}
];

/** Headline figures for the KPI row. */
export const headlineStats = [
	{
		id: 'dissatisfied',
		value: 57,
		unit: '%',
		label: 'Dissatisfied with Rep. Moore',
		sub: 'Somewhat or very dissatisfied'
	},
	{
		id: 'soft-support',
		value: 70,
		unit: '%',
		label: 'Unlikely to re-elect, or unsure',
		sub: '30% say they are likely to'
	},
	{
		id: 'gop-waver',
		value: 33,
		unit: '%',
		label: 'Republicans unlikely to back Moore',
		sub: 'Includes those who are unsure'
	},
	{
		id: 'affordability',
		value: 79,
		unit: '%',
		label: 'Name affordability a top priority',
		sub: 'Highest-ranked issue in the district'
	}
];
