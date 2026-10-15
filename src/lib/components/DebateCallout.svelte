<script>
	/**
	 * Permanent link to the recording of the Utah Debate Commission's CD2 debate, shown at
	 * the top of the home page's Newsroom / media section.
	 *
	 * It is deliberately not a media card: the debate also has one in `media.ts`, but the
	 * home section shows only the three most recent items, so the card rotates out as new
	 * coverage lands. This keeps the debate reachable from the home page for good.
	 *
	 * Until the broadcast it was a live promo in three variants that removed itself when
	 * the window closed; all of that came out on 2026-10-15. The Commission is nonpartisan,
	 * so it is credited in text and never with its mark.
	 */
	import { messages } from '$lib/i18n/locale';
	import { DEBATE } from '$lib/data/debate';
	import Rail from './Rail.svelte';
</script>

<aside class="debate" aria-labelledby="debate-callout-title">
	<Rail height="4px" />
	<div class="debate-inner">
		<p class="debate-eyebrow">{$messages.debate.eyebrow}</p>
		<h3 class="debate-title" id="debate-callout-title">{$messages.debate.title}</h3>
		<p class="debate-when">{$messages.debate.when}</p>
		<p class="debate-host">{$messages.debate.host}</p>
		<a class="debate-cta" href={DEBATE.url} target="_blank" rel="noopener noreferrer">
			{$messages.debate.cta}
		</a>
	</div>
</aside>

<style>
	.debate {
		border: 1px solid var(--line-l);
		background: var(--paper-2);
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}

	.debate-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
		padding: clamp(1.5rem, 4vw, 2.25rem) 1.25rem clamp(1.6rem, 4vw, 2.25rem);
	}

	.debate-eyebrow {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.debate-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.4rem, 3.2vw, 2rem);
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: var(--ink-deep);
		text-wrap: balance;
	}

	.debate-when {
		margin: 0.15rem 0 0;
		font-family: var(--mono);
		font-size: 0.9375rem;
		letter-spacing: 0.04em;
		color: var(--ink);
	}

	.debate-host {
		margin: 0;
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		color: var(--ink-2);
	}

	.debate-cta {
		margin-top: 0.85rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.9375rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-decoration: none;
		padding: 0.8rem 1.75rem;
		border: 2px solid var(--ink);
		background: var(--ink);
		color: var(--paper);
		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.debate-cta:hover,
	.debate-cta:focus-visible {
		background: var(--ink-2);
		border-color: var(--ink-2);
	}

	@media (max-width: 480px) {
		.debate-cta {
			width: 100%;
			box-sizing: border-box;
			text-align: center;
			padding-inline: 1rem;
		}
	}
</style>
