/**
 * Data for the /analytics dashboard.
 *
 * ⚠️ SOURCING RULE — read before adding anything here.
 * Every number on this page is published, attributable data. Three sources only:
 *   1. The campaign's August internal poll, transcribed from the 2026-08-21 press
 *      release (`pressReleases.ts` → 'august-internal-polling').
 *   2. The campaign's September internal poll (Sep 8–10), transcribed from the
 *      crosstab charts in the campaign's September release ("Weekly Polling —
 *      Press Release", received 2026-09-13). Add its `releaseId` below once the
 *      release is posted to /press.
 *   3. The Deseret News / Hinckley Institute of Politics August 2026 statewide poll,
 *      as cited in the August release.
 *
 * Two kinds of figure are derived rather than transcribed, and both are plain
 * arithmetic on published numbers:
 *   • the September party-group sample sizes (`SEP_GROUP_N`), reconstructed from
 *     the published percentages — see that constant;
 *   • party-group margins of error, computed from those sizes (`marginOfError`),
 *     and labeled as calculated wherever they appear.
 * Do NOT add modeled, projected, smoothed, or illustrative figures. This page is
 * public-facing on a campaign site; a fabricated trendline or win probability
 * would read as a real finding. If a series has no source, it does not belong here.
 *
 * Note what the polls do NOT contain, so nobody "fills it in":
 *   • no ballot-test trend — the Crosby-vs-Moore question has been asked once
 *   • no ballot-test figures for Democrats or other-party voters (not in the
 *     release; the by-party chart's note says so)
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
	'internal-sep-2026': {
		id: 'internal-sep-2026',
		partisan: true,
		sampleSize: 762,
		marginOfError: 4,
		fieldStart: '2026-09-08',
		fieldEnd: '2026-09-10'
	},
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

/** The newest district poll. Its sample size fills `{n}` in the limits panel. */
export const FEATURED_POLL_ID = 'internal-sep-2026';

/** Page dateline (ISO). Bump whenever data is added or revised. */
export const LAST_UPDATED = '2026-09-13';

/** A set of rows and the poll they came from, so a chart can cite its own source
    instead of inheriting a page-level one. */
export type Dataset<T> = {
	/** Keys `POLLS` and `$messages.analytics.polls`. */
	pollId: string;
	rows: T[];
};

// ── Chart colors ─────────────────────────────────────────────────────────────
// Every set below was run through the dataviz palette validator against the page
// surface (#F7FAFC); results are noted with each. Re-run it before changing one.
// Mirrored on the Data page of style_guide.html — keep the two in sync.

/**
 * Candidate identity: civic blue for Crosby, brick red for Moore — the party
 * convention readers bring to a ballot chart. Reserved for the candidates: no other
 * series on this page may use a blue or red that could be read as either of them.
 * Validator: CVD ΔE 16.0 (protan) · normal-vision ΔE 25.1 · both ≥ 3:1 contrast.
 */
export const CANDIDATE_COLORS = {
	crosby: '#2E5FA0',
	moore: '#B8473D'
} as const;

/**
 * The ballot's non-candidate answers, in grays — they are nobody's side. The darkest
 * gray is "Unsure" and sits in the middle of the bar: grays in lightness order were
 * too close to tell apart (normal-vision ΔE 12–13); in this order, with the candidates
 * at the ends, the worst neighbor pair is CVD ΔE 18.4 · normal-vision ΔE 18.6. Other
 * and None sit below 3:1 contrast, so they ship with in-bar labels
 * where they fit, a legend, a tooltip and the table view.
 */
export const RESPONSE_GRAYS = {
	other: '#A9B0B8',
	unsure: '#6E7885',
	none: '#CDD3D9'
} as const;

/** Single-series charts (magnitude, not identity) take the brand's civic blue. */
export const SERIES_COLOR = '#2E5FA0';

/**
 * Sequential ramp for magnitude grids (the heatmap), light → dark on civic blue.
 * Validator (ordinal): lightness monotone · adjacent ΔL ≥ 0.06 · single hue (5°) ·
 * light end 2.22:1 on the surface, so even the lightest cell stays visible.
 */
export const SEQUENTIAL_RAMP = ['#8AADD6', '#6189C0', '#2E5FA0', '#1F4478', '#132B4E'];

/** Before → after comparisons: one hue, two shades from the ramp (earlier = light). */
export const CHANGE_COLORS = {
	from: SEQUENTIAL_RAMP[0],
	to: SEQUENTIAL_RAMP[2]
} as const;

/**
 * Diverging scale for sentiment and approval (Likert, net approval): teal-green for
 * favorable answers, olive-gold for unfavorable ones, gray for "unsure". It avoids blue
 * and red on purpose: those are the candidates' colors, and a reader who learns "blue is
 * Crosby" must not then find "satisfied with Moore" drawn in blue.
 * Validator: all gates pass (worst neighbor CVD ΔE 12.2 · normal-vision ΔE 17.0). The
 * soft steps sit near 2.1:1 contrast, so these charts keep in-bar labels and the table
 * view. Against the candidates, full-color readers get clear separation (strong teal vs
 * Crosby blue ΔE 17.4, dark gold vs Moore red ΔE 16.3). For colorblind readers the dark
 * gold and Moore's red converge (CVD ΔE 4.9), which is acceptable only because every
 * segment is labeled — never rely on color alone for these. (Purples all collapsed into
 * the blue and darker golds into the red, which is why the poles are teal and olive.)
 */
export const SCALE_COLORS = {
	posStrong: '#0F8B6F',
	posSoft: '#5BBFA8',
	negSoft: '#DDA640',
	negStrong: '#6E6000',
	neutral: RESPONSE_GRAYS.unsure
} as const;

// ── August internal poll ─────────────────────────────────────────────────────

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

/**
 * Top-priority issues in August, overall and by party. Percent naming each a top
 * priority, in whole points as released. September asked the same question (see
 * `topConcerns`); the two are compared by matching `id`.
 */
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

// ── September internal poll ──────────────────────────────────────────────────

/** Party groups in the September crosstabs. */
export type GroupKey = 'all' | 'democratic' | 'republican' | 'unaffiliated' | 'other';

/** Column order for party breakouts: the reference group first. */
export const GROUP_ORDER: GroupKey[] = ['all', 'democratic', 'republican', 'unaffiliated', 'other'];

/**
 * Respondents per group, September poll. Only the total (762) is published. The
 * group sizes are reconstructed from the published percentages: every share in the
 * release resolves to a whole number of respondents at exactly these sizes (72.29%
 * of 350 = 253; 79.82% of 109 = 87; 73.33% of 75 = 55; 80.00% of 45 = 36), and at no
 * nearby size. 183 respondents have no party on file, so the groups sum to 579.
 */
export const SEP_GROUP_N: Record<GroupKey, number> = {
	all: 762,
	democratic: 75,
	republican: 350,
	unaffiliated: 109,
	other: 45
};

/** Groups smaller than this are flagged as small samples wherever they appear. */
export const SMALL_SAMPLE_N = 100;

/**
 * Maximum margin of error, in percentage points, for a simple random sample of `n`
 * at 95% confidence (p = 0.5). Used only for party groups, whose margins the release
 * does not state; the full sample keeps its published ±4.
 */
export function marginOfError(n: number): number {
	return 1.96 * Math.sqrt(0.25 / n) * 100;
}

export type BallotOption = 'crosby' | 'moore' | 'other' | 'unsure' | 'none';

/** Display order: Crosby anchors the left edge, Moore the right, the rest between. */
export const BALLOT_ORDER: BallotOption[] = ['crosby', 'other', 'unsure', 'none', 'moore'];

export const BALLOT_COLORS: Record<BallotOption, string> = {
	crosby: CANDIDATE_COLORS.crosby,
	other: RESPONSE_GRAYS.other,
	unsure: RESPONSE_GRAYS.unsure,
	none: RESPONSE_GRAYS.none,
	moore: CANDIDATE_COLORS.moore
};

/** One group's answers to the ballot question, in percent, as published. */
export type BallotRow = {
	group: GroupKey;
	shares: Record<BallotOption, number>;
};

/**
 * "If the election were held today, who would you vote for?" The release reports it
 * for all voters and, by party, for Republicans and unaffiliated voters only.
 *
 * ➤ If a later poll repeats the question, add it as a second reading keyed by its
 *   own `pollId` rather than overwriting this one; that is what a trend needs.
 */
export const ballotTest: {
	pollId: string;
	all: BallotRow;
	byParty: BallotRow[];
} = {
	pollId: 'internal-sep-2026',
	all: {
		group: 'all',
		shares: { crosby: 30.71, moore: 32.41, other: 3.28, unsure: 25.07, none: 8.53 }
	},
	byParty: [
		{
			group: 'republican',
			shares: { crosby: 18.0, moore: 45.7, other: 3.7, unsure: 24.0, none: 8.6 }
		},
		{
			group: 'unaffiliated',
			shares: { crosby: 39.4, moore: 16.5, other: 2.8, unsure: 30.3, none: 11.0 }
		}
	]
};

/**
 * "Please let us know your top concerns (multiple selections possible)." Percent of
 * each group naming each concern, as published; shares sum past 100% by design.
 * Affordability and accountability share their ids (and wording) with August's
 * `issuePriorities`, which is how the August → September chart pairs them.
 */
export type ConcernRow = {
	/** Stable id — keys the Spanish override in `$messages.analytics.byId`. */
	id: string;
	issue: string;
	detail?: string;
	shares: Record<GroupKey, number>;
};

export const topConcerns: Dataset<ConcernRow> = {
	pollId: 'internal-sep-2026',
	rows: [
		{
			id: 'issue-affordability',
			issue: 'Affordability',
			detail: 'Housing, healthcare & food prices',
			shares: { all: 74.4, democratic: 73.33, republican: 72.29, unaffiliated: 79.82, other: 80.0 }
		},
		{
			id: 'issue-accountability',
			issue: 'Government accountability',
			detail: 'Ethics, insider trading & closing loopholes',
			shares: { all: 69.8, democratic: 82.67, republican: 66.29, unaffiliated: 71.56, other: 75.56 }
		},
		{
			id: 'issue-great-salt-lake',
			issue: 'The Great Salt Lake',
			shares: { all: 43.6, democratic: 60.0, republican: 38.0, unaffiliated: 51.38, other: 44.44 }
		},
		{
			id: 'issue-public-lands',
			issue: 'Access to public lands',
			shares: { all: 28.5, democratic: 40.0, republican: 21.71, unaffiliated: 39.45, other: 28.89 }
		},
		{
			id: 'issue-doge',
			issue: 'DOGE cuts',
			shares: { all: 24.0, democratic: 52.0, republican: 19.43, unaffiliated: 23.85, other: 22.22 }
		},
		{
			id: 'issue-other',
			issue: 'Other',
			shares: { all: 13.0, democratic: 14.67, republican: 10.86, unaffiliated: 13.76, other: 24.44 }
		}
	]
};

// ── Statewide (Deseret News / Hinckley Institute) ────────────────────────────

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
 * Campaign-reported operational counts, not survey results — labeled as such in the UI.
 * Volunteers and donors are as of the August release. Town halls use the campaign's own
 * current figure (over 40 as of September 2026), which counts in-person and virtual
 * together. The August release's split (28 in person, 4 virtual) is out of date and no
 * newer split has been published, so the page shows one combined total.
 */
export const groundGame = [
	{
		id: 'ground-townhalls',
		label: 'Town halls',
		value: 40,
		unit: '+',
		note: 'In person and virtual, across UT-02 since launch'
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

/** Headline figures for the August snapshot and KPI row. */
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
