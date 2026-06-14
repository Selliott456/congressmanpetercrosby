<script>
	import { messages } from '$lib/i18n/locale';
	import { mediaByRecent } from '$lib/data/media';
	import MediaGrid from '$lib/components/MediaGrid.svelte';
</script>

<svelte:head>
	<title>{$messages.media.metaTitle}</title>
	<meta name="description" content={$messages.media.metaDescription} />
</svelte:head>

<main class="media-page">
	<div class="media-page-inner">
		<p class="media-page-eyebrow">{$messages.media.eyebrow}</p>
		<h1 class="media-page-title">{$messages.media.pageTitle}</h1>
		<p class="media-page-lede">{$messages.media.pageLede}</p>
		<MediaGrid items={mediaByRecent} />
	</div>
</main>

<style>
	.media-page {
		background: var(--ink-deep);
		color: var(--paper);
		min-height: 70vh;
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.media-page-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.media-page-eyebrow {
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
		color: var(--sky);
	}

	.media-page-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--sky);
	}

	.media-page-title {
		margin: 0 0 0.65rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(2rem, 5vw, 3rem);
		letter-spacing: -0.035em;
		line-height: 1.02;
		color: var(--paper);
	}

	.media-page-lede {
		margin: 0 0 2.25rem;
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.125rem;
		line-height: 1.5;
		color: rgba(247, 250, 252, 0.8);
	}

	@media (max-width: 768px) {
		.media-page {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
			padding-left: var(--mobile-margin);
			padding-right: var(--mobile-margin);
			box-sizing: border-box;
		}

		.media-page-inner {
			padding-left: 0;
			padding-right: 0;
		}
	}
</style>
