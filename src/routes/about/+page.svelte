<script>
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import { messages } from '$lib/i18n/locale';

	const TRANSITION_RANGE = 280; // px of scroll over which scale goes 1 → 0.7
	const MIN_SCALE = 0.7;

	let scale = 1;
	/** @type {HTMLDivElement | undefined} */
	let heroEl;
	/** @type {HTMLDivElement | undefined} */
	let heroInnerEl;
	let fullContentHeight = 0;

	function isMobileLayout() {
		return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
	}

	function updateScale() {
		if (isMobileLayout()) {
			scale = 1;
			if (heroEl) heroEl.style.height = '';
			return;
		}
		const scrollY = window.scrollY ?? window.pageYOffset;
		const progress = (TRANSITION_RANGE - scrollY) / TRANSITION_RANGE;
		const clamped = Math.max(0, Math.min(1, progress));
		scale = MIN_SCALE + (1 - MIN_SCALE) * clamped;
		// Shrink hero height with the picture so the background matches
		if (heroEl && fullContentHeight > 0) {
			heroEl.style.height = `${fullContentHeight * scale}px`;
		}
	}

	onMount(() => {
		const measure = () => {
			if (heroInnerEl) fullContentHeight = heroInnerEl.offsetHeight;
			updateScale();
		};
		measure();
		// Re-measure after image loads in case layout wasn't final
		if (heroInnerEl) {
			const img = heroInnerEl.querySelector('img');
			if (img && !img.complete) img.addEventListener('load', measure);
		}
		const mq = window.matchMedia('(max-width: 768px)');
		const onMq = () => measure();
		mq.addEventListener('change', onMq);
		window.addEventListener('scroll', updateScale, { passive: true });
		return () => {
			mq.removeEventListener('change', onMq);
			window.removeEventListener('scroll', updateScale);
		};
	});
</script>

<svelte:head>
	<title>{$messages.about.metaTitle}</title>
	<meta name="description" content={$messages.about.metaDescription} />
</svelte:head>

<main class="about-page">
	<div class="about-hero" bind:this={heroEl}>
		<div class="about-hero-inner" bind:this={heroInnerEl} style="transform: scale({scale})">
			<img src="/images/family_peter.png" alt={$messages.about.heroAlt} class="about-hero-image" />
		</div>
	</div>

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
			<Button href="https://secure.actblue.com/donate/peter-crosby-1">{$messages.common.donate}</Button>
		</div>
	</div>
</main>

<style>
	.about-page {
		padding: 0;
		background: var(--color-white);
	}

	.about-hero {
		background: var(--color-white);
		padding: 0;
		border-bottom: 1px solid rgba(0, 35, 56, 0.08);
		position: sticky;
		top: 6rem; /* below nav (logo 72px + padding) */
		z-index: 10;
		overflow: hidden;
		transition: height 0.12s ease-out;
	}

	.about-hero::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 400vmax;
		height: 400vmax;
		margin-left: -200vmax;
		margin-top: -200vmax;
		background-image: url('/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg');
		background-size: 200px 200px;
		background-repeat: repeat;
		opacity: 0.1;
		z-index: 0;
		pointer-events: none;
		transform: rotate(45deg);
		transform-origin: center center;
	}

	.about-hero-inner {
		position: relative;
		z-index: 1;
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		transform-origin: top center;
		transition: transform 0.12s ease-out;
	}

	.about-hero-image {
		width: 100%;
		max-width: 500px;
		height: auto;
		display: block;
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 35, 56, 0.15);
	}

	.about-content {
		max-width: 800px;
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
		font-family: var(--font-primary);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 1rem 0;
		line-height: 1.3;
		text-transform: capitalize;
	}

	.section-body {
		font-family: var(--font-primary);
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--color-primary);
	}

	.section-body p {
		margin: 0 0 1rem 0;
	}

	.section-body p:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		/* Sticky + z-index was painting the hero above scrolling body copy; text ran underneath */
		.about-hero {
			position: relative;
			top: auto;
			z-index: auto;
			overflow: visible;
		}

		.about-content {
			padding-left: 0;
			padding-right: 0;
			text-align: center;
			position: relative;
			z-index: 0;
			background: var(--color-white);
		}

		.about-cta {
			text-align: center;
		}
	}

	@media (max-width: 640px) {
		.about-hero {
			padding: 0;
		}

		.about-hero-image {
			max-width: 100%;
		}

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
