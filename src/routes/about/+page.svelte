<script>
	import Button from '$lib/components/Button.svelte';
	import Rail from '$lib/components/Rail.svelte';
	import { messages } from '$lib/i18n/locale';
	import { aboutTrail, aboutImageDims } from '$lib/data/aboutPhotos';

	/**
	 * Split a paragraph into runs on `**emphasis**` markers — odd segments are
	 * emphasized. Lets copy carry inline emphasis without HTML in the dictionaries.
	 * @param {string} text
	 */
	function runs(text) {
		return text.split('**').map((t, i) => ({ text: t, em: i % 2 === 1 }));
	}
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
				{#each $messages.about.introLede as para}
					<p class="about-intro-lede">{para}</p>
				{/each}
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
		{#each $messages.about.sections as section, i}
			<section class="about-section" class:has-media={section.image} class:media-left={i % 2 === 1}>
				<h2 class="section-title">{section.title}</h2>
				{#if section.image}
					<figure class="section-figure">
						<div class="section-figure-rail"><Rail /></div>
						<img
							class="section-figure-img"
							src={section.image}
							alt={section.caption}
							width={aboutImageDims[section.image]?.w}
							height={aboutImageDims[section.image]?.h}
							loading="lazy"
							decoding="async"
						/>
						{#if section.caption}
							<figcaption class="section-caption">{section.caption}</figcaption>
						{/if}
					</figure>
				{/if}
				<div class="section-body">
					{#each section.parts as part}
						{#if part.type === 'p'}
							<p>{#each runs(part.text) as run}{#if run.em}<em class="about-em">{run.text}</em>{:else}{run.text}{/if}{/each}</p>
						{:else if part.type === 'ul'}
							<ul>
								{#each part.items as li}
									<li>{li}</li>
								{/each}
							</ul>
						{/if}
					{/each}
				</div>
			</section>
		{/each}
	</div>

	{#if aboutTrail.length}
		<section class="about-trail" aria-label={$messages.about.trailAria}>
			<div class="about-trail-rail"><Rail /></div>
			<div class="about-trail-inner">
				<p class="about-trail-eyebrow">{$messages.about.trailEyebrow}</p>
				<div class="about-trail-viewport" aria-hidden="true">
					<!-- Track duplicated for a seamless loop; uniform height aligns the
					     portrait/landscape mix on a centered baseline. -->
					<div class="about-trail-track">
						{#each [0, 1] as copy (copy)}
							{#each aboutTrail as src}
								<img
									class="about-trail-img"
									{src}
									alt=""
									width={aboutImageDims[src]?.w}
									height={aboutImageDims[src]?.h}
									loading="lazy"
									decoding="async"
								/>
							{/each}
						{/each}
					</div>
				</div>
			</div>
		</section>
	{/if}

	<div class="about-cta">
		<Button href="https://secure.actblue.com/donate/peter-crosby-1">{$messages.common.donate}</Button>
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

	.about-intro-lede + .about-intro-lede {
		margin-top: 1rem;
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
		padding: 3rem 1.5rem 2.5rem;
	}

	.about-section {
		margin-bottom: 3.5rem;
	}

	.about-section:last-child {
		margin-bottom: 0;
	}

	/* Sections with an anchor photo: the framed image floats and the copy wraps
	   around it (magazine style) and continues below, so long sections don't leave
	   whitespace beside the image. Side alternates per section. */
	.about-section.has-media::after {
		content: '';
		display: block;
		clear: both;
	}

	/* Framed anchor photo — Rail stripe on top, hairline border, mono caption. */
	.section-figure {
		position: relative;
		margin: 0;
	}

	.about-section.has-media .section-figure {
		float: right;
		width: clamp(240px, 44%, 450px);
		margin: 0.4rem 0 1rem 2rem;
	}

	.about-section.media-left .section-figure {
		float: left;
		margin: 0.4rem 2rem 1rem 0;
	}

	.section-figure-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}

	.section-figure-img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid var(--line-l);
	}

	.section-caption {
		margin-top: 0.6rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	/* —— "On the trail" montage — dark band, masonry wall of candids —— */
	.about-trail {
		position: relative;
		background: var(--ink-deep);
		color: var(--paper);
		padding-block: clamp(2.5rem, 6vw, 4rem);
	}

	.about-trail-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.about-trail-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.about-trail-eyebrow {
		margin: 0 0 1.5rem;
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

	.about-trail-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--sky);
	}

	/* Slow horizontal marquee — a "campaign reel" of candids. Edge fades soften the
	   in/out; the track is duplicated in markup so translateX(-50%) loops seamlessly. */
	.about-trail-viewport {
		overflow: hidden;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
	}

	.about-trail-track {
		display: flex;
		align-items: center;
		width: max-content;
		animation: about-trail-marquee 75s linear infinite;
	}

	/* Pause when a visitor hovers or tabs in, so they can dwell on a photo. */
	.about-trail:hover .about-trail-track,
	.about-trail:focus-within .about-trail-track {
		animation-play-state: paused;
	}

	/* Uniform height aligns portrait + landscape on one centered baseline. */
	.about-trail-img {
		display: block;
		flex-shrink: 0;
		height: clamp(170px, 22vw, 240px);
		width: auto;
		margin-right: 0.6rem;
		border: 1px solid var(--line-d);
	}

	@keyframes about-trail-marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	/* Respect reduced-motion: stop the scroll and let the strip be swiped instead. */
	@media (prefers-reduced-motion: reduce) {
		.about-trail-track {
			animation: none;
		}

		.about-trail-viewport {
			overflow-x: auto;
		}
	}

	.about-cta {
		max-width: 1120px;
		margin: 0 auto;
		padding: clamp(2.5rem, 6vw, 3.5rem) 1.5rem;
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

	/* Inline emphasis (**…** in copy) — semibold italic serif to match the doc. */
	.about-em {
		font-style: italic;
		font-weight: 600;
		color: var(--ink);
	}

	.section-body p:last-child {
		margin-bottom: 0;
	}

	.section-body ul {
		margin: 0 0 1rem 0;
		padding-left: 1.25rem;
		list-style: none;
	}

	.section-body li {
		position: relative;
		margin-bottom: 0.6rem;
		padding-left: 1rem;
	}

	.section-body li:last-child {
		margin-bottom: 0;
	}

	/* Square hairline marker to match the brand's square-corner motif. */
	.section-body li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 6px;
		height: 6px;
		background: var(--blue);
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

		/* Stack anchor sections: title, then full-width photo, then copy. */
		.about-section.has-media .section-figure,
		.about-section.media-left .section-figure {
			float: none;
			width: auto;
			margin: 0 0 1.25rem;
		}

		/* Dark "campaign reel" bleeds edge-to-edge on mobile (like the home dark
		   sections) so the marquee runs to the screen edges. The eyebrow label keeps
		   the page's side margin so its text still lines up with the copy above. */
		.about-trail {
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
			box-sizing: border-box;
		}

		.about-trail-inner {
			padding: 0;
		}

		.about-trail-eyebrow {
			padding-inline: var(--mobile-margin);
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
