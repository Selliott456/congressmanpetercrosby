/** Production origin — canonical links and the sitemap. (static/robots.txt repeats it.) */
export const SITE_ORIGIN = 'https://www.petercrosbyforcongress.org';

/**
 * Default link-preview image (Open Graph / X card), used by every page that doesn't
 * pass its own. Rendered from scripts/share-image/ — edit default.html there and run
 * render.sh. Give a changed image a NEW filename: Facebook and others cache previews
 * by image URL, so overwriting the file in place won't refresh them.
 */
export const SHARE_IMAGE = {
	path: '/images/share/peter-crosby-for-congress-2026.png',
	width: 1200,
	height: 630
} as const;
