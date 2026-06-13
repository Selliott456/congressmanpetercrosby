<script>
	import { messages } from '$lib/i18n/locale';

	// Placeholder endorsements for testing — swap for real names/orgs later.
	const endorsements = [
		'Utah Education Association',
		'Sen. Maria Delgado',
		'Cache Valley Labor Council',
		'Mayor Tom Whitfield · Logan',
		'Northern Utah Farmers Coalition',
		'Rep. James Okafor',
		'Ogden Firefighters Local 514'
	];
</script>

<section class="endorse" aria-label={$messages.endorsements.eyebrow}>
	<div class="endorse-inner">
		<p class="endorse-eyebrow">{$messages.endorsements.eyebrow}</p>

		<!-- Accessible, static list for screen readers / no-motion -->
		<ul class="endorse-sr">
			{#each endorsements as name}
				<li>{name}</li>
			{/each}
		</ul>

		<!-- Decorative animated ticker: list duplicated for a seamless loop -->
		<div class="endorse-viewport" aria-hidden="true">
			<div class="endorse-track">
				{#each [0, 1] as copy (copy)}
					{#each endorsements as name}
						<span class="endorse-item">{name}</span>
						<span class="endorse-stars">★ ★</span>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.endorse {
		background: var(--blue);
		color: var(--paper);
		overflow: hidden;
	}

	.endorse-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.95rem 1.5rem 1.05rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.55rem;
	}

	.endorse-eyebrow {
		margin: 0;
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

	.endorse-eyebrow::before {
		content: '';
		width: 22px;
		height: 2px;
		background: var(--sky);
	}

	.endorse-viewport {
		width: 100%;
		min-width: 0;
		overflow: hidden;
		/* Fade the items in/out at the edges */
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
	}

	.endorse-track {
		display: flex;
		align-items: center;
		width: max-content;
		white-space: nowrap;
		animation: endorse-marquee 35s linear infinite;
	}

	/* Pause when a visitor hovers, so they can read a name */
	.endorse:hover .endorse-track {
		animation-play-state: paused;
	}

	.endorse-item {
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.9375rem;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		color: var(--paper);
	}

	/* Double-star motif between items; padding sets the spacing on both sides */
	.endorse-stars {
		padding: 0 1.15rem;
		color: var(--sky);
		font-size: 0.8125rem;
		letter-spacing: 0.12em;
		line-height: 1;
	}

	@keyframes endorse-marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.endorse-track {
			animation: none;
		}
	}

	/* Edge-to-edge on mobile (mirror the hero's full-bleed) */
	@media (max-width: 768px) {
		.endorse {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
		}

		.endorse-inner {
			padding-left: var(--mobile-margin);
			padding-right: var(--mobile-margin);
		}
	}

	.endorse-sr {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		list-style: none;
	}
</style>
