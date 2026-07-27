<script>
	import { locale, messages } from '$lib/i18n/locale';
	import Rail from './Rail.svelte';

	/** @type {import('$lib/data/pressReleases').PressRelease} */
	export let item;
	/** Card surface: 'dark' (default, navy) or 'light' (for light section grounds). @type {'dark' | 'light'} */
	export let variant = 'dark';

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

	// A file usable as a card thumbnail (designed graphic), by extension.
	const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

	$: override = $messages.pressReleases.byId[item.id];
	$: title = override?.title ?? item.title;
	$: summary = override?.summary ?? item.summary;
	$: formattedDate = formatDate(item.date, $locale);
	// Locale-appropriate source file, then thumbnail: explicit `image`, else the
	// attachment when it's itself an image, else the branded wordmark placeholder.
	$: attachment = override?.attachment ?? item.attachment;
	$: thumb = item.image ?? (attachment && IMAGE_RE.test(attachment) ? attachment : null);
</script>

<a
	class="pr-card"
	class:pr-card--light={variant === 'light'}
	href={`/press/${item.id}`}
>
	<div class="pr-thumb" class:pr-thumb--image={thumb}>
		{#if thumb}
			<img class="pr-thumb-img" src={thumb} alt="" loading="lazy" decoding="async" />
		{:else}
			<span class="pr-thumb-mark">{$messages.pressReleases.kind}</span>
		{/if}
		<div class="pr-thumb-rail"><Rail /></div>
		<span class="pr-kind">{$messages.pressReleases.kind}</span>
	</div>
	<div class="pr-body">
		<h3 class="pr-title">{title}</h3>
		{#if summary}
			<p class="pr-desc">{summary}</p>
		{/if}
		<span class="pr-meta">
			{#if item.location}{item.location} • {/if}{formattedDate}
		</span>
	</div>
</a>

<style>
	.pr-card {
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

	.pr-card:hover,
	.pr-card:focus-visible {
		border-color: var(--sky);
		transform: translateY(-3px);
	}

	/* Light variant — for cards on light section grounds. Thumb stays dark; the
	   body becomes a light surface with dark text (mirrors MediaCard--light). */
	.pr-card--light {
		background: var(--paper-2);
		border-color: var(--line-l);
		color: var(--ink);
	}

	.pr-card--light:hover,
	.pr-card--light:focus-visible {
		border-color: var(--blue);
	}

	.pr-card--light .pr-title {
		color: var(--ink);
	}

	.pr-card--light .pr-desc {
		color: var(--ink-2);
	}

	.pr-card--light .pr-meta {
		color: var(--ink-3);
	}

	.pr-thumb {
		position: relative;
		width: 100%;
		flex-shrink: 0;
		aspect-ratio: 16 / 9;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: linear-gradient(150deg, var(--ink) 0%, var(--ink-deep) 100%);
	}

	/* Designed release graphic filling the thumb. Anchored to the top so the
	   headline (usually at the top of the graphic) survives the 16:9 crop. */
	.pr-thumb-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
		z-index: 0;
	}

	.pr-thumb-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}

	/* Newsroom wordmark filling the thumb (parallels MediaCard's outlet wordmark). */
	.pr-thumb-mark {
		padding: 0 1.25rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.1rem, 2.4vw, 1.5rem);
		letter-spacing: -0.02em;
		line-height: 1.05;
		text-align: center;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.5);
	}

	.pr-kind {
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

	.pr-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1rem 1.1rem 1.15rem;
	}

	.pr-title {
		margin: 0 0 0.5rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
		line-height: 1.15;
		color: var(--paper);
	}

	.pr-desc {
		margin: 0;
		font-family: var(--sans);
		font-size: 0.875rem;
		line-height: 1.5;
		color: rgba(247, 250, 252, 0.72);
	}

	.pr-meta {
		margin-top: 0.85rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.5);
	}
</style>
