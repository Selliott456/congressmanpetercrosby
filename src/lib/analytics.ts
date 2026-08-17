/**
 * Google Analytics 4 (gtag.js) for the campaign website web stream.
 *
 * gtag only auto-tracks the very first page load. This site is a SvelteKit SPA,
 * so every navigation after that happens client-side without a full page load —
 * which gtag wouldn't count. We therefore disable the automatic page_view
 * (`send_page_view: false`) and send one manually on each navigation via
 * {@link trackPageView} (called from the root layout's `afterNavigate`, which
 * also fires on the initial load — so the landing page is counted too).
 */

/** GA4 measurement ID for the website web stream. */
export const GA_MEASUREMENT_ID = 'G-2SY69TQC0D';

type Gtag = (...args: unknown[]) => void;

interface AnalyticsWindow extends Window {
	dataLayer?: unknown[];
	gtag?: Gtag;
}

/**
 * Bootstrap gtag.js and configure the stream, then load the library. No-ops if
 * already initialised. Browser-only — call behind a `browser` guard.
 */
export function initAnalytics(): void {
	const w = window as AnalyticsWindow;
	if (w.gtag) return;

	w.dataLayer = w.dataLayer ?? [];
	const gtag: Gtag = function () {
		// gtag expects the live `arguments` object pushed as-is, not a copy.
		(w.dataLayer as unknown[]).push(arguments);
	};
	w.gtag = gtag;

	gtag('js', new Date());
	gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	document.head.appendChild(script);
}

/** Send a page_view for the current URL. Call after each navigation. */
export function trackPageView(): void {
	const w = window as AnalyticsWindow;
	if (typeof w.gtag !== 'function') return;
	w.gtag('event', 'page_view', {
		page_title: document.title,
		page_location: location.href,
		page_path: location.pathname + location.search
	});
}
