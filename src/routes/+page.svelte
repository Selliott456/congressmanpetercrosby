
<script>
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';
	import ButtonPrimary from '$lib/components/ButtonPrimary.svelte';
	import { onMount } from 'svelte';

	const images = [
		{ src: '/images/better.svg', alt: 'Better' },
		{ src: '/images/expensive.svg', alt: 'Expensive' },
		{ src: '/images/inflation.svg', alt: 'Inflation' },
		{ src: '/images/law.svg', alt: 'Law' },
		{ src: '/images/safe.svg', alt: 'Safe' },
		{ src: '/images/save_lake.svg', alt: 'Save Lake' },
		{ src: '/images/shame.svg', alt: 'Shame' }
	];

	let currentIndex = 0;
	let autoPlayInterval;

	function nextSlide() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	onMount(() => {
		autoPlayInterval = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => {
			if (autoPlayInterval) {
				clearInterval(autoPlayInterval);
			}
		};
	});
</script>

<svelte:head>
	<title>Congressman Peter Crosby</title>
	<meta name="description" content="Welcome to the official website" />
</svelte:head>

<main>
	<div class="hero">
		<div class="hero-content">
			<img src="/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg" alt="Congressman Peter Crosby Logo" class="hero-logo" />
		</div>
	</div>

	<div class="tagline-section">
		<p class="tagline">
			<span class="tagline-bold">Strengthening Northern Utah</span> <span class="tagline-italic">through Utah Values</span>
		</p>
		<ButtonSecondary>Donate</ButtonSecondary>
	</div>

	<div class="about-section">
		<div class="about-content">
			<img src="/images/meet.svg" alt="Meet" class="about-image" />
			<div class="about-text">
				<p>My name is Peter Crosby, and I am running as a Democrat for U.S. Congress to represent northern Utah in District 2. I believe in integrity, community, and policies that make it easier for Utahns and their families to be safe and successful. Please join me in my campaign to get northern Utah back on track.</p>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="campaign-section">
			<div class="campaign-text">
				<h2>A campaign built on the support of individuals like you</h2>
				<p>My campaign depends on the support of hard working people who care about their neighbors and their community. Northern Utah is home to veterans, tradesmen, federal employees, educators, and entrepreneurs all working together to make something great. If you would like to help support us as we take on the kind of D.C. politics that have hurt us over the last few years, we have a place for you.</p>
				<ButtonPrimary>Volunteer</ButtonPrimary>
			</div>
			<div class="carousel">
				<div class="carousel-track">
					{#each images as image, index}
						<div class="carousel-slide" class:active={index === currentIndex}>
							<img src={image.src} alt={image.alt} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	:global(:root) {
		--color-primary: #002338;
		--color-secondary: #235926;
		--color-accent: #bbcedd;
		--color-white: #ffffff;
		--font-primary: 'Open Sauce One', sans-serif;
	}

	:global(body) {
		margin: 0;
		font-family: var(--font-primary);
		background: var(--color-white);
		min-height: 100vh;
		color: var(--color-primary);
	}

	main {
		padding: 0;
		background: var(--color-white);
	}

	.hero {
		background-image: url('/images/trees.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		backdrop-filter: blur(2px);
		background: rgba(187, 206, 221, 0.3);
		z-index: 1;
	}

	.hero-content {
		text-align: center;
		max-width: 1200px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0;
		padding: 0;
		margin: 0;
		position: relative;
		z-index: 2;
	}

	.hero-logo {
		width: auto;
		max-width: 450px;
		height: auto;
		display: block;
		flex-shrink: 0;
		padding: 0;
		margin: 0;
		clip-path: inset(5% 0 0 0);
	}

	.tagline-section {
		background: var(--color-white);
		padding: 4rem 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		position: relative;
		z-index: 1;
	}

	.tagline-section :global(.btn) {
		position: relative;
		overflow: hidden;
	}

	.tagline-section :global(.btn)::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.4),
			transparent
		);
		animation: shimmer 3s infinite;
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	.tagline {
		font-size: 1.75rem;
		color: var(--color-primary);
		margin: 0;
		line-height: 1.4;
		text-align: center;
	}

	.tagline-bold {
		font-weight: 700;
	}

	.tagline-italic {
		font-style: italic;
		font-weight: 400;
	}

	.about-section {
		background: var(--color-white);
		padding: 0;
		position: relative;
		overflow: hidden;
	}

	.about-section::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background-image: url('/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg');
		background-size: 200px 200px;
		background-repeat: repeat;
		opacity: 0.1;
		z-index: 0;
		pointer-events: none;
		transform: rotate(45deg);
		transform-origin: center center;
	}

	.about-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3rem;
		position: relative;
		z-index: 1;
	}

	.about-image {
		width: auto;
		max-width: 300px;
		height: auto;
		flex-shrink: 0;
	}

	.about-text {
		flex: 1;
	}

	.about-text p {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-primary);
		margin: 0;
	}

	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.campaign-section {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 4rem;
		width: 100%;
	}

	.campaign-text {
		flex: 1;
	}

	.campaign-text h2 {
		font-size: 2rem;
		color: var(--color-primary);
		margin: 0 0 1.5rem 0;
		line-height: 1.3;
	}

	.campaign-text p {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-primary);
		margin: 0 0 2rem 0;
	}

	.campaign-text :global(.btn) {
		margin-top: 0;
		position: relative;
		overflow: hidden;
	}

	.campaign-text :global(.btn)::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.4),
			transparent
		);
		animation: shimmer 3s infinite;
	}

	.carousel {
		position: relative;
		width: 100%;
		max-width: 500px;
		flex-shrink: 0;
	}

	.carousel-track {
		position: relative;
		width: 100%;
		height: 400px;
		overflow: hidden;
		border-radius: 8px;
	}

	.carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: translateX(100%);
		transition: opacity 0.5s ease, transform 0.5s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel-slide.active {
		opacity: 1;
		transform: translateX(0);
		z-index: 1;
	}

	.carousel-slide img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}


	@media (max-width: 640px) {
		.hero {
			padding: 0;
			margin: 0;
		}

		.hero-content {
			flex-direction: column;
			text-align: center;
			padding: 0;
			margin: 0;
		}

		.hero-logo {
			max-width: 300px;
			padding: 0;
			margin: 0;
		}

		.tagline-section {
			padding: 1.5rem;
		}

		.tagline {
			font-size: 1.25rem;
		}

		.about-section {
			padding: 3rem 1.5rem;
		}

		.about-content {
			flex-direction: column;
			gap: 2rem;
		}

		.about-image {
			max-width: 250px;
		}

		.about-text p {
			font-size: 1rem;
		}

		.container {
			padding: 3rem 1.5rem;
		}

		.campaign-section {
			flex-direction: column;
			gap: 2rem;
		}

		.campaign-text h2 {
			font-size: 1.5rem;
		}

		.campaign-text p {
			font-size: 1rem;
		}

		.carousel {
			max-width: 100%;
		}

		.carousel-track {
			height: 300px;
		}
	}
</style>
