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
 * Note what the AUGUST internal poll does NOT contain, so nobody "fills it in":
 *   • no head-to-head Crosby-vs-Moore ballot test
 *   • no time series of polls (only one field period)
 *   • no county-level crosstabs
 *   • no forecast / win probability
 *
 * ⚠️ These absences are also stated publicly, in `$messages.analytics.limits`.
 * When a new poll supplies one of them, delete that item from `limits.items` in
 * BOTH dictionaries in the same change — otherwise the page goes on telling
 * readers a figure does not exist while displaying it.
 */

/**
 * Every poll this page draws on, keyed by a stable id.
 *
 * Only non-translatable facts live here — sample sizes, margins, dates, links.
 * The prose that goes with a poll (pollster name, surveyed population, geography,
 * field label, partisanship line) lives in `$messages.analytics.polls[id]`,
 * because it has to exist in English and Spanish.
 *
 * ➤ ADDING A POLL: add an entry here, then add the matching entry to
 *   `analytics.polls` in BOTH `pages-en.ts` and `pages-es.ts`. `pagesEs` is typed
 *   as the shape of `pagesEn`, so a missing Spanish entry is a type error rather
 *   than English text silently shipping to Spanish readers.
 */
export type Poll = {
	id: string;
	/** True when this campaign paid for the survey — surfaced prominently in the UI. */
	partisan: boolean;
	/** Null when the pollster did not publish the figure. */
	sampleSize: number | null;
	marginOfError: number | null;
	/** ISO field dates — used for ordering and for the page dateline. */
	fieldStart: string;
	fieldEnd: string;
	/** Press-release slug on this site, when the campaign released the poll itself. */
	releaseId?: string;
	releaseDate?: string;
	/** External link, when someone else published it. */
	url?: string;
};

export const POLLS: Record<string, Poll> = {
	'internal-aug-2026': {
		id: 'internal-aug-2026',
		partisan: true,
		sampleSize: 565,
		marginOfError: 4,
		fieldStart: '2026-08-03',
		fieldEnd: '2026-08-17',
		releaseId: 'august-internal-polling',
		releaseDate: '2026-08-21'
	},
	'hinckley-aug-2026': {
		id: 'hinckley-aug-2026',
		partisan: false,
		sampleSize: null,
		marginOfError: null,
		fieldStart: '2026-08-01',
		fieldEnd: '2026-08-31',
		url: 'https://www.deseret.com/politics/2026/08/17/utah-voters-disapprove-of-governor-cox-senator-lee-and-senator-curtis-in-new-poll/'
	}
};

/**
 * The internal poll whose figures headline the District polling section — its
 * field dates, sample and margin fill the snapshot block. Point this at the newer
 * poll when one supersedes it.
 */
export const FEATURED_POLL_ID = 'internal-aug-2026';

/** Page dateline (ISO). Bump whenever data is added or revised. */
export const LAST_UPDATED = '2026-08-21';

/** A set of rows and the poll they came from, so a chart can cite its own source
    instead of inheriting a page-level one. */
export type Dataset<T> = {
	/** Keys `POLLS` and `$messages.analytics.polls`. */
	pollId: string;
	rows: T[];
};

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
	/** Which poll asked it — keys `POLLS`. The chart builds its source line from this. */
	pollId: string;
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
};

export const likertQuestions: LikertQuestion[] = [
	{
		id: 'satisfaction',
		pollId: 'internal-aug-2026',
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
		responseRate: 89
	},
	{
		id: 'vote-likelihood',
		pollId: 'internal-aug-2026',
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
		netNegative: 70
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

export const softSupportByParty: Dataset<CrosstabRow> = {
	pollId: 'internal-aug-2026',
	rows: [
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
	]
};

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

export const issuePriorities: Dataset<IssuePriority> = {
	pollId: 'internal-aug-2026',
	rows: [
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
	]
};

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

export const statewideApproval: Dataset<ApprovalRow> = {
	pollId: 'hinckley-aug-2026',
	rows: [
		{
			id: 'appr-cox',
			name: 'Gov. Spencer Cox',
			role: 'Governor',
			approve: 41,
			disapprove: 49,
			net: -8
		},
		{
			id: 'appr-lee',
			name: 'Sen. Mike Lee',
			role: 'U.S. Senate',
			approve: 39,
			disapprove: 46,
			net: -7
		},
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
	]
};

/** Gov. Cox's approval, January vs August 2026 — the only two-point trend published. */
export const coxApprovalTrend = {
	pollId: 'hinckley-aug-2026',
	label: 'Gov. Spencer Cox job approval',
	points: [
		{ period: 'January 2026', value: 51 },
		{ period: 'August 2026', value: 41 }
	]
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
