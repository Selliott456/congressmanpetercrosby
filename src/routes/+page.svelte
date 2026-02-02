
<script>
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';
	import ButtonPrimary from '$lib/components/ButtonPrimary.svelte';
	import { onMount } from 'svelte';

	const socialLinks = [
		{ name: 'TikTok', href: 'https://www.tiktok.com/@petercrosbyforcongress?is_from_webapp=1&sender_device=pc', icon: 'tiktok', label: 'TikTok' },
		{ name: 'YouTube', href: 'https://www.youtube.com/@PeterCrosbyforCongress', icon: 'youtube', label: 'YouTube' },
		{ name: 'Instagram', href: 'https://www.instagram.com/petercrosbyut/', icon: 'instagram', label: 'Instagram' },
		{ name: 'Facebook', href: 'https://www.facebook.com/people/Peter-Crosby-for-Congress/61583498494612/', icon: 'facebook', label: 'Facebook' },
		{ name: 'Substack', href: 'https://substack.com/@petercrosbyforcongress?r=3en65r&utm_medium=ios&utm_source=profile', icon: 'substack', label: 'Substack' }
	];

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
	<title>Peter Crosby for Congress</title>
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
		<ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1">Donate</ButtonSecondary>
	</div>

	<div class="about-section">
		<div class="about-content">
			<img src="/images/meet.svg" alt="Meet" class="about-image" />
			<div class="about-text">
				<p>My name is Peter Crosby, and I am running as a Democrat for U.S. Congress to represent northern Utah in District 2. I believe in integrity, community, and policies that make it easier for Utahns and their families to be safe and successful. Please join me in my campaign to get northern Utah back on track.</p>
				<div class="about-social" aria-label="Social media links">
					{#each socialLinks as link}
						<a href={link.href} class="about-social-link" aria-label={link.label} target="_blank" rel="noopener noreferrer">
							{#if link.icon === 'tiktok'}
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
							{:else if link.icon === 'youtube'}
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
							{:else if link.icon === 'instagram'}
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
							{:else if link.icon === 'facebook'}
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
							{:else if link.icon === 'substack'}
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="campaign-section">
			<div class="campaign-text">
				<h2>A campaign built on the support of individuals like you</h2>
				<p>My campaign depends on the support of hard working people who care about their neighbors and their community. Northern Utah is home to veterans, tradesmen, federal employees, educators, and entrepreneurs all working together to make something great. If you would like to help support us as we take on the kind of D.C. politics that have hurt us over the last few years, we have a place for you.</p>
				<ButtonPrimary href="mailto:petercrosbyforcongress@gmail.com?subject=Volunteering">Volunteer</ButtonPrimary>
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

	.about-social {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.about-social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		color: var(--color-primary);
		border-radius: 8px;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.about-social-link:hover {
		background: rgba(0, 35, 56, 0.08);
		color: var(--color-primary);
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


	@media (max-width: 768px) {
		.tagline-section {
			text-align: center;
		}

		.about-content {
			text-align: center;
		}

		.about-text p,
		.about-social {
			justify-content: center;
		}

		.campaign-text {
			text-align: center;
		}

		.campaign-text :global(.btn) {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			text-align: center;
		}

		/* Hero full-bleed: 100vw, no side margin */
		.hero {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
			box-sizing: border-box;
		}

		.tagline-section {
			padding-left: 0;
			padding-right: 0;
		}

		.about-content {
			flex-direction: column;
			gap: 2rem;
			padding-left: 0;
			padding-right: 0;
		}

		.container {
			padding-left: 0;
			padding-right: 0;
		}

		.campaign-section {
			flex-direction: column;
			gap: 2rem;
		}
	}

	@media (max-width: 640px) {
		.hero {
			padding: 0;
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
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
		}

		.tagline {
			font-size: 1.25rem;
		}

		.about-section {
			padding-top: 3rem;
			padding-bottom: 3rem;
		}

		.about-image {
			max-width: 250px;
		}

		.about-text p {
			font-size: 1rem;
		}

		.container {
			padding-top: 3rem;
			padding-bottom: 3rem;
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
