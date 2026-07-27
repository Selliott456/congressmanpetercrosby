<script>
	import { messages } from '$lib/i18n/locale';
	import { homePressReleases } from '$lib/data/pressReleases';
	import PressReleaseGrid from './PressReleaseGrid.svelte';
</script>

<!-- Home-page row of the 3 most recent press releases, sits under the Media section. -->
<section class="pr-section" aria-labelledby="pr-home-heading">
	<div class="pr-section-inner">
		<p class="pr-section-eyebrow">{$messages.pressReleases.eyebrow}</p>
		<h2 id="pr-home-heading" class="pr-section-title">{$messages.pressReleases.homeTitle}</h2>
		<PressReleaseGrid items={homePressReleases} variant="light" />
		<a href="/media#press" class="pr-section-link">{$messages.pressReleases.viewAll} &rarr;</a>
	</div>
</section>

<style>
	.pr-section {
		background: var(--paper);
		color: var(--ink);
		/* Tighter top pad than Media so the two rows read as one newsroom block. */
		padding-block: 0 clamp(3rem, 7vw, 5rem);
	}

	.pr-section-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.pr-section-eyebrow {
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

	.pr-section-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.pr-section-title {
		margin: 0 0 2rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.6rem, 3.4vw, 2.25rem);
		letter-spacing: -0.03em;
		line-height: 1.04;
		color: var(--ink);
	}

	.pr-section-link {
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

	.pr-section-link:hover {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
