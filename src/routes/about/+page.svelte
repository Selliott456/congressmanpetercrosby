<script>
	import Button from '$lib/components/Button.svelte';
	import Rail from '$lib/components/Rail.svelte';
	import { messages } from '$lib/i18n/locale';
</script>

<svelte:head>
	<title>{$messages.about.metaTitle}</title>
	<meta name="description" content={$messages.about.metaDescription} />
</svelte:head>

<main class="about-page">
	<section class="about-intro" aria-labelledby="about-intro-title">
		<div class="about-intro-inner">
			<div class="about-intro-copy">
				<p class="about-intro-eyebrow">{$messages.about.eyebrow}</p>
				<h1 id="about-intro-title" class="about-intro-title">{$messages.about.introTitle}</h1>
				<p class="about-intro-lede">{$messages.about.introLede}</p>
			</div>
			<div class="about-intro-media">
				<img
					src="/images/family_peter.jpg"
					alt={$messages.about.heroAlt}
					class="about-intro-img"
					width="1600"
					height="1067"
					fetchpriority="high"
					decoding="async"
				/>
			</div>
		</div>
	</section>

	<Rail />

	<div class="about-content">
		{#each $messages.about.sections as section}
			<section class="about-section">
				<h2 class="section-title">{section.title}</h2>
				<div class="section-body">
					{#each section.paragraphs as para}
						<p>{para}</p>
					{/each}
				</div>
			</section>
		{/each}

		<div class="about-cta">
			<Button href="https://secure.actblue.com/donate/peter-crosby-1"
				>{$messages.common.donate}</Button
			>
		</div>
	</div>
</main>

<style>
	.about-page {
		padding: 0;
		background: var(--color-white);
	}

	/* —— Top intro: copy left, family photo right —— */
	.about-intro {
		background: var(--color-white);
	}

	.about-intro-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem;
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.about-intro-eyebrow {
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

	.about-intro-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.about-intro-title {
		margin: 0 0 1.25rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(2rem, 5vw, 3rem);
		letter-spacing: -0.035em;
		line-height: 1.02;
		color: var(--ink);
	}

	.about-intro-lede {
		margin: 0;
		font-family: var(--serif);
		font-size: clamp(1.0625rem, 2.2vw, 1.25rem);
		line-height: 1.55;
		color: var(--ink-2);
	}

	.about-intro-img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid var(--line-l);
	}

	.about-content {
		max-width: 1120px;
		margin: 0 auto;
		padding: 3rem 1.5rem 4rem;
	}

	.about-section {
		margin-bottom: 3rem;
	}

	.about-section:last-child {
		margin-bottom: 0;
	}

	.about-cta {
		margin-top: 2.5rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(0, 35, 56, 0.08);
		text-align: center;
	}

	.section-title {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		color: var(--ink);
		margin: 0 0 1rem 0;
		line-height: 1.15;
	}

	.section-body {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--ink-2);
	}

	.section-body p {
		margin: 0 0 1rem 0;
	}

	.section-body p:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.about-intro-inner {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.about-content {
			padding-left: 0;
			padding-right: 0;
		}
	}

	@media (max-width: 640px) {
		.about-content {
			padding: 2rem 0 3rem;
		}

		.about-section {
			margin-bottom: 2.5rem;
		}

		.section-title {
			font-size: 1.25rem;
		}

		.section-body {
			font-size: 1rem;
		}
	}
</style>
