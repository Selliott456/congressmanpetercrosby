/**
 * The Utah Debate Commission's CD2 debate — the one publicly moderated debate before
 * election day.
 *
 * Single source for the three places that promote it (home media section, the /media
 * Featured band, and the event card on /events), so the link only has to change once.
 *
 * ⚠️ The times here are the BROADCAST window (6–8 PM MT). The campaign's Airtable entry
 * blocks 5–9 PM, which is the candidate's hold, not what viewers should tune in for —
 * see the note on this event in `events.ts`.
 */
export const DEBATE = {
	/** The event's id in `events.ts`, so the two stay associated. */
	eventId: 'gcal-0v2436r6dda91cpnk1t5a2b69a',
	/**
	 * The Commission's live stream for this debate — "Utah 2nd Congressional District 2026
	 * General Election Debate", on its own channel (@utahdebatecommission9658), verified
	 * 2026-10-12. It replaced the bare channel link once the Commission published the
	 * stream. YouTube keeps the same URL for the recording afterwards, so this does not
	 * need swapping again.
	 */
	url: 'https://www.youtube.com/watch?v=iP-GniMoGXQ',
	/**
	 * Broadcast end as a fixed instant (2026-10-13 8:00 PM MDT = 02:00 UTC the next day).
	 * A UTC instant rather than a local date so the callouts disappear at the same real
	 * moment for every viewer, wherever they are.
	 */
	endsAt: Date.UTC(2026, 9, 14, 2, 0, 0)
} as const;

/**
 * True once the broadcast window has passed. The callouts are promotional — "watch live"
 * copy on a finished debate reads as a stale site, so they remove themselves.
 */
export function debateHasEnded(now: number = Date.now()): boolean {
	return now >= DEBATE.endsAt;
}
