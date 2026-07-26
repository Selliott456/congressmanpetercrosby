/**
 * Campaign press releases (English source). Spanish overrides:
 * $messages.pressReleases.byId[id] (title + summary + optional body).
 *
 * ⚠️ PLACEHOLDER CONTENT for layout testing — the three entries below are NOT
 * real campaign statements. Replace `title`, `summary`, and `body` with the
 * official release text (and update the Spanish byId overrides) before launch.
 * Source of truth is still TBD with the campaign (see TODO.md → Press Releases).
 *
 * Rendered in three places:
 *   - /media           → the "Press Releases" section (all releases)
 *   - home page        → a row of the 3 most recent, under the Media section
 *   - /press/<id>      → the full release (detail page)
 */

export type PressReleaseBlock =
	| { type: 'p'; text: string }
	| { type: 'ul'; items: string[] };

export type PressRelease = {
	/** Stable slug — also the `/press/<id>` URL. Keep it stable across edits. */
	id: string;
	/** ISO date (YYYY-MM-DD) — used to sort newest-first and for the dateline. */
	date: string;
	title: string;
	/** One–two sentence dek shown on cards and at the top of the release. */
	summary: string;
	/** Dateline location, e.g. "Logan, UT". */
	location?: string;
	/** The release body, as ordered prose/list blocks. */
	body: PressReleaseBlock[];
	/** Press-contact email shown in the release footer. */
	contactEmail?: string;
	/**
	 * Card thumbnail (the designed release graphic), path under `/press-releases/`.
	 * Shown on the `/media` section + home row cards, cropped to 16:9 (anchored top,
	 * so the headline stays visible). Optional: when omitted, the card falls back to
	 * the `attachment` file if that's an image, else the branded wordmark placeholder.
	 * Supply a purpose-made 16:9 crop here if the full graphic doesn't crop cleanly.
	 */
	image?: string;
	/**
	 * Optional path to the original release file — the source artifact, a **JPEG
	 * image or a PDF** — served from `static/press-releases/<slug>.<ext>`. When set,
	 * the detail page shows a "Download the release" link (labeled with the format).
	 * For a Spanish original, set `attachment` in the `es` `byId` override instead
	 * (falls back to this English one). NOTE: this is the downloadable original; the
	 * on-page text is always the transcribed `body` (accessible + translatable).
	 */
	attachment?: string;
};

export const pressReleases: PressRelease[] = [
	{
		id: 'placeholder-town-hall-series',
		date: '2026-07-22',
		title: 'Crosby Campaign Announces Northern Utah Town Hall Series',
		summary:
			'[Placeholder] A sample announcement used to test the press-release layout. Replace with the official release before publishing.',
		location: 'Logan, UT',
		body: [
			{
				type: 'p',
				text: '[Placeholder body — replace with the approved release text.] This paragraph stands in for the opening of a campaign press release so the page layout, spacing, and typography can be reviewed with realistic copy length. Swap it for the real announcement when content is ready.'
			},
			{
				type: 'p',
				text: 'A second paragraph continues the placeholder so multi-paragraph releases can be previewed. Add an approved pull quote, the schedule of stops, and any logistics here.'
			},
			{
				type: 'ul',
				items: [
					'[Placeholder] Detail or event line one',
					'[Placeholder] Detail or event line two',
					'[Placeholder] Detail or event line three'
				]
			}
		],
		contactEmail: 'press@petercrosbyforcongress.org'
	},
	{
		id: 'placeholder-statement-affordability',
		date: '2026-07-15',
		title: 'Statement on Northern Utah’s Cost-of-Living Crisis',
		summary:
			'[Placeholder] A sample statement used to test the press-release layout. Replace with the official release before publishing.',
		location: 'Ogden, UT',
		body: [
			{
				type: 'p',
				text: '[Placeholder body — replace with the approved statement text.] This stand-in paragraph lets the team preview how a shorter, statement-style release reads on the detail page and in the card grid.'
			},
			{
				type: 'p',
				text: 'A closing placeholder paragraph rounds out the statement so spacing between blocks can be checked before real content is added.'
			}
		],
		contactEmail: 'press@petercrosbyforcongress.org'
	},
	{
		id: 'placeholder-endorsement-announcement',
		date: '2026-07-08',
		title: 'Campaign Announces New Round of Community Endorsements',
		summary:
			'[Placeholder] A sample endorsement announcement used to test the press-release layout. Replace with the official release before publishing.',
		location: 'Brigham City, UT',
		body: [
			{
				type: 'p',
				text: '[Placeholder body — replace with the approved release text.] This paragraph previews an endorsement-style release. Replace it with the real list of endorsers and any accompanying quotes.'
			},
			{
				type: 'ul',
				items: [
					'[Placeholder] Endorser name and role',
					'[Placeholder] Endorser name and role',
					'[Placeholder] Endorser name and role'
				]
			}
		],
		contactEmail: 'press@petercrosbyforcongress.org'
	}
];

/** Press releases sorted newest-first. */
export const pressReleasesByRecent: PressRelease[] = [...pressReleases].sort((a, b) =>
	b.date.localeCompare(a.date)
);

/** The 3 most recent releases — the home-page row. */
export const homePressReleases: PressRelease[] = pressReleasesByRecent.slice(0, 3);

/** Look up a release by slug (for the `/press/<id>` detail route). */
export function getPressRelease(id: string): PressRelease | undefined {
	return pressReleases.find((r) => r.id === id);
}
