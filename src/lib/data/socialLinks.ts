export type SocialIconName = 'tiktok' | 'youtube' | 'instagram' | 'facebook' | 'substack';

export interface SocialLink {
	href: string;
	icon: SocialIconName;
	/** Accessible label (also used as the platform name). */
	label: string;
}

/** Campaign social profiles, shared by the footer and the homepage. */
export const socialLinks: SocialLink[] = [
	{
		href: 'https://www.tiktok.com/@petercrosbyforcongress?is_from_webapp=1&sender_device=pc',
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
		href: 'https://www.facebook.com/people/Peter-Crosby-for-Congress/61583498494612/',
		icon: 'facebook',
		label: 'Facebook'
	},
	{
		href: 'https://substack.com/@petercrosbyforcongress?r=3en65r&utm_medium=ios&utm_source=profile',
		icon: 'substack',
		label: 'Substack'
	}
];
