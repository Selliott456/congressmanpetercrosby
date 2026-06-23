<script>
	import { createEventDispatcher } from 'svelte';
	import { locale, messages } from '$lib/i18n/locale';
	import Rail from './Rail.svelte';

	/** @type {import('$lib/data/media').MediaItem} */
	export let item;
	/** Card surface: 'dark' (default, navy) or 'light' (for light section grounds). @type {'dark' | 'light'} */
	export let variant = 'dark';

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

	$: override = $messages.media.byId[item.id];
	$: title = override?.title ?? item.title;
	$: description = override?.description ?? item.description;
	$: formattedDate = formatDate(item.date, $locale);
	$: kind =
		item.type === 'video'
			? $messages.media.kindVideo
			: item.type === 'op-ed'
				? $messages.media.kindOpEd
				: $messages.media.kindArticle;

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

<a
	class="media-card"
	class:media-card--light={variant === 'light'}
	href={item.url}
	target="_blank"
	rel="noopener noreferrer"
	on:click={onClick}
>
	<div class="media-thumb media-thumb--{item.type}">
		<div class="media-thumb-rail"><Rail /></div>
		{#if item.type === 'video'}
			<span class="media-play" aria-hidden="true"></span>
		{:else}
			<span class="media-outlet">{item.outlet}</span>
		{/if}
		<span class="media-kind">{kind}</span>
	</div>
	<div class="media-body">
		<h3 class="media-title">{title}</h3>
		{#if description}
				<p class="media-desc">{description}</p>
			{/if}
		<span class="media-meta">
			{#if item.outlet}{item.outlet} • {/if}{formattedDate}
		</span>
	</div>
</a>

<style>
	.media-card {
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

	.media-card:hover,
	.media-card:focus-visible {
		border-color: var(--sky);
		transform: translateY(-3px);
	}

	/* Light variant — for cards on light section grounds (less glaring). The
	   thumbnail stays dark; the body becomes a light surface with dark text. */
	.media-card--light {
		background: var(--paper-2);
		border-color: var(--line-l);
		color: var(--ink);
	}

	.media-card--light:hover,
	.media-card--light:focus-visible {
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

	.media-thumb-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	/* Video: play button */
	.media-play {
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

	.media-meta {
		margin-top: 0.85rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.5);
	}
</style>
