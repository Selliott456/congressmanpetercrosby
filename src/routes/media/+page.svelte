<script>
	import { messages } from '$lib/i18n/locale';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { featuredMedia, restMedia } from '$lib/data/media';
	import { pressReleasesByRecent } from '$lib/data/pressReleases';
	import MediaGrid from '$lib/components/MediaGrid.svelte';
	import PressReleaseGrid from '$lib/components/PressReleaseGrid.svelte';
</script>

<PageMeta title={$messages.media.metaTitle} description={$messages.media.metaDescription} />

<main class="media-page">
	<section class="media-block media-block--pinned">
		<div class="media-block-inner">
			<div class="media-block-head">
				<p class="media-block-eyebrow">{$messages.media.pinnedEyebrow}</p>
				<h1 class="media-block-title">{$messages.media.pinnedTitle}</h1>
				<p class="media-block-lede">{$messages.media.pageLede}</p>
				<!-- The same three destinations as the Newsroom menu in the header. -->
				<nav class="media-jump" aria-label={$messages.media.chipsLabel}>
					<ul>
						<li><a href="#coverage">{$messages.nav.newsroom.media}<span aria-hidden="true">↓</span></a></li>
						<li><a href="#press">{$messages.nav.newsroom.press}<span aria-hidden="true">↓</span></a></li>
						<li><a href="/data-room">{$messages.nav.newsroom.data}<span aria-hidden="true">→</span></a></li>
					</ul>
				</nav>
			</div>
			<!-- Directly under the page's h1, so the card titles are h2s. -->
			<MediaGrid items={featuredMedia} headingLevel={2} />
		</div>
	</section>

	<section id="coverage" class="media-block media-block--rest">
		<div class="media-block-inner">
			<div class="media-block-head">
				<p class="media-block-eyebrow">{$messages.media.pageEyebrow}</p>
				<h2 class="media-block-title">{$messages.media.pageTitle}</h2>
			</div>
			<MediaGrid items={restMedia} variant="light" />
		</div>
	</section>

	<section id="press" class="media-block media-block--press">
		<div class="media-block-inner">
			<div class="media-block-head">
				<p class="media-block-eyebrow">{$messages.pressReleases.eyebrow}</p>
				<h2 class="media-block-title">{$messages.pressReleases.sectionTitle}</h2>
				<p class="media-block-lede">{$messages.pressReleases.sectionLede}</p>
			</div>
			<PressReleaseGrid items={pressReleasesByRecent} />
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
		/* Clear the sticky nav when jumped to via /media#coverage. */
		scroll-margin-top: 5rem;
	}

	/* Press releases sit on the same deep-navy ground as the Featured band. */
	.media-block--press {
		background: var(--ink-deep);
		color: var(--paper);
		/* Clear the sticky nav when jumped to via /media#press. */
		scroll-margin-top: 5rem;
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

	.media-block--pinned .media-block-eyebrow,
	.media-block--press .media-block-eyebrow {
		color: var(--sky);
	}

	.media-block--pinned .media-block-eyebrow::before,
	.media-block--press .media-block-eyebrow::before {
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

	.media-block--pinned .media-block-title,
	.media-block--press .media-block-title {
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

	/* Shortcut links under the lede — square, hairline chips, like the header's
	   Newsroom menu they mirror. */
	.media-jump ul {
		list-style: none;
		margin: 1.4rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.media-jump a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.85rem;
		border: 1px solid rgba(247, 250, 252, 0.28);
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--sky);
		text-decoration: none;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.media-jump span {
		font-style: normal;
	}

	.media-jump a:hover,
	.media-jump a:focus-visible {
		background: rgba(247, 250, 252, 0.08);
		border-color: var(--sky);
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
