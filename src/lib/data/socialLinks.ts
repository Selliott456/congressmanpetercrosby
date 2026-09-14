export type SocialIconName =
	| 'tiktok'
	| 'youtube'
	| 'instagram'
	| 'threads'
	| 'facebook'
	| 'bluesky'
	| 'substack';

export interface SocialLink {
	href: string;
	icon: SocialIconName;
	/** Accessible label (also used as the platform name). */
	label: string;
}

/**
 * Campaign social profiles, shared by the footer and the homepage. Plain profile URLs —
 * strip share/tracking parameters (`?utm_…`, `?is_from_webapp…`) when adding one.
 * Order: Threads sits beside Instagram (both Meta); Substack, the newsletter, goes last.
 */
export const socialLinks: SocialLink[] = [
	{
		href: 'https://www.tiktok.com/@petercrosbyforcongress',
		icon: 'tiktok',
		label: 'TikTok'
	},
	{
		href: 'https://www.youtube.com/@PeterCrosbyforCongress',
		icon: 'youtube',
		label: 'YouTube'
	},
	{
		href: 'https://www.instagram.com/petercrosbyut/',
		icon: 'instagram',
		label: 'Instagram'
	},
	{
		href: 'https://www.threads.com/@petercrosbyut',
		icon: 'threads',
		label: 'Threads'
	},
	{
		href: 'https://www.facebook.com/people/Peter-Crosby-for-Congress/61583498494612/',
		icon: 'facebook',
		label: 'Facebook'
	},
	{
		href: 'https://bsky.app/profile/petercrosby.bsky.social',
		icon: 'bluesky',
		label: 'Bluesky'
	},
	{
		href: 'https://substack.com/@petercrosbyforcongress',
		icon: 'substack',
		label: 'Substack'
	}
];
