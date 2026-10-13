<script>
	import { createEventDispatcher } from 'svelte';
	import { locale, messages } from '$lib/i18n/locale';
	import { outletThumbnails } from '$lib/data/media';
	import Rail from './Rail.svelte';

	/** @type {import('$lib/data/media').MediaItem} */
	export let item;
	/** Card surface: 'dark' (default, navy) or 'light' (for light section grounds). @type {'dark' | 'light'} */
	export let variant = 'dark';
	/** Title heading level — 2 when the grid sits directly under the page's h1. @type {2 | 3} */
	export let headingLevel = 3;

	const dispatch = createEventDispatcher();

	/**
	 * Format an ISO date (YYYY-MM-DD) for the meta line, e.g. "Jan 05, 2026".
	 * Parses the parts as local time so the day never shifts across timezones.
	 * @param {string} iso
	 * @param {import('$lib/i18n/dictionaries').Locale} loc
	 */
	function formatDate(iso, loc) {
		const [y, m, d] = iso.split('-').map(Number);
		return new Date(y, m - 1, d).toLocaleDateString(loc === 'es' ? 'es-US' : 'en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		});
	}

	// Spanish copy: the media override, else — for a press release shown as a media card
	// (the latest one heads /media's Featured band) — the release's own Spanish.
	$: pressOverride =
		item.type === 'press-release' ? $messages.pressReleases.byId[item.id] : undefined;
	$: override =
		$messages.media.byId[item.id] ??
		(pressOverride ? { title: pressOverride.title, description: pressOverride.summary } : undefined);
	$: title = override?.title ?? item.title;
	$: description = override?.description ?? item.description;
	$: formattedDate = formatDate(item.date, $locale);
	// Resolved thumbnail: the item's own image, else the outlet's default, else none
	// (the branded gradient placeholder). A video always shows the play button + scrim.
	$: thumb = item.image ?? (item.outlet ? outletThumbnails[item.outlet] : undefined) ?? null;
	$: kind =
		item.type === 'video'
			? $messages.media.kindVideo
			: item.type === 'op-ed'
				? $messages.media.kindOpEd
				: item.type === 'press-release'
					? $messages.media.kindPressRelease
					: $messages.media.kindArticle;
	// Internal links (e.g. a press release detail page) open in the same tab.
	$: external = !item.url.startsWith('/');

	/** @param {MouseEvent} event */
	function onClick(event) {
		// Videos open in the on-site lightbox; without JS the href still
		// links to YouTube. Articles follow their link normally.
		if (item.type === 'video') {
			event.preventDefault();
			dispatch('play', item);
		}
	}
</script>

<!--
	The card is a container, not one big <a>, because a video card needs a second link out
	to YouTube and an anchor cannot nest inside another anchor. The primary link wraps the
	title and is stretched over the whole card with a ::after overlay, so the card still
	behaves as one click target; the source link sits above that overlay.
-->
<article class="media-card" class:media-card--light={variant === 'light'}>
	<div class="media-thumb media-thumb--{item.type}" class:media-thumb--image={thumb}>
		{#if thumb}
			<img class="media-thumb-img" src={thumb} alt="" loading="lazy" decoding="async" />
			{#if item.type === 'video'}
				<span class="media-thumb-scrim" aria-hidden="true"></span>
			{/if}
		{/if}
		<div class="media-thumb-rail"><Rail /></div>
		{#if item.type === 'video'}
			<span class="media-play" aria-hidden="true"></span>
		{:else if !thumb}
			<span class="media-outlet">{item.outlet}</span>
		{/if}
		<span class="media-kind">{kind}</span>
	</div>
	<div class="media-body">
		<svelte:element this={`h${headingLevel}`} class="media-title">
			<a
				class="media-card-link"
				href={item.url}
				target={external ? '_blank' : undefined}
				rel={external ? 'noopener noreferrer' : undefined}
				on:click={onClick}>{title}</a
			>
		</svelte:element>
		{#if description}
			<p class="media-desc">{description}</p>
		{/if}
		{#if item.type === 'video'}
			<!-- The card opens the lightbox, so this is the only way to reach the video on
			     YouTube. It doubles as the no-JS fallback for the play action. -->
			<a
				class="media-source-link"
				href={item.url}
				target="_blank"
				rel="noopener noreferrer">{$messages.media.watchOnSource}</a
			>
		{/if}
		<span class="media-meta">
			{#if item.outlet}{item.outlet} • {/if}{formattedDate}
		</span>
	</div>
</article>

<style>
	.media-card {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--ink-2);
		border: 1px solid var(--line-d);
		text-decoration: none;
		color: var(--paper);
		transition:
			border-color 0.18s ease,
			transform 0.18s ease;
	}

	/* `:focus-within` rather than `:focus-visible`: the card is a container now, so the
	   focus lands on one of the links inside it. */
	.media-card:hover,
	.media-card:focus-within {
		border-color: var(--sky);
		transform: translateY(-3px);
	}

	/* The title link, stretched over the card so the whole surface stays clickable. */
	.media-card-link {
		color: inherit;
		text-decoration: none;
	}

	/* z-index 3 clears the thumbnail's own decorations — the rail, play button and kind
	   badge all sit at 2 — so a click anywhere on the card reaches this link rather than
	   landing on a decorative span. */
	.media-card-link::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 3;
	}

	/* Light variant — for cards on light section grounds (less glaring). The
	   thumbnail stays dark; the body becomes a light surface with dark text. */
	.media-card--light {
		background: var(--paper-2);
		border-color: var(--line-l);
		color: var(--ink);
	}

	.media-card--light:hover,
	.media-card--light:focus-within {
		border-color: var(--blue);
	}

	.media-card--light .media-title {
		color: var(--ink);
	}

	.media-card--light .media-desc {
		color: var(--ink-2);
	}

	.media-card--light .media-meta {
		color: var(--ink-3);
	}

	.media-thumb {
		position: relative;
		width: 100%;
		flex-shrink: 0;
		aspect-ratio: 16 / 9;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: linear-gradient(150deg, var(--ink) 0%, var(--ink-deep) 100%);
	}

	/* Campaign-supplied thumbnail image; covers the gradient placeholder. */
	.media-thumb-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
	}

	/* Darkens a video thumbnail image just enough for the play button to read. */
	.media-thumb-scrim {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: rgba(9, 27, 54, 0.4);
	}

	.media-thumb-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}

	/* Video: play button */
	.media-play {
		position: relative;
		z-index: 2;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 13px 0 13px 22px;
		border-color: transparent transparent transparent var(--paper);
		margin-left: 5px;
		transition: border-left-color 0.18s ease;
	}

	.media-card:hover .media-play {
		border-left-color: var(--sky);
	}

	/* Article: outlet wordmark */
	.media-outlet {
		padding: 0 1.25rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.1rem, 2.4vw, 1.5rem);
		letter-spacing: -0.02em;
		line-height: 1.05;
		text-align: center;
		color: rgba(247, 250, 252, 0.5);
	}

	.media-kind {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 2;
		padding: 0.3rem 0.65rem;
		background: var(--ink-deep);
		font-family: var(--mono);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--sky);
	}

	.media-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1rem 1.1rem 1.15rem;
	}

	.media-title {
		margin: 0 0 0.5rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
		line-height: 1.15;
		color: var(--paper);
	}

	.media-desc {
		margin: 0;
		font-family: var(--sans);
		font-size: 0.875rem;
		line-height: 1.5;
		color: rgba(247, 250, 252, 0.72);
	}

	/* Sits above the stretched overlay so it is independently clickable. `align-self` keeps
	   the hit area to the text itself rather than the full card width. */
	.media-source-link {
		position: relative;
		/* Above the stretched overlay (3), so this link stays independently clickable. */
		z-index: 4;
		align-self: flex-start;
		margin-top: 0.7rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--sky);
		border-bottom: 1px solid transparent;
		transition:
			color 0.18s ease,
			border-color 0.18s ease;
	}

	.media-source-link:hover,
	.media-source-link:focus-visible {
		border-bottom-color: currentColor;
	}

	.media-card--light .media-source-link {
		color: var(--blue);
	}

	.media-meta {
		margin-top: 0.85rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		/* 0.6 (not 0.5) so the small meta line clears WCAG AA on the navy card: 5.4:1. */
		color: rgba(247, 250, 252, 0.6);
	}
</style>
