<script>
	import Button from '$lib/components/Button.svelte';
	import Rail from '$lib/components/Rail.svelte';
	import { messages } from '$lib/i18n/locale';
</script>

<svelte:head>
	<title>{$messages.policies.metaTitle}</title>
	<meta name="description" content={$messages.policies.metaDescription} />
</svelte:head>

<main class="policies-page">
	<section class="policies-hero">
		<div class="policies-hero-inner">
			<p class="policies-eyebrow">{$messages.policies.eyebrow}</p>
			<h1 class="policies-title">{$messages.policies.pageTitle}</h1>
			<p class="policies-lede">{$messages.policies.lede}</p>
		</div>
	</section>

	<section class="policies-body">
		<div class="policies-body-inner">
			{#each $messages.policies.items as item}
				<section class="policies-section">
					<div class="policies-text">
						<h2 class="policies-question">{item.question}</h2>
						<div class="policies-answer">
							{#each item.parts as part}
								{#if part.type === 'p'}
									<p>{part.text}</p>
								{:else if part.type === 'ul'}
									<ul>
										{#each part.items as li}
											<li>{li}</li>
										{/each}
									</ul>
								{/if}
							{/each}
						</div>
					</div>

					<div class="policies-media">
						<!-- Placeholder for a forthcoming video of Peter on this position. -->
						<div class="policy-video" role="img" aria-label={$messages.policies.videoComingSoon}>
							<div class="policy-video-rail"><Rail /></div>
							<span class="policy-video-play" aria-hidden="true"></span>
							<span class="policy-video-label">{$messages.policies.videoComingSoon}</span>
						</div>
					</div>
				</section>
			{/each}

			<div class="policies-cta">
				<Button href="https://secure.actblue.com/donate/peter-crosby-1">{$messages.common.donate}</Button>
			</div>
		</div>
	</section>
</main>

<style>
	.policies-page {
		background: var(--paper);
	}

	/* Dark intro band — separates the heading from the policy items below. */
	.policies-hero {
		background: var(--ink-deep);
		color: var(--paper);
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.policies-hero-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.policies-eyebrow {
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

	.policies-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--sky);
	}

	.policies-title {
		font-family: var(--display);
		font-style: italic;
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.035em;
		color: var(--paper);
		margin: 0 0 0.75rem 0;
		line-height: 1.02;
	}

	.policies-lede {
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.25rem;
		line-height: 1.55;
		color: rgba(247, 250, 252, 0.82);
		margin: 0;
	}

	/* Light body band — the policy items. */
	.policies-body {
		background: var(--paper);
		color: var(--ink);
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.policies-body-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.policies-section {
		display: grid;
		grid-template-columns: 1fr minmax(280px, 360px);
		gap: 2.5rem 3rem;
		align-items: start;
		padding-bottom: 3rem;
		margin-bottom: 3rem;
		border-bottom: 1px solid var(--line-l);
	}

	.policies-section:last-of-type {
		padding-bottom: 0;
		margin-bottom: 0;
		border-bottom: none;
	}

	.policies-text {
		min-width: 0;
	}

	.policies-question {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--ink);
		margin: 0 0 1rem 0;
		line-height: 1.3;
	}

	.policies-answer {
		font-family: var(--font-primary);
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--ink-2);
	}

	.policies-answer p {
		margin: 0 0 1rem 0;
	}

	.policies-answer p:last-child {
		margin-bottom: 0;
	}

	.policies-answer ul {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
	}

	.policies-answer li {
		margin-bottom: 0.35rem;
	}

	.policies-answer li:last-child {
		margin-bottom: 0;
	}

	/* Video placeholder — mirrors the MediaCard thumb (dark gradient + rail + play). */
	.policies-media {
		min-width: 0;
	}

	.policy-video {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: linear-gradient(150deg, var(--ink) 0%, var(--ink-deep) 100%);
		border: 1px solid var(--line-d);
	}

	.policy-video-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.policy-video-play {
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 13px 0 13px 22px;
		border-color: transparent transparent transparent var(--paper);
		margin-left: 5px;
	}

	.policy-video-label {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0.3rem 0.65rem;
		background: var(--ink-deep);
		font-family: var(--mono);
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--sky);
	}

	.policies-cta {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--line-l);
		text-align: center;
	}

	@media (max-width: 768px) {
		/* Full-bleed bands (mirror the Media page) so the dark hero reaches the edges. */
		.policies-hero,
		.policies-body {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
		}

		.policies-hero-inner,
		.policies-body-inner {
			padding-left: var(--mobile-margin);
			padding-right: var(--mobile-margin);
			text-align: center;
		}

		.policies-eyebrow {
			justify-content: center;
		}

		.policies-lede {
			margin-left: auto;
			margin-right: auto;
		}

		.policies-section {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	@media (max-width: 640px) {
		.policies-title {
			margin-bottom: 0.5rem;
		}

		.policies-lede {
			font-size: 1.125rem;
		}

		.policies-question {
			font-size: 1.125rem;
		}

		.policies-answer {
			font-size: 1rem;
		}

		.policies-section {
			padding-bottom: 2rem;
			margin-bottom: 2rem;
		}
	}
</style>
