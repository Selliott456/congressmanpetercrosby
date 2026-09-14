<script>
	import { page } from '$app/stores';
	import { locale, messages } from '$lib/i18n/locale';
	import { SITE_ORIGIN, SHARE_IMAGE } from '$lib/site';

	/**
	 * A page's <head> metadata: title, description, canonical link, and the link-preview
	 * tags (Open Graph, read by Facebook, LinkedIn, iMessage, Slack…, plus X's card type).
	 * Every indexable page renders one; noindex pages (the Data Room style guide, the
	 * error page) keep their own head.
	 *
	 * Previews are always English: crawlers render the server's HTML, and the language
	 * switch is client-side.
	 */

	/** @type {string} */
	export let title;
	/** @type {string} */
	export let description;
	/** Site-relative share image; omit for the branded default card. @type {string | undefined} */
	export let image = undefined;
	/** Alt text for a page's own image (defaults to the title). @type {string | undefined} */
	export let imageAlt = undefined;
	/** 'article' for press releases. @type {'website' | 'article'} */
	export let type = 'website';
	/** Publication date (YYYY-MM-DD), for articles. @type {string | undefined} */
	export let published = undefined;

	// og:url and og:image use the origin actually serving the page, so a Netlify deploy
	// preview previews with its own images and can be tested before launch. The
	// canonical link always names production.
	$: origin = $page.url.origin;
	$: path = $page.url.pathname;
	$: shareImage = image ?? SHARE_IMAGE.path;
	$: shareAlt = image ? (imageAlt ?? title) : $messages.common.shareImageAlt;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={SITE_ORIGIN + path} />

	<meta property="og:site_name" content={$messages.common.siteName} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={origin + path} />
	<meta property="og:image" content={origin + shareImage} />
	{#if !image}
		<meta property="og:image:width" content={String(SHARE_IMAGE.width)} />
		<meta property="og:image:height" content={String(SHARE_IMAGE.height)} />
	{/if}
	<meta property="og:image:alt" content={shareAlt} />
	<meta property="og:locale" content={$locale === 'es' ? 'es_US' : 'en_US'} />
	{#if type === 'article' && published}
		<meta property="article:published_time" content={published} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
