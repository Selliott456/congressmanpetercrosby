/**
 * Campaign media (English source). Spanish overrides: $messages.media.byId[id].
 * The home page shows the 6 most recent; /media shows a pinned set + the rest.
 * Source of truth: the "PC - Media Objects" Google Sheet.
 */
export type MediaItem = {
	id: string;
	/** Pin to the top (featured) section of the /media page. */
	pinned: boolean;
	type: 'video' | 'article' | 'op-ed';
	title: string;
	description?: string;
	/** ISO date (YYYY-MM-DD) — used to pick the most recent items. */
	date: string;
	/** External link: YouTube watch URL (video) or the article URL. */
	url: string;
	/** YouTube video id, for the lightbox embed (videos only). */
	youtubeId?: string;
	/** Publication or channel, e.g. "Salt Lake Tribune" or "YouTube". */
	outlet?: string;
};

export const mediaData: MediaItem[] = [
	{
		id: 'our-vote-counts-interview',
		pinned: true,
		type: 'video',
		title: 'Interview - Our Vote Counts',
		description:
			'Our Vote Counts and I sat for a virtual interview and town hall, where we talked about a wide range of issues facing our district and the nation.',
		date: '2025-12-16',
		url: 'https://youtu.be/kHJBykNy9zg',
		youtubeId: 'kHJBykNy9zg',
		outlet: 'YouTube'
	},
	{
		id: 'the-ties-that-bind',
		pinned: true,
		type: 'op-ed',
		title: 'The Ties that Bind',
		description:
			'I believe there are ties that bind us as Americans, truths we hold onto stronger than our culture, our geography, our language.',
		date: '2026-01-19',
		url: 'https://substack.com/@petercrosbyforcongress/p-185146020',
		outlet: 'Substack'
	},
	{
		id: 'early-campaign-launch',
		pinned: false,
		type: 'article',
		title: 'Peter Crosby Launches Early Campaign',
		date: '2026-03-12',
		url: 'https://www.theogdenite.com/news/peter-crosby-launches-early-campaign-against-three-term-rep-blake-moore',
		outlet: 'The Ogdenite'
	},
	{
		id: 'virtual-town-hall',
		pinned: true,
		type: 'video',
		title: 'Virtual Town Hall with Peter',
		description:
			"Discussion about data centers, the influence of money in our current governmental system, briefly touch on DOGE, USAID, corporation accountability, AI, participating in our own government, & women's health.",
		date: '2026-05-19',
		url: 'https://youtu.be/YJAIs5yViqs',
		youtubeId: 'YJAIs5yViqs',
		outlet: 'YouTube'
	},
	{
		id: 'cache-valley-daily-spotlight',
		pinned: false,
		type: 'article',
		title: 'Cache Valley Daily Campaign Spotlight',
		description:
			'Democratic congressional candidate Peter Crosby to host forum at Logan Library.',
		date: '2026-06-05',
		url: 'https://www.cachevalleydaily.com/news/democratic-congressional-candidate-peter-crosby-to-host-forum-at-logan-library-on-june-8/article_8aaa10b6-f72f-4505-a688-bb6d51ced1d4.html',
		outlet: 'Cache Valley Daily'
	}
];

/** Media sorted newest-first. */
export const mediaByRecent: MediaItem[] = [...mediaData].sort((a, b) =>
	b.date.localeCompare(a.date)
);

/** Pinned (featured) media, newest-first. */
export const pinnedMedia: MediaItem[] = mediaByRecent.filter((m) => m.pinned);

/** Non-pinned media, newest-first. */
export const restMedia: MediaItem[] = mediaByRecent.filter((m) => !m.pinned);
