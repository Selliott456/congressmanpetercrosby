import { pressReleases } from '$lib/data/pressReleases';
import { LAST_UPDATED } from '$lib/data/analytics';
import { SITE_ORIGIN as ORIGIN } from '$lib/site';
import type { RequestHandler } from './$types';

/**
 * /sitemap.xml, generated at build time (prerendered to a static file). It maintains
 * itself, so there is no list of pages to keep in sync:
 *  • every page under src/routes is listed automatically;
 *  • pages with a robots `noindex` meta, and routes whose +page.ts only redirects
 *    (e.g. /yard-sign), are left out;
 *  • dynamic routes are expanded from their data (`DYNAMIC`). A new dynamic route with
 *    no entry there FAILS THE BUILD rather than silently going missing from search.
 * Spanish is served at the same URLs (the locale is client-side), so there are no
 * hreflang alternates. static/robots.txt points crawlers here.
 */
export const prerender = true;

type Entry = { path: string; lastmod?: string };

const pages = import.meta.glob<string>('/src/routes/**/+page.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
});
const loaders = import.meta.glob<string>('/src/routes/**/+page.ts', {
	query: '?raw',
	import: 'default',
	eager: true
});

/** Dynamic routes → their concrete URLs. */
const DYNAMIC: Record<string, () => Entry[]> = {
	'/press/[slug]': () => pressReleases.map((r) => ({ path: `/press/${r.id}`, lastmod: r.date }))
};

/** Last-modified dates the site actually knows. Other pages omit <lastmod> rather
    than guess — a wrong date is worse than none. */
const LASTMOD: Record<string, string> = {
	'/data-room': LAST_UPDATED
};

const NOINDEX = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i;
/** A load whose body *starts* with `throw redirect(` never renders (e.g. /yard-sign).
    A conditional redirect — /contact's `?topic=volunteer` — still leaves a real page. */
const REDIRECT_ONLY = /\bload\b[^=]*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{\s*throw\s+redirect\(/;

/** `/src/routes/(group)/about/+page.svelte` → `/about` */
function routePath(file: string): string {
	const segments = file
		.replace(/^\/src\/routes/, '')
		.replace(/\/\+page\.svelte$/, '')
		.split('/')
		.filter((s) => s && !/^\(.*\)$/.test(s));
	return '/' + segments.join('/');
}

function entries(): Entry[] {
	const out: Entry[] = [];
	for (const [file, source] of Object.entries(pages)) {
		if (NOINDEX.test(source)) continue;
		const loader = loaders[file.replace(/\+page\.svelte$/, '+page.ts')];
		if (loader && REDIRECT_ONLY.test(loader)) continue;

		const path = routePath(file);
		if (path.includes('[')) {
			const expand = DYNAMIC[path];
			if (!expand) {
				throw new Error(
					`sitemap.xml: no URLs for dynamic route ${path}. Add it to DYNAMIC in src/routes/sitemap.xml/+server.ts.`
				);
			}
			out.push(...expand());
		} else {
			out.push({ path, lastmod: LASTMOD[path] });
		}
	}
	return out.sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));
}

const escapeXml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: RequestHandler = () => {
	const urls = entries()
		.map(
			({ path, lastmod }) =>
				`  <url>\n    <loc>${escapeXml(ORIGIN + path)}</loc>` +
				(lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '') +
				`\n  </url>`
		)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
