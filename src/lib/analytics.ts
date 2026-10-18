/**
 * Google Tag Manager for the campaign website.
 *
 * GTM replaced a direct gtag.js install on 2026-10-18 so the campaign can add tags
 * (GA4, vibe.co, and whatever marketing adds next) without a code change and deploy.
 *
 * ⚠️ GTM only loads tags — it measures nothing on its own. GA4 has to exist as a tag
 * inside the container, and the container has to be PUBLISHED, or the site records
 * nothing. See `GA_MEASUREMENT_ID` below for the id GA4 is configured with.
 *
 * ⚠️ This site is a SvelteKit SPA: after the first load, navigation happens client-side
 * with no page load, so GTM's "All Pages" trigger fires exactly once per session and
 * every later page would go uncounted. Instead {@link trackPageView} pushes an explicit
 * `spa_page_view` event on every navigation (from the root layout's `afterNavigate`,
 * which also fires on first load, so the landing page is counted too).
 *
 * The container must therefore be configured to match:
 *   • GA4 Configuration tag → trigger "Initialization - All Pages", with
 *     "Send a page view event when this configuration loads" UNCHECKED.
 *   • GA4 Event tag, event name `page_view` → trigger: Custom Event `spa_page_view`,
 *     with page_location / page_path / page_title read from the dataLayer.
 * If the configuration tag is left sending its own page view, the landing page is
 * counted twice while the rest of the session is counted once.
 */

/** GTM container for the campaign site. */
export const GTM_CONTAINER_ID = 'GTM-K6R427Q3';

/**
 * GA4 measurement ID for the website web stream. Nothing in this file reads it — GA4 is
 * configured inside GTM now — but it is kept here because it is the same stream the site
 * used before the migration, so the history stays continuous, and it is otherwise only
 * written down in the GTM UI.
 */
export const GA_MEASUREMENT_ID = 'G-2SY69TQC0D';

interface AnalyticsWindow extends Window {
	dataLayer?: unknown[];
}

/** True once the container script has been added, so a re-call is a no-op. */
let loaded = false;

/**
 * Load the GTM container. No-ops if already loaded. Browser-only — call behind a
 * `browser` guard, and the caller also gates on production so local development and
 * deploy previews stay out of the campaign's data.
 */
export function initAnalytics(): void {
	if (loaded) return;
	loaded = true;

	const w = window as AnalyticsWindow;
	w.dataLayer = w.dataLayer ?? [];
	// GTM's own snippet pushes this first; it is what the container reports as its
	// start time, and some built-in triggers depend on it being present.
	w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
	document.head.appendChild(script);
}

/**
 * Announce a page view for the current URL. Call after each navigation.
 *
 * Pushes a custom event rather than relying on GTM's History Change trigger on purpose:
 * the root layout strips the `?yardsign` query param with `history.replaceState`, which a
 * history-based trigger would see as a second navigation and count twice.
 */
export function trackPageView(): void {
	const w = window as AnalyticsWindow;
	if (!w.dataLayer) return;
	w.dataLayer.push({
		event: 'spa_page_view',
		page_title: document.title,
		page_location: location.href,
		page_path: location.pathname + location.search
	});
}
