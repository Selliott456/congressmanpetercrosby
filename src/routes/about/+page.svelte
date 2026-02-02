<script>
	import { onMount } from 'svelte';
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';

	const TRANSITION_RANGE = 280; // px of scroll over which scale goes 1 → 0.7
	const MIN_SCALE = 0.7;

	let scale = 1;
	/** @type {HTMLDivElement | undefined} */
	let heroEl;
	/** @type {HTMLDivElement | undefined} */
	let heroInnerEl;
	let fullContentHeight = 0;

	function updateScale() {
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
		window.addEventListener('scroll', updateScale, { passive: true });
		return () => window.removeEventListener('scroll', updateScale);
	});
</script>

<svelte:head>
	<title>About Peter Crosby — Peter Crosby for Congress</title>
	<meta name="description" content="Learn about Peter Crosby: husband, father, experienced leader, and service-driven candidate for Northern Utah." />
</svelte:head>

<main class="about-page">
	<div class="about-hero" bind:this={heroEl}>
		<div class="about-hero-inner" bind:this={heroInnerEl} style="transform: scale({scale})">
			<img src="/images/family_peter.png" alt="Peter Crosby with his wife Amanda and their three daughters" class="about-hero-image" />
		</div>
	</div>

	<div class="about-content">
		<section class="about-section">
			<h2 class="section-title">Husband and father</h2>
			<div class="section-body">
				<p>My wife and I, along with our three daughters, have built a home in Cache Valley, where we have lived most of the 19 years Amanda and I have been married. We have raised three kind, passionate, brilliant, and remarkable young women. I am running to make sure they, and everyone else, have the opportunities we were promised.</p>
				<p>Being a parent can be filled with challenges and worries. They may be small (how long can a binky be on the floor before you have to rinse it off) or not so small (how are we going to afford to feed our kids this month). There are long nights and sometimes longer days, but we do it because we want them to go out into the world prepared to do great things. We teach them to be honest, to have integrity, to love their neighbor, and to work hard. And we want the world we send them out into to give them a fair shot at becoming who we know they can be. Please join me to help make that possible.</p>
			</div>
		</section>

		<section class="about-section">
			<h2 class="section-title">Experienced leader</h2>
			<div class="section-body">
				<p>I started my professional career working for a Fortune 500 company in operations. I worked my way up to a supervisory role within a year while going to school full time, and spent the next five to six years leading teams and projects. At the time I moved to a position in analytics at the corporate level, I had a staff of eleven and over 200 hundred employees helping to drive a line of business bringing in over $15 million in annual revenue.</p>
				<p>I left the private sector after a decade to work for Utah State University in institutional research, where I was able to serve our broader community as I supported the mission of our state land-grant university. As a first-generation college graduate with two degrees in political science, I know first-hand the value our universities in Northern Utah provide to individuals and communities, and I wanted to be part of that. So, I also started teaching, with my first classes focusing on American politics and institutions for undergraduates. I am grateful to continue my role as an educator working as an adjunct for the Center for Anticipatory Intelligence at USU, where I now teach a graduate course on emergent technology. Working with students as a mentor, instructor, and future colleague are perhaps some of the most rewarding professional experiences I have.</p>
				<p>My current full time employment is back in the private sector as a director, project manager, and consultant for a research company that supports higher education. Using my background in both the private and public sectors, I work with presidents, provosts, faculty, and support staff to help them navigate what has become a very unpredictable future.</p>
				<p>My education combined with my professional background have given me a lifetime of experience as leader. I know effective leadership is built on trust, and one of the most important things I can do is to earn yours. I hope you will give me that chance.</p>
			</div>
		</section>

		<section class="about-section">
			<h2 class="section-title">Service driven</h2>
			<div class="section-body">
				<p>My family has a history of public service going back the foundations of our country. My parents were both in the military, as were both of my grandfathers, and both of my brothers. I was a cadet in the ROTC until I blew my knee out in PT one morning, which set me on a different path. My wife's father, brothers, and grandparents also served. Service is hard coded into us, and my wife and I have tried to instill those values in our daughters.</p>
				<p>I know the rights and freedoms this country are built on require sacrifice from all of us if we are to keep them. I believe the oath I made as an Eagle Scout almost twenty-five years ago to better society still holds today. Public servants, like our Congressional representatives, are there to serve. It is a duty, an honor, and an obligation to put country and community before self. Please join me in doing our part.</p>
			</div>
		</section>

		<div class="about-cta">
			<ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1">Donate</ButtonSecondary>
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
		.about-content {
			padding-left: 0;
			padding-right: 0;
			text-align: center;
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
