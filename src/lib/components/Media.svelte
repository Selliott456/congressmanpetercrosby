<script>
	import { messages } from '$lib/i18n/locale';
	import { mediaByRecent } from '$lib/data/media';
	import MediaGrid from './MediaGrid.svelte';

	const recent = mediaByRecent.slice(0, 6);
</script>

<section class="media-section" aria-labelledby="media-heading">
	<div class="media-section-inner">
		<p class="media-section-eyebrow">{$messages.media.eyebrow}</p>
		<h2 id="media-heading" class="media-section-title">{$messages.media.title}</h2>
		<MediaGrid items={recent} variant="light" />
		<a href="/media" class="media-section-link">{$messages.media.viewAll} &rarr;</a>
	</div>
</section>

<style>
	.media-section {
		background: var(--paper);
		color: var(--ink);
		padding-block: clamp(3rem, 7vw, 5rem);
	}

	.media-section-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.media-section-eyebrow {
		margin: 0 0 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--blue);
	}

	.media-section-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.media-section-title {
		margin: 0 0 2rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.6rem, 3.4vw, 2.25rem);
		letter-spacing: -0.03em;
		line-height: 1.04;
		color: var(--ink);
	}

	.media-section-link {
		display: inline-block;
		margin-top: 1.85rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--blue);
		text-decoration: none;
	}

	.media-section-link:hover {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
