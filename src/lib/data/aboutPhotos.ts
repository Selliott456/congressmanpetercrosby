/**
 * About-page "On the Trail" montage photos (paths under /images/about/trail/).
 * A campaign-trail mosaic shown before the Donate CTA. Order is tuned to
 * interleave orientations for a balanced masonry wall. Decorative gallery —
 * captions live only on the per-section anchors ($messages.about.sections[i]).
 */
export const aboutTrail: string[] = [
	'/images/about/trail/trail-01.jpg',
	'/images/about/trail/trail-02.jpg',
	'/images/about/trail/trail-03.jpg',
	'/images/about/trail/trail-04.jpg',
	'/images/about/trail/trail-05.jpg',
	'/images/about/trail/trail-06.jpg',
	'/images/about/trail/trail-07.jpg',
	'/images/about/trail/trail-08.jpg',
	'/images/about/trail/trail-09.jpg',
	'/images/about/trail/trail-10.jpg',
	'/images/about/trail/trail-11.jpg'
];

/**
 * Intrinsic pixel dimensions of every About-page photo (anchors + trail), so the
 * `<img>` tags can carry `width`/`height` and the browser reserves the right
 * aspect box before the (lazy) image loads — preventing layout shift as the
 * floated anchors and the masonry wall fill in. Keep in sync if a photo is
 * re-cropped or swapped.
 */
export const aboutImageDims: Record<string, { w: number; h: number }> = {
	'/images/about/service-heritage.jpg': { w: 1000, h: 1000 },
	'/images/about/family-northern-utah.jpg': { w: 1000, h: 750 },
	'/images/about/community-issues.jpg': { w: 1000, h: 750 },
	'/images/about/trail/trail-01.jpg': { w: 600, h: 800 },
	'/images/about/trail/trail-02.jpg': { w: 601, h: 800 },
	'/images/about/trail/trail-03.jpg': { w: 800, h: 800 },
	'/images/about/trail/trail-04.jpg': { w: 800, h: 600 },
	'/images/about/trail/trail-05.jpg': { w: 600, h: 800 },
	'/images/about/trail/trail-06.jpg': { w: 800, h: 600 },
	'/images/about/trail/trail-07.jpg': { w: 600, h: 800 },
	'/images/about/trail/trail-08.jpg': { w: 800, h: 600 },
	'/images/about/trail/trail-09.jpg': { w: 600, h: 800 },
	'/images/about/trail/trail-10.jpg': { w: 600, h: 800 },
	'/images/about/trail/trail-11.jpg': { w: 600, h: 800 }
};
