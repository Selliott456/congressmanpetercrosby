<script>
	import { messages } from '$lib/i18n/locale';
	import { pinnedMedia, restMedia } from '$lib/data/media';
	import MediaGrid from '$lib/components/MediaGrid.svelte';
</script>

<svelte:head>
	<title>{$messages.media.metaTitle}</title>
	<meta name="description" content={$messages.media.metaDescription} />
</svelte:head>

<main class="media-page">
	<section class="media-block media-block--pinned">
		<div class="media-block-inner">
			<div class="media-block-head">
				<p class="media-block-eyebrow">{$messages.media.pinnedEyebrow}</p>
				<h1 class="media-block-title">{$messages.media.pinnedTitle}</h1>
				<p class="media-block-lede">{$messages.media.pageLede}</p>
			</div>
			<MediaGrid items={pinnedMedia} />
		</div>
	</section>

	<section class="media-block media-block--rest">
		<div class="media-block-inner">
			<div class="media-block-head">
				<p class="media-block-eyebrow">{$messages.media.eyebrow}</p>
				<h2 class="media-block-title">{$messages.media.pageTitle}</h2>
			</div>
			<MediaGrid items={restMedia} />
		</div>
	</section>
</main>

<style>
	.media-block {
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.media-block--pinned {
		background: var(--ink-deep);
		color: var(--paper);
	}

	.media-block--rest {
		background: var(--paper);
		color: var(--ink);
	}

	.media-block-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.media-block-head {
		margin-bottom: 2rem;
	}

	.media-block-eyebrow {
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
	}

	.media-block-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
	}

	.media-block--pinned .media-block-eyebrow {
		color: var(--sky);
	}

	.media-block--pinned .media-block-eyebrow::before {
		background: var(--sky);
	}

	.media-block--rest .media-block-eyebrow {
		color: var(--blue);
	}

	.media-block--rest .media-block-eyebrow::before {
		background: var(--blue);
	}

	.media-block-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(2rem, 5vw, 3rem);
		letter-spacing: -0.035em;
		line-height: 1.02;
	}

	.media-block--pinned .media-block-title {
		color: var(--paper);
	}

	.media-block--rest .media-block-title {
		color: var(--ink);
	}

	.media-block-lede {
		margin: 0.65rem 0 0;
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.125rem;
		line-height: 1.5;
		color: rgba(247, 250, 252, 0.8);
	}

	@media (max-width: 768px) {
		.media-block {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
		}

		.media-block-inner {
			padding-left: var(--mobile-margin);
			padding-right: var(--mobile-margin);
		}
	}
</style>
