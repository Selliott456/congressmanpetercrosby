/**
 * The Utah Debate Commission's CD2 debate (October 13, 2026) — the one publicly moderated
 * debate of the race, now a recording rather than an upcoming event.
 *
 * Single source for the places that link to it: the permanent watch banner in the home
 * media section and the event card on /events. The debate's media card in `media.ts`
 * carries the same video id separately — change both together.
 */
export const DEBATE = {
	/** The event's id in `events.ts`, so the two stay associated. */
	eventId: 'gcal-0v2436r6dda91cpnk1t5a2b69a',
	/**
	 * "Utah 2nd Congressional District 2026 General Election Debate", on the Commission's
	 * own channel (@utahdebatecommission9658). Confirmed still live 2026-10-14.
	 *
	 * ⚠️ The Commission has already replaced this video once: the first id (iP-GniMoGXQ)
	 * was removed by the uploader on debate day and reposted under this one. A YouTube id
	 * normally survives from stream to recording, but theirs has not — re-check this link
	 * if anything looks wrong, and remember `media.ts` holds the same id.
	 */
	url: 'https://www.youtube.com/watch?v=28N9EFEzPZk'
} as const;
