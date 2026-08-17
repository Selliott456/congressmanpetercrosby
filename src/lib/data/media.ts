/**
 * Campaign media (English source). Spanish overrides: $messages.media.byId[id].
 * The home page shows the 6 most recent; /media shows a pinned set + the rest.
 * Convention: keep exactly 3 items pinned — the campaign's most important —
 * so the featured set stays a clean row on widescreen and a short stack on
 * phones. Pinning a new one means unpinning another.
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
	/** Card thumbnail image path under /images (e.g. "/images/media/foo.jpg").
	    When omitted, the card falls back to the branded gradient placeholder
	    (play button for video, outlet wordmark for articles). */
	image?: string;
};

/**
 * Default card thumbnail per `outlet`, used when an item has no explicit `image`.
 * Lets a whole outlet share one branded graphic (e.g. every Substack op-ed) without
 * repeating the path on each item. An item's own `image` always wins.
 */
export const outletThumbnails: Record<string, string> = {
	Substack: '/images/media/substack.jpg'
};

export const mediaData: MediaItem[] = [
	{
		id: 'our-vote-counts-interview',
		pinned: false,
		type: 'video',
		title: 'Interview - Our Vote Counts',
		description:
			'Our Vote Counts and I sat for a virtual interview and town hall, where we talked about a wide range of issues facing our district and the nation.',
		date: '2025-12-16',
		url: 'https://youtu.be/kHJBykNy9zg',
		youtubeId: 'kHJBykNy9zg',
		outlet: 'YouTube',
		image: '/images/media/our_vote_counts.jpg'
	},
	{
		id: 'the-ties-that-bind',
		pinned: false,
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
		outlet: 'The Ogdenite',
		image: '/images/media/early-campaign-launch.jpeg'
	},
	{
		id: 'virtual-town-hall',
		pinned: false,
		type: 'video',
		title: 'Virtual Town Hall with Peter',
		description:
			"Discussion about data centers, the influence of money in our current governmental system, briefly touch on DOGE, USAID, corporation accountability, AI, participating in our own government, & women's health.",
		date: '2026-05-19',
		url: 'https://youtu.be/YJAIs5yViqs',
		youtubeId: 'YJAIs5yViqs',
		outlet: 'YouTube',
		image: '/images/media/virtual-town-hall_2026-05-19.jpg'
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
		outlet: 'Cache Valley Daily',
		image: '/images/media/cache-valley-daily-spotlight.jpg'
	},
	{
		id: 'your-vote-your-health',
		pinned: true,
		type: 'video',
		title: 'Interview - Your Vote Your Health',
		description:
			'In this in-depth interview, Peter Crosby shares his journey from a conservative military family background in rural Utah to running for Congress as a Democrat. He discusses systemic issues in government, healthcare reform, rural health challenges, and the importance of grassroots political engagement.',
		date: '2026-06-13',
		url: 'https://youtu.be/Voq954LB-gI',
		youtubeId: 'Voq954LB-gI',
		outlet: 'YouTube',
		image: '/images/media/your-vote-your-health.jpg'
	},
	{
		id: 'cache-valley-daily-winnable',
		pinned: false,
		type: 'article',
		title: 'Crosby Views the Race as Winnable',
		description:
			"A Cache Valley Daily profile on why Peter Crosby sees his challenge to three-term Rep. Blake Moore as winnable, pointing to Moore's slipping primary numbers and Northern Utah's growing competitiveness.",
		date: '2026-07-01',
		url: 'https://www.cachevalleydaily.com/news/democrat-peter-crosby-views-uphill-battle-against-incumbent-rep-blake-moore-as-winnable/article_54bbff83-a567-4bc4-9d66-d6ab540f5375.html',
		outlet: 'Cache Valley Daily',
		image: '/images/media/cache-valley-daily-winnable.jpg'
	},
	{
		id: 'faith-and-politics',
		pinned: true,
		type: 'op-ed',
		title: 'Faith and Politics',
		description:
			'Today, in 2026, I find myself in a position I would not have expected as a young man: not only a Congressional candidate, but a Congressional candidate with the Democratic party.',
		date: '2026-07-12',
		url: 'https://substack.com/home/post/p-206725072',
		outlet: 'Substack'
	},
	{
		id: 'moore-crosby-candidates-speak',
		pinned: false,
		type: 'article',
		title: 'Moore, Crosby, other candidates speak in Nibley',
		description:
			'Candidates from local, state and federal races gathered Wednesday evening at Virgil Gibbons Heritage Park in Nibley for a community picnic designed to encourage conversation between voters and those seeking public office.',
		date: '2026-07-31',
		url: 'https://www.hjnews.com/news/moore-crosby-other-candidates-speak-in-nibley/article_e042c7d5-3bfd-4a79-a596-b7f106fe454d.html',
		outlet: 'HJNews',
		image: '/images/media/moore-crosby-candidates-speak.jpg'
	},
	{
		id: 'candidates-spending-priorities',
		pinned: true,
		type: 'article',
		title: 'Two Utah candidates, two different answers on federal spending priorities',
		description:
			'Republican incumbent Blake Moore and Democratic challenger Peter Crosby agree on some issues, like water. But they split on others.',
		date: '2026-08-12',
		url: 'https://www.upr.org/politics/2026-08-12/crosby-moore-utah-congressional-election',
		outlet: 'UPR',
		image: '/images/media/two_candidates_two_answers.jpg'
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
