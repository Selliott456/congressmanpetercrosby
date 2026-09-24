/**
 * Data for the Data Room (/data-room; the page was /analytics until Sep 2026).
 *
 * ⚠️ SOURCING RULE — read before adding anything here.
 * Every number on this page is real, attributable data — never modeled. Sources:
 *   1. The campaign's August internal poll, transcribed from the 2026-08-21 press
 *      release (`pressReleases.ts` → 'august-internal-polling').
 *   2. The campaign's September internal poll (Sep 8–10). The ballot test — overall
 *      and for Republicans and Unaffiliated voters — is in the 2026-09-14 press release
 *      (`pressReleases.ts` → 'september-internal-polling'). The top-concerns crosstabs
 *      (`topConcerns`) were supplied by the campaign ("Weekly Polling — Press Release"
 *      draft, 2026-09-13); the release itself carries only the all-voter shares.
 *   3. The Deseret News / Hinckley Institute of Politics August 2026 statewide poll,
 *      as cited in the August release.
 *   4. Campaign-reported organizing counts (`groundGame`), as stated in releases.
 *   5. The campaign's week-of-Sept-21 internal poll, transcribed from the deck the
 *      campaign supplied ("Weekly Polling — Week of 9.21.2026", received 2026-09-23).
 *      It repeats September's questions, which is what makes the trend charts possible.
 *      No press release carries it yet; it is published here under the approval below.
 * The campaign approved (2026-09-14) publishing its own poll data here beyond what a
 * press release shows, so the Data Room can carry fuller crosstabs than a release. That
 * covers data the CAMPAIGN supplies, with its poll's full methodology — not figures we
 * derive, estimate, or take from anywhere else.
 *
 * Two kinds of figure are derived rather than transcribed, and both are plain
 * arithmetic on published numbers:
 *   • the September party-group sample sizes (`SEP_GROUP_N`), reconstructed from
 *     the published percentages — see that constant (the week-of-Sept-21 deck
 *     publishes its group sizes, so `SEP21_GROUP_N` is transcribed, not derived);
 *   • party-group margins of error, computed from those sizes (`marginOfError`),
 *     and labeled as calculated wherever they appear — as is the week-of-Sept-21
 *     poll's full-sample margin, which its deck does not state.
 * Do NOT add modeled, projected, smoothed, or illustrative figures. This page is
 * public-facing on a campaign site; a fabricated trendline or win probability
 * would read as a real finding. If a series has no source, it does not belong here.
 *
 * Note what the polls do NOT contain, so nobody "fills it in":
 *   • no ballot-test figures for Democrats or other-party voters — neither September
 *     survey breaks the question out for them (the by-party chart's note says so)
 *   • no county-level crosstabs
 *   • no forecast / win probability
 * The ballot test now has two readings (Sep 8–10 and the week of Sep 21), so a trend
 * exists where it did not before; that item is gone from `limits.items` accordingly.
 * Two readings is still a short series — do not extrapolate it.
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
	/** True when the pollster published no margin and this one is calculated from `n`. */
	moeCalculated?: boolean;
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
	'internal-sep21-2026': {
		id: 'internal-sep21-2026',
		partisan: true,
		sampleSize: 738,
		// The campaign's deck states no margin of error, so this is calculated from the
		// sample size the same way party-group margins are (see `marginOfError`), and is
		// labeled as calculated everywhere it appears.
		marginOfError: 3.6,
		moeCalculated: true,
		// The deck is titled "Week of 9.21.2026" and gives no exact field dates; both
		// bounds are the Monday of that week, used only for ordering. The reader-facing
		// label is the honest "Week of Sept 21, 2026" (`polls[...].fieldLabel`).
		fieldStart: '2026-09-21',
		fieldEnd: '2026-09-21'
	},
	'internal-sep-2026': {
		id: 'internal-sep-2026',
		partisan: true,
		sampleSize: 762,
		marginOfError: 4,
		fieldStart: '2026-09-08',
		fieldEnd: '2026-09-10',
		releaseId: 'september-internal-polling',
		releaseDate: '2026-09-14'
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
export const FEATURED_POLL_ID = 'internal-sep21-2026';

/** Page dateline (ISO). Bump whenever data is added or revised. */
export const LAST_UPDATED = '2026-09-23';

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
 * at the ends, the worst neighbor pair is CVD ΔE 19.0 · normal-vision ΔE 19.2. Other
 * and None sit below 3:1 contrast, so they ship with in-bar labels
 * where they fit, a legend, a tooltip and the table view. "Unsure" was darkened from
 * #6E7885 (Sep 2026) so its white in-bar labels clear WCAG AA: 4.61:1, was 4.48.
 */
export const RESPONSE_GRAYS = {
	other: '#A9B0B8',
	unsure: '#6C7683',
	none: '#CDD3D9'
} as const;

/** Single-series charts (magnitude, not identity) take the brand's civic blue. */
export const SERIES_COLOR = '#2E5FA0';

/**
 * Sequential ramp for magnitude grids (the heatmap), light → dark on civic blue.
 * Validator (ordinal): lightness monotone · adjacent ΔL ≥ 0.06 · single hue (5°) ·
 * light end 2.22:1 on the surface, so even the lightest cell stays visible.
 * The heatmap uses the stops as solid steps, never a blend between them: each stop
 * clears 4.5:1 with the label `inkOn` picks (deep navy on the two light steps, white
 * on the rest), while a blend passes through mid-blues where no label color does.
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

/**
 * Respondents per group, week-of-Sept-21 poll. Unlike September, this deck publishes
 * the party counts outright ("Demo - Party"), so nothing is reconstructed: Republican
 * 440, Democratic 101, Unaffiliated 167, Other 30 — summing to the full 738, with no
 * no-party-on-file remainder. The crosstab percentages resolve to whole respondents at
 * exactly these sizes (72.73% of 440 = 320; 80.84% of 167 = 135; 76.67% of 30 = 23).
 */
export const SEP21_GROUP_N: Record<GroupKey, number> = {
	all: 738,
	democratic: 101,
	republican: 440,
	unaffiliated: 167,
	other: 30
};

/** Group sizes per poll, so a chart can size its own margins. */
export const GROUP_N: Record<string, Record<GroupKey, number>> = {
	'internal-sep21-2026': SEP21_GROUP_N,
	'internal-sep-2026': SEP_GROUP_N
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

/** One survey's answers to the ballot question. */
export type BallotReading = {
	pollId: string;
	all: BallotRow;
	byParty: BallotRow[];
};

/**
 * "If the election were held today, who would you vote for?" Asked in both September
 * surveys, for all voters and — by party — for Republicans and unaffiliated voters
 * only. Both surveys leave Democrats and other-party voters out of this question.
 *
 * ➤ Newest first, one entry per survey. A later poll repeating the question is added
 *   as another reading rather than overwriting one; that is what the trend reads.
 */
export const ballotReadings: BallotReading[] = [
	{
		pollId: 'internal-sep21-2026',
		all: {
			group: 'all',
			shares: { crosby: 34.01, moore: 30.22, other: 2.98, unsure: 25.47, none: 7.32 }
		},
		byParty: [
			{
				group: 'republican',
				shares: { crosby: 20.2, moore: 43.4, other: 3.2, unsure: 24.1, none: 9.1 }
			},
			{
				group: 'unaffiliated',
				shares: { crosby: 40.1, moore: 15.6, other: 1.8, unsure: 35.9, none: 6.6 }
			}
		]
	},
	{
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
	}
];

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

const sep21Concerns: Dataset<ConcernRow> = {
	pollId: 'internal-sep21-2026',
	rows: [
		{
			id: 'issue-affordability',
			issue: 'Affordability',
			detail: 'Housing, healthcare & food prices',
			shares: {
				all: 76.8,
				democratic: 88.12,
				republican: 72.73,
				unaffiliated: 80.84,
				other: 76.67
			}
		},
		{
			id: 'issue-accountability',
			issue: 'Government accountability',
			detail: 'Ethics, insider trading & closing loopholes',
			shares: {
				all: 69.0,
				democratic: 78.22,
				republican: 64.32,
				unaffiliated: 72.46,
				other: 86.67
			}
		},
		{
			id: 'issue-great-salt-lake',
			issue: 'The Great Salt Lake',
			shares: { all: 46.3, democratic: 63.37, republican: 40.91, unaffiliated: 47.9, other: 60.0 }
		},
		{
			id: 'issue-public-lands',
			issue: 'Access to public lands',
			shares: {
				all: 30.8,
				democratic: 43.56,
				republican: 25.68,
				unaffiliated: 34.13,
				other: 43.33
			}
		},
		{
			id: 'issue-doge',
			issue: 'DOGE cuts',
			shares: {
				all: 27.1,
				democratic: 44.55,
				republican: 19.77,
				unaffiliated: 34.13,
				other: 36.67
			}
		},
	{
		id: 'issue-other',
		issue: 'Other',
		shares: { all: 14.0, democratic: 13.86, republican: 13.64, unaffiliated: 16.17, other: 6.67 }
	}
]
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

/**
 * Both September readings of the concerns question, newest first. Row ids match across
 * readings (and back to August's `issuePriorities`), which is how the change charts
 * pair them up.
 */
export const concernReadings: Dataset<ConcernRow>[] = [sep21Concerns, topConcerns];

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
 * current figure (35 as of September 2026, shown as 35+ because they host weekly; an
 * earlier "over 40" was corrected by the campaign), which counts in-person and virtual
 * together. The August release's split (28 in person, 4 virtual) is out of date and no
 * newer split has been published, so the page shows one combined total.
 */
export const groundGame = [
	{
		id: 'ground-townhalls',
		label: 'Town halls',
		value: 35,
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
	},
	{
		// September 14 release: "has raised just over $100,000 from small-dollar and
		// individual donors, with over 95% coming from right here in Utah."
		id: 'ground-raised',
		label: 'Raised',
		prefix: '$',
		value: 100,
		unit: 'K+',
		note: 'From small-dollar and individual donors, over 95% in Utah'
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
		// The release gives this group's "unlikely" share only — no unsure split — so
		// it is a separate tile, never on an axis beside the "unlikely or unsure" figures.
		id: 'unaffiliated-waver',
		value: 47,
		unit: '%',
		label: 'Unaffiliated voters unlikely to back Moore',
		sub: 'Unaffiliated and independent voters, 43% of the electorate. Excludes those who are unsure.'
	},
	{
		id: 'affordability',
		value: 79,
		unit: '%',
		label: 'Name affordability a top priority',
		sub: 'Highest-ranked issue in the district'
	}
];
