<script>
	/**
	 * Centered promo for the Utah Debate Commission's CD2 debate, shown on the home
	 * media section (light ground) and above the /media Featured band (dark ground).
	 *
	 * Renders nothing once the broadcast window has passed — see `debateHasEnded`.
	 * The Commission is nonpartisan: it is credited in text, never with its mark, so
	 * nothing here reads as the Commission taking the campaign's side.
	 */
	import { messages } from '$lib/i18n/locale';
	import { DEBATE, debateHasEnded } from '$lib/data/debate';
	import Rail from './Rail.svelte';

	/**
	 * Ground this sits on: 'dark' in the /media Featured band, 'light' on a paper ground,
	 * and 'banner' for the slim sky-blue strip that runs directly under the nav on the
	 * home page in the run-up to the debate.
	 */
	export let variant = 'light';

	$: isBanner = variant === 'banner';

	/** Evaluated once at mount rather than at module load, so a long-open tab still
	    hides it after the debate ends. */
	let ended = debateHasEnded();
</script>

{#if !ended}
	<aside class="debate {variant}" aria-labelledby="debate-callout-title">
		<Rail height={isBanner ? '3px' : '4px'} />
		<div class="debate-inner">
			<p class="debate-eyebrow">{$messages.debate.eyebrow}</p>
			<!-- The banner sits above the page's <h1>, so its title is a <p> there: a heading
			     ahead of the h1 would break the document outline. The aside is still named by
			     it either way. -->
			{#if isBanner}
				<p class="debate-title" id="debate-callout-title">{$messages.debate.title}</p>
			{:else}
				<h3 class="debate-title" id="debate-callout-title">{$messages.debate.title}</h3>
			{/if}
			<p class="debate-when">{$messages.debate.when}</p>
			<p class="debate-host">{$messages.debate.host}</p>
			<a
				class="debate-cta"
				href={DEBATE.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{$messages.debate.cta}
			</a>
		</div>
	</aside>
{/if}

<style>
	.debate {
		border: 1px solid var(--line-l);
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}

	.debate.light {
		background: var(--paper-2);
	}

	.debate.dark {
		background: var(--ink-2);
		border-color: var(--line-d);
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

	.debate.dark .debate-eyebrow {
		color: var(--sky);
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

	.debate.dark .debate-title {
		color: var(--paper);
	}

	.debate-when {
		margin: 0.15rem 0 0;
		font-family: var(--mono);
		font-size: 0.9375rem;
		letter-spacing: 0.04em;
		color: var(--ink);
	}

	.debate.dark .debate-when {
		color: var(--paper);
	}

	.debate-host {
		margin: 0;
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		color: var(--ink-2);
	}

	.debate.dark .debate-host {
		color: var(--sky);
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
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.debate-cta:hover {
		background: var(--ink-2);
		border-color: var(--ink-2);
	}

	.debate.dark .debate-cta {
		border-color: var(--sky);
		background: var(--sky);
		color: var(--ink-deep);
	}

	.debate.dark .debate-cta:hover {
		background: var(--paper);
		border-color: var(--paper);
	}

	/* ── Banner: slim full-bleed strip directly under the nav ─────────────────
	   Sky rather than navy so it separates from the deep-navy nav above it and the
	   deep-navy hero below, instead of merging with both. One line on desktop; it
	   wraps to centered rows on narrow screens. */
	.debate.banner {
		border: none;
		border-bottom: 1px solid var(--line-d);
		background: var(--sky);
		margin-bottom: 0;
	}

	.debate.banner .debate-inner {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		text-align: left;
		column-gap: 1rem;
		row-gap: 0.45rem;
		/* 1200px to line up with the nav and announcement bar above it, not the 1120px
		   content column — this is page chrome, so it tracks the chrome. */
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.6rem 1.5rem;
	}

	/* The banner has to clear one line in both languages, and the Commission credit is the
	   longest, least load-bearing part of it. It stays on the /media callout and the
	   /events card, and the CTA leads to the Commission's own channel. */
	.debate.banner .debate-host {
		display: none;
	}

	.debate.banner .debate-eyebrow {
		color: var(--ink-deep);
		padding: 0.22rem 0.5rem;
		border: 1px solid var(--ink-deep);
		white-space: nowrap;
	}

	.debate.banner .debate-title {
		font-size: clamp(1.05rem, 2vw, 1.3rem);
		color: var(--ink-deep);
	}

	.debate.banner .debate-when {
		margin: 0;
		font-size: 0.85rem;
		color: var(--ink-deep);
	}

	.debate.banner .debate-host {
		font-size: 0.8rem;
		color: var(--ink-2);
	}

	.debate.banner .debate-cta {
		margin-top: 0;
		font-size: 0.8125rem;
		padding: 0.5rem 1.15rem;
		border-color: var(--ink-deep);
		background: var(--ink-deep);
		color: var(--paper);
	}

	.debate.banner .debate-cta:hover {
		background: var(--ink);
		border-color: var(--ink);
	}

	/* `.layout-main` pads the page by --mobile-margin at this width, which would leave the
	   banner inset while the hero directly below it bleeds. Cancel the padding the same way
	   the hero does, so the two line up edge to edge. */
	@media (max-width: 768px) {
		.debate.banner {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
			box-sizing: border-box;
		}
	}

	@media (max-width: 720px) {
		.debate.banner .debate-inner {
			text-align: center;
		}
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
