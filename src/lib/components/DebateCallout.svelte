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

	/** Ground this sits on: 'light' on the home page, 'dark' in the Featured band. */
	export let variant = 'light';

	/** Evaluated once at mount rather than at module load, so a long-open tab still
	    hides it after the debate ends. */
	let ended = debateHasEnded();
</script>

{#if !ended}
	<aside class="debate {variant}" aria-labelledby="debate-callout-title">
		<Rail height="4px" />
		<div class="debate-inner">
			<p class="debate-eyebrow">{$messages.debate.eyebrow}</p>
			<h3 class="debate-title" id="debate-callout-title">{$messages.debate.title}</h3>
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

	@media (max-width: 480px) {
		.debate-cta {
			width: 100%;
			box-sizing: border-box;
			text-align: center;
			padding-inline: 1rem;
		}
	}
</style>
