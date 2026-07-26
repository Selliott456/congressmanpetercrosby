/**
 * Campaign press releases (English source). Spanish overrides:
 * $messages.pressReleases.byId[id] (title + summary + body).
 *
 * Content is transcribed from the campaign's release graphics (JPEGs in
 * static/press-releases/); the original image is offered as a download
 * (`attachment`) and a 16:9 top-crop is the card thumbnail (`image`).
 *
 * Rendered in three places:
 *   - /media           → the "Press Releases" section (all releases)
 *   - home page        → a row of the 3 most recent, under the Media section
 *   - /press/<id>      → the full release (detail page)
 */

export type PressReleaseBlock =
	| { type: 'p'; text: string }
	| { type: 'ul'; items: string[] }
	| { type: 'quote'; text: string; attribution?: string };

export type PressRelease = {
	/** Stable slug — also the `/press/<id>` URL. Keep it stable across edits. */
	id: string;
	/** ISO date (YYYY-MM-DD) — used to sort newest-first and for the dateline. */
	date: string;
	title: string;
	/** One–two sentence dek shown on cards and at the top of the release. */
	summary: string;
	/** Dateline location, e.g. "Providence, UT". */
	location?: string;
	/** The release body, as ordered prose/list/quote blocks. */
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

/** Campaign boilerplate that closes each release (English). */
const BOILERPLATE_EN =
	'Peter Crosby is a first-time congressional candidate, and is the Democratic nominee in Utah’s Congressional District 2. He is running a grassroots campaign — Peter is not accepting corporate PAC donations or funding from PACs aligned with foreign interests, and already has more named small-dollar, individual donors than the Moore Campaign. The Campaign is fully volunteer-supported with over 300 registered campaign volunteers. Peter believes citizens of Northern Utah deserve a representative that lives in the district, listens to their concerns, and puts the people of Utah ahead of party or the pursuit of personal power. He is holding public town halls throughout the district, with at least one in Cache, Box Elder, Davis, and Weber counties each month. More information is available at petercrosbyforcongress.org.';

export const pressReleases: PressRelease[] = [
	{
		id: 'debate-rescheduled',
		date: '2026-07-23',
		title:
			'Congressional District 2 Debate Rescheduled by Utah Debate Commission Following Public Response',
		summary:
			'In response to voter and candidate concern, the Utah Debate Commission has rescheduled the Congressional District 2 Debate to October 13th.',
		location: 'Providence, UT',
		body: [
			{
				type: 'p',
				text: 'Yesterday, the Utah Debate Commission announced the rescheduling of the Congressional District 2 (CD2) debate, which will now take place Tuesday, October 13th, 2026. This is one week earlier than originally planned and the day mail-in ballots are released. This is a win for Utah voters, who deserve to have the opportunity to evaluate each of the candidates in the only public debate currently scheduled before casting their ballots.'
			},
			{
				type: 'quote',
				text: 'Democracy depends on informed voters and accountable candidates. By moving this debate to October 13, Utahns will have the opportunity to hear directly from both candidates before voting begins. That’s good for voters, good for the electoral process, and good for Utah.',
				attribution: 'Brian King, Utah Democratic Party Chair'
			},
			{
				type: 'p',
				text: 'Democratic Congressional Candidate Peter Crosby and the Peter Crosby for Congress Campaign express their gratitude to the many Utahns who respectfully reached out to request this change. There is no doubt your voices were heard. The Campaign also wishes to thank the Utah Debate Commission, state legislative and political leaders, and the Moore Campaign, who listened to the residents of Utah and worked to find a suitable solution.'
			},
			{ type: 'p', text: BOILERPLATE_EN }
		],
		image: '/press-releases/debate-rescheduled-thumb.jpg',
		attachment: '/press-releases/debate-rescheduled.jpg'
	},
	{
		id: 'debate-scheduling-voter-choice',
		date: '2026-07-10',
		title:
			'Late Scheduling of Congressional Debate Negatively Impacts Voter Choice, Sparks Concern from CD2 Candidate Peter Crosby',
		summary:
			'After the release of the general election congressional debate schedule by the Utah Debate Commission, Peter Crosby, Democratic nominee for CD2, is concerned the October 20th debate with Blake Moore falls a full week after mail-in ballots have been sent out.',
		location: 'Providence, UT',
		body: [
			{
				type: 'p',
				text: 'On Thursday, the Utah Debate Commission released the dates of the four congressional debates ahead of the November 3rd general election. While the debates for all other congressional districts are scheduled to take place before mail-in ballots go out on October 13th, the debate for CD2 is scheduled for October 20th — one full week after the ballot release. Democratic candidate Peter Crosby expresses deep concern, as it means some voters will make decisions without having the opportunity to evaluate each of the candidates in the only public forum facilitated by a trusted authority.'
			},
			{
				type: 'p',
				text: 'In an environment where Utah voters are feeling increasingly disenfranchised by the political system, the belated timeline after ballots have been released is just one more way information is being held back from Northern Utah citizens who want to make informed decisions about their government. Citizens deserve timely information and the opportunity to consider their choices before casting ballots.'
			},
			{
				type: 'p',
				text: 'The Peter Crosby for Congress Campaign has reached out to the Utah Debate Commission to lodge a formal protest but has not received a response. The Campaign is appreciative of the work of the Utah Debate Commission to host fair debates and acknowledges the complexity of scheduling. While the Campaign is not requesting to choose a specific date for the debate, we do request it be moved before ballots arrive in voters’ mailboxes. According to the Office of the Lt. Governor, in the 2024 general election, 29% of Utah voters had already returned their ballots one week before election day. These numbers show the importance of ensuring voters have the ability to make informed choices once ballots are in hand.'
			},
			{
				type: 'quote',
				text: 'Voting is our core civic duty, and we as voters can’t do that responsibly if we don’t have all of the information. These debates are the only time voters will see all of the candidates on the same stage responding to questions. They deserve to know who wants to represent them before being asked to cast their vote.',
				attribution: 'Peter Crosby'
			},
			{
				type: 'p',
				text: 'It is imperative that the Utah Debate Commission continues to uphold a standard of fair, unbiased debate among candidates. It is a service that citizens depend on and helps hold candidates accountable to their constituents. The Campaign publicly requests the October 20th debate be rescheduled prior to the mail-in ballot release on October 13th and looks forward to a fair and spirited event.'
			},
			{ type: 'p', text: BOILERPLATE_EN }
		],
		image: '/press-releases/debate-scheduling-voter-choice-thumb.jpg',
		attachment: '/press-releases/debate-scheduling-voter-choice.jpg'
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
