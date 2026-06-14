/**
 * Campaign media (English source). Spanish overrides: $messages.media.byId[id].
 * The home page shows the 6 most recent; /media shows the full list.
 * Placeholder content — replace with the campaign's real videos and op-eds.
 */
export type MediaItem = {
	id: string;
	type: 'video' | 'article';
	title: string;
	description: string;
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
		id: 'md-001',
		type: 'video',
		title: 'Peter on rural healthcare access',
		description: 'A short conversation about keeping clinics open and staffed across Cache Valley.',
		date: '2026-06-01',
		url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
		youtubeId: 'aqz-KE-bpKQ',
		outlet: 'YouTube'
	},
	{
		id: 'md-002',
		type: 'article',
		title: 'Op-Ed: The Great Salt Lake can’t wait',
		description: 'Why Northern Utah needs a real plan for the lake before the next dry year.',
		date: '2026-05-22',
		url: 'https://www.sltrib.com',
		outlet: 'Salt Lake Tribune'
	},
	{
		id: 'md-003',
		type: 'video',
		title: 'Town hall in Logan — full recording',
		description: 'Peter takes questions on housing, costs, and water from neighbors in Logan.',
		date: '2026-05-15',
		url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
		youtubeId: 'aqz-KE-bpKQ',
		outlet: 'YouTube'
	},
	{
		id: 'md-004',
		type: 'article',
		title: 'Crosby: Housing is a kitchen-table issue',
		description: 'Starter homes, not slogans — an op-ed on what working families actually need.',
		date: '2026-05-03',
		url: 'https://www.standard.net',
		outlet: 'Standard-Examiner'
	},
	{
		id: 'md-005',
		type: 'video',
		title: '60 seconds: Why I’m running',
		description: 'The short version, straight from Peter.',
		date: '2026-04-20',
		url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
		youtubeId: 'aqz-KE-bpKQ',
		outlet: 'YouTube'
	},
	{
		id: 'md-006',
		type: 'article',
		title: 'Five questions with Peter Crosby',
		description: 'A wide-ranging interview on accountability, water, and showing up for the district.',
		date: '2026-04-10',
		url: 'https://www.upr.org',
		outlet: 'Utah Public Radio'
	},
	{
		id: 'md-007',
		type: 'video',
		title: 'On the trail: knocking doors in Ogden',
		description: 'Behind the scenes with volunteers across the district on a Saturday morning.',
		date: '2026-03-28',
		url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
		youtubeId: 'aqz-KE-bpKQ',
		outlet: 'YouTube'
	},
	{
		id: 'md-008',
		type: 'article',
		title: 'Endorsement: A steady hand for District 2',
		description: 'Why the editorial board is backing Crosby for Congress.',
		date: '2026-03-15',
		url: 'https://www.standard.net',
		outlet: 'Ogden City Press'
	}
];

/** Media sorted newest-first. */
export const mediaByRecent: MediaItem[] = [...mediaData].sort((a, b) =>
	b.date.localeCompare(a.date)
);
