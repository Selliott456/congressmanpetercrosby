<script>
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Rail from '$lib/components/Rail.svelte';
	import { messages } from '$lib/i18n/locale';

	/** Sections that get the 2-column video layout (each carries its own src/poster/label).
	    Everything else is full-width text.
	    @type {Record<string, { src: string; poster: string; labelKey: 'videoAffordabilityLabel' | 'videoAccountabilityLabel' | 'videoStewardshipLabel' }>} */
	const sectionMedia = {
		affordability: {
			src: '/images/policies/affordability.mp4',
			poster: '/images/policies/affordability-poster.jpg',
			labelKey: 'videoAffordabilityLabel'
		},
		'government-integrity': {
			src: '/images/policies/accountability.mp4',
			poster: '/images/policies/accountability-poster.jpg',
			labelKey: 'videoAccountabilityLabel'
		},
		'great-salt-lake': {
			src: '/images/policies/stewardship.mp4',
			poster: '/images/policies/stewardship-poster.jpg',
			labelKey: 'videoStewardshipLabel'
		}
	};

	/** Anchor id of the section currently in view — drives the "you are here" highlight. */
	let activeId = '';
	/** The sticky jump bar; its height feeds the anchor offset. @type {HTMLElement | undefined} */
	let jumpBar;
	/** The horizontally-scrollable jump list (overflows on narrow screens). @type {HTMLElement | undefined} */
	let jumpInner;
	/** Edge-fade visibility — each is true only when there's hidden content to scroll toward. */
	let canScrollLeft = false;
	let canScrollRight = false;
	/** Offsets for the two stacked sticky bars (site nav + jump bar), applied as CSS vars. */
	let navTop = 0;
	let anchorOffset = 0;

	function measure() {
		const siteNav = /** @type {HTMLElement | null} */ (document.querySelector('.nav'));
		const navH = siteNav?.offsetHeight ?? 64;
		navTop = navH;
		anchorOffset = navH + (jumpBar?.offsetHeight ?? 0) + 16;
		updateScrollEdges();
	}

	/** Show the left/right fades based on how far the jump list is scrolled; both stay
	    off when nothing overflows (so the fades never lie about scrollability). */
	function updateScrollEdges() {
		if (!jumpInner) return;
		const max = jumpInner.scrollWidth - jumpInner.clientWidth;
		canScrollLeft = jumpInner.scrollLeft > 1;
		canScrollRight = jumpInner.scrollLeft < max - 1;
	}

	/** Keep the active link in view (centered) within the scrollable list. */
	function scrollActiveIntoView() {
		if (!jumpInner || jumpInner.scrollWidth <= jumpInner.clientWidth) return;
		const link = jumpInner.querySelector('.policies-jump-link[href="#' + activeId + '"]');
		if (!link) return;
		const c = jumpInner.getBoundingClientRect();
		const l = link.getBoundingClientRect();
		const target = jumpInner.scrollLeft + (l.left - c.left) - (c.width - l.width) / 2;
		jumpInner.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
	}

	// Chase the highlight: whenever the active section changes, slide it into view.
	$: if (jumpInner && activeId) scrollActiveIntoView();

	/** @param {string} id */
	function jumpTo(id) {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth' });
		activeId = id;
		history.replaceState(null, '', '#' + id);
	}

	onMount(() => {
		// Default the highlight so the bar is never blank at the top of the page.
		activeId = $messages.policies.items[0]?.id ?? '';
		measure();
		window.addEventListener('resize', measure);
		jumpInner?.addEventListener('scroll', updateScrollEdges, { passive: true });

		const sections = Array.from(document.querySelectorAll('.policies-section'));
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]?.target?.id) activeId = visible[0].target.id;
			},
			{ rootMargin: '-45% 0px -50% 0px', threshold: 0 }
		);
		sections.forEach((s) => observer.observe(s));

		// Re-correct a deep-linked anchor once the sticky offsets are known.
		const hashId = location.hash.slice(1);
		if (hashId && document.getElementById(hashId)) {
			requestAnimationFrame(() => {
				document.getElementById(hashId)?.scrollIntoView();
				activeId = hashId;
			});
		}

		return () => {
			window.removeEventListener('resize', measure);
			jumpInner?.removeEventListener('scroll', updateScrollEdges);
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>{$messages.policies.metaTitle}</title>
	<meta name="description" content={$messages.policies.metaDescription} />
</svelte:head>

<main
	class="policies-page"
	style="--policies-nav-top: {navTop}px; --policies-anchor: {anchorOffset}px;"
>
	<section class="policies-hero">
		<div class="policies-hero-inner">
			<p class="policies-eyebrow">{$messages.policies.eyebrow}</p>
			<h1 class="policies-title">{$messages.policies.pageTitle}</h1>
			<p class="policies-lede">{$messages.policies.lede}</p>
		</div>
	</section>

	<div class="policies-rail">
		<Rail />
	</div>

	<nav
		class="policies-jump"
		class:has-left-fade={canScrollLeft}
		class:has-right-fade={canScrollRight}
		aria-label={$messages.policies.onThisPage}
		bind:this={jumpBar}
	>
		<div class="policies-jump-inner" bind:this={jumpInner}>
			<span class="policies-jump-label">{$messages.policies.onThisPage}</span>
			<ul class="policies-jump-list">
				{#each $messages.policies.items as item}
					{#if item.groupHeading}
						<li class="policies-jump-sep" aria-hidden="true"></li>
					{/if}
					<li>
						<a
							class="policies-jump-link"
							class:is-active={activeId === item.id}
							href={'#' + item.id}
							aria-current={activeId === item.id ? 'true' : undefined}
							on:click|preventDefault={() => jumpTo(item.id)}
						>
							{item.navLabel}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>

	<section class="policies-body">
		<div class="policies-body-inner">
			{#each $messages.policies.items as item}
				{@const media = sectionMedia[item.id]}
				{#if item.groupHeading}
					<div class="policies-group">
						<div class="policies-group-rail"><Rail /></div>
						<h2 class="policies-group-heading">{item.groupHeading}</h2>
					</div>
				{/if}
				<section class="policies-section" class:policies-section--full={!media} id={item.id}>
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

					{#if media}
						<div class="policies-media">
							<!-- Vertical (9:16) message video of Peter on this priority. -->
							<div class="policy-video-frame">
								<div class="policy-video-rail"><Rail /></div>
								<!-- svelte-ignore a11y-media-has-caption -->
								<video
									class="policy-video-player"
									controls
									playsinline
									preload="none"
									poster={media.poster}
									aria-label={$messages.policies[media.labelKey]}
								>
									<source src={media.src} type="video/mp4" />
								</video>
							</div>
						</div>
					{/if}
				</section>
			{/each}

			<section class="policies-ask" aria-labelledby="policies-ask-heading">
				<div class="policies-ask-rail"><Rail /></div>
				<h2 id="policies-ask-heading" class="policies-ask-title">
					{$messages.policies.ctaTitle}
				</h2>
				<p class="policies-ask-text">{$messages.policies.ctaText}</p>
				<Button href="/contact#contact-form" variant="primary">{$messages.policies.ctaButton}</Button>
			</section>

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

	/* Light intro — matches the white page treatment used site-wide. */
	.policies-hero {
		background: var(--paper);
		color: var(--ink);
		padding-block: clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 3.5vw, 2.25rem);
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
		color: var(--blue);
	}

	.policies-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.policies-title {
		font-family: var(--display);
		font-style: italic;
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.035em;
		color: var(--ink);
		margin: 0 0 0.75rem 0;
		line-height: 1.02;
	}

	.policies-lede {
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.25rem;
		line-height: 1.55;
		color: var(--ink-2);
		margin: 0;
	}

	/* Sticky "On this page" wayfinding bar — sticks just below the site nav. */
	.policies-jump {
		position: sticky;
		top: var(--policies-nav-top, 4rem);
		z-index: 50;
		background: var(--blue);
		border-bottom: 1px solid rgba(9, 27, 54, 0.2);
	}

	/* Edge fades signal that the jump list scrolls sideways. They're toggled by
	   JS (has-left-fade / has-right-fade) only when content actually overflows,
	   so they never appear on a list that fits. Sticky establishes the
	   containing block, so these pin to the bar's edges, not the scrolled content. */
	.policies-jump::before,
	.policies-jump::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2.75rem;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.18s ease;
		z-index: 1;
	}

	.policies-jump::before {
		left: 0;
		background: linear-gradient(90deg, var(--blue), rgba(46, 95, 160, 0));
	}

	.policies-jump::after {
		right: 0;
		background: linear-gradient(270deg, var(--blue), rgba(46, 95, 160, 0));
	}

	.policies-jump.has-left-fade::before,
	.policies-jump.has-right-fade::after {
		opacity: 1;
	}

	.policies-jump-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0.55rem 1.5rem;
		display: flex;
		align-items: center;
		/* ~26px between the "On this page" label and the jump links (16px + ~10px). */
		gap: 1.625rem;
		min-width: 0;
		/* Always a single sticky line that scrolls sideways — never wrap to two lines.
		   Edge fades + scroll-active-into-view (JS) make the overflow discoverable. */
		overflow-x: auto;
		scrollbar-width: none;
	}

	.policies-jump-inner::-webkit-scrollbar {
		display: none;
	}

	.policies-jump-label {
		flex-shrink: 0;
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.85);
	}

	.policies-jump-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		flex-shrink: 0;
		gap: 1.5rem;
		min-width: 0;
	}

	/* Trailing spacer so the last link keeps breathing room at scroll-end (a flex
	   scroll container drops trailing padding from the scroll extent). */
	.policies-jump-list::after {
		content: '';
		flex: 0 0 1.5rem;
	}

	.policies-jump-list li {
		margin: 0;
	}

	/* Visual break in the jump bar between the pillars and "Other Policy Positions". */
	.policies-jump-sep {
		width: 1px;
		align-self: stretch;
		min-height: 1rem;
		background: var(--line-d);
	}

	.policies-jump-link {
		display: inline-block;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.82);
		text-decoration: none;
		padding: 0.25rem 0;
		border-bottom: 2px solid transparent;
		white-space: nowrap;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.policies-jump-link:hover {
		color: var(--paper);
	}

	.policies-jump-link.is-active {
		color: var(--paper);
		border-bottom-color: var(--paper);
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

	/* Divider between the priority pillars and the "Other Policy Positions" group. */
	.policies-group {
		margin: 1rem 0 2.5rem;
	}

	.policies-group-rail {
		max-width: 120px;
		margin-bottom: 0.9rem;
	}

	.policies-group-heading {
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--blue);
		margin: 0;
	}

	.policies-section {
		display: grid;
		grid-template-columns: 1fr minmax(280px, 360px);
		gap: 2.5rem 3rem;
		align-items: start;
		padding-bottom: 3rem;
		margin-bottom: 3rem;
		border-bottom: 1px solid var(--line-l);
		scroll-margin-top: var(--policies-anchor, 6rem);
	}

	/* Sections without a video (intro + "Other Policy Positions") span the full width. */
	.policies-section--full {
		grid-template-columns: 1fr;
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
		font-family: var(--serif);
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

	.policies-media {
		min-width: 0;
	}

	/* Rail stripe pinned to the top of the video frame. */
	.policy-video-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	/* Vertical (9:16) message video frame. */
	.policy-video-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 9 / 16;
		overflow: hidden;
		background: var(--ink-deep);
		border: 1px solid var(--line-d);
	}

	.policy-video-player {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* "Have a question?" prompt — routes to the Contact page (General form). */
	.policies-ask {
		position: relative;
		margin-top: 3.5rem;
		padding: 2.75rem 1.5rem 2.85rem;
		background: var(--paper-2);
		border: 1px solid var(--line-l);
		text-align: center;
	}

	.policies-ask-rail {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.policies-ask-title {
		margin: 0.35rem 0 0.65rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.4rem, 3.5vw, 1.9rem);
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: var(--ink);
	}

	.policies-ask-text {
		max-width: 48ch;
		margin: 0 auto 1.6rem;
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.55;
		color: var(--ink-2);
	}

	.policies-cta {
		margin-top: 1.75rem;
		padding-top: 2rem;
		border-top: 1px solid var(--line-l);
		text-align: center;
	}

	@media (max-width: 768px) {
		/* Bleed the rail + blue band out past the layout's mobile gutter so they
		   span the full screen like the site nav above (instead of floating inset). */
		.policies-rail,
		.policies-jump {
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
		}

		/* Keep the jump bar a single sticky line that scrolls sideways. The inner
		   padding-left re-adds the gutter (mobile margin + base inset) so the first
		   link aligns with the page's body text. The trailing gutter lives on the
		   last item instead (see below), so padding-right is dropped here. */
		/* Single-line scroll behavior now lives in the base styles; mobile only
		   re-adds the full-bleed gutter, hides the label, and tightens the gap. */
		.policies-jump-inner {
			padding-left: calc(var(--mobile-margin) + 1.5rem);
			padding-right: 0;
		}

		.policies-jump-label {
			display: none;
		}

		.policies-jump-list {
			gap: 1.25rem;
		}

		.policies-section {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		/* Stacked: keep the tall 9:16 video from dominating the column. */
		.policy-video-frame {
			max-width: 320px;
			margin-inline: auto;
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
