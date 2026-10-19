/**
 * Privacy policy status.
 *
 * The page at `/privacy` is written from what the site verifiably does — the analytics
 * it loads, the fields each form collects, the processors those reach. What it cannot
 * state is answerable only by the campaign; see {@link PRIVACY_OPEN_QUESTIONS}.
 *
 * Answered 2026-10-18 — the newsletter: the footer form posts to Formspree like the rest,
 * and a Formspree→Mailchimp integration forwards the name and email automatically, with
 * nobody copying it by hand. The copy says so, because an automatic hand-off to a third
 * party is a different thing to describe than a staffer re-typing an address.
 *
 * While `PRIVACY_DRAFT` is true the page is `noindex` (so the sitemap, which reads the
 * robots meta, leaves it out) and carries a visible draft notice, and the footer does not
 * link it. A privacy policy that is public but wrong is worse than none, and the most
 * likely way to get one wrong is to claim the campaign does not share supporter data when
 * it does.
 *
 * ⚠️ To publish: get the answers below, fold them into `privacy.sections` in BOTH
 * dictionaries, have whoever handles the campaign's compliance read it, then set this to
 * false. That one flag adds the footer link, drops the draft notice, swaps `noindex` for
 * the usual `PageMeta`, and lets the sitemap pick the page up.
 */
export const PRIVACY_DRAFT = true;

/**
 * What the campaign has to answer before the policy can go live. Written out here rather
 * than left as comments in the copy so they survive translation and review.
 */
/** One block of privacy-policy copy. `text` may contain `**bold**` runs. */
export type PrivacyBlock =
	| { type: 'p'; text: string }
	| { type: 'ul'; items: string[] }
	/** A labelled row of outbound links — the processors' own policies. */
	| { type: 'links'; label: string; items: { label: string; href: string }[] };

export type PrivacySection = {
	/** Stable anchor; identical in both dictionaries. */
	id: string;
	title: string;
	blocks: PrivacyBlock[];
};

/**
 * Identity helper for the dictionaries: `sections: definePrivacySections([...])` checks
 * each block against `PrivacyBlock` — a heterogeneous array would otherwise widen into a
 * union with every field optional — and makes the Spanish copy check against the same
 * type rather than against the exact shape of the English literal.
 */
export function definePrivacySections(sections: PrivacySection[]): PrivacySection[] {
	return sections;
}

export const PRIVACY_OPEN_QUESTIONS = [
	'Sharing: does the campaign share, exchange, rent or sell supporter data with the state party, the DCCC, or other campaigns? This is ordinary practice and the policy can say so plainly — but it must not claim otherwise if it happens.',
	'Retention: how long is form data kept, and is it exported into a CRM, voter file or other system beyond the Formspree inbox?',
	'Removal: which address should someone write to in order to be removed, and who monitors it?'
] as const;
