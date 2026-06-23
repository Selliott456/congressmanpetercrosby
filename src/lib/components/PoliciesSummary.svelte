<script>
	import { messages } from '$lib/i18n/locale';
	import Rail from './Rail.svelte';

	$: areas = $messages.home.policiesSummaryAreas;
</script>

<!--
	Temporary home stand-in for the full "Priorities" section while the campaign
	finalizes that copy. Summarizes the Policies page and forwards to /policies.
	When Priorities is ready, swap this back for <Priorities /> on the home page.
-->
<section class="pol-summary" aria-labelledby="pol-summary-heading">
	<div class="pol-inner">
		<p class="pol-eyebrow">{$messages.home.policiesSummaryEyebrow}</p>
		<h2 id="pol-summary-heading" class="pol-title">{$messages.home.policiesSummaryTitle}</h2>
		<p class="pol-lede">{$messages.home.policiesSummaryLede}</p>

		<ul class="pol-areas">
			{#each areas as area (area.title)}
				<li class="pol-area">
					<Rail />
					<h3 class="pol-area-title">{area.title}</h3>
					<p class="pol-area-text">{area.text}</p>
				</li>
			{/each}
		</ul>

		<a href="/policies" class="pol-link">{$messages.home.policiesSummaryLink}</a>
	</div>
</section>

<style>
	.pol-summary {
		background: var(--paper);
		padding-block: clamp(3rem, 7vw, 5rem);
	}

	.pol-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.pol-eyebrow {
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

	.pol-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.pol-title {
		margin: 0 0 0.65rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.6rem, 3.4vw, 2.25rem);
		letter-spacing: -0.03em;
		line-height: 1.04;
		color: var(--ink);
	}

	.pol-lede {
		margin: 0 0 2rem;
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.pol-areas {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.pol-area {
		background: var(--paper-2);
		padding: 1.4rem 1.5rem 1.6rem;
	}

	/* Rail (ridge-line stripe) tops each area card. */
	.pol-area :global(.rail) {
		margin: -1.4rem -1.5rem 1.1rem;
	}

	.pol-area-title {
		margin: 0 0 0.5rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
		color: var(--ink);
	}

	.pol-area-text {
		margin: 0;
		font-family: var(--sans);
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.pol-link {
		display: inline-block;
		margin-top: 1.75rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--blue);
		text-decoration: none;
	}

	.pol-link:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (max-width: 768px) {
		.pol-areas {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
