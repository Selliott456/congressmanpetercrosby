<script>
	import { locale, messages } from '$lib/i18n/locale';
	import Rail from '$lib/components/Rail.svelte';
	import Button from '$lib/components/Button.svelte';
	import PressBarChart from '$lib/components/PressBarChart.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * Split paragraph text into plain-text and link segments, parsing inline
	 * `[label](url)` markup so citations can render as real links.
	 * @param {string} text
	 * @returns {{ text: string; href?: string }[]}
	 */
	function inlineSegments(text) {
		/** @type {{ text: string; href?: string }[]} */
		const segs = [];
		const re = /\[([^\]]+)\]\(([^)]+)\)/g;
		let last = 0;
		/** @type {RegExpExecArray | null} */
		let m;
		while ((m = re.exec(text))) {
			if (m.index > last) segs.push({ text: text.slice(last, m.index) });
			segs.push({ text: m[1], href: m[2] });
			last = m.index + m[0].length;
		}
		if (last < text.length) segs.push({ text: text.slice(last) });
		return segs;
	}

	$: release = data.release;
	$: override = $messages.pressReleases.byId[release.id];
	$: title = override?.title ?? release.title;
	$: summary = override?.summary ?? release.summary;
	$: body = override?.body ?? release.body;
	// Locale-specific original wins (es override), else the English source file, if any.
	$: attachment = override?.attachment ?? release.attachment;
	// Format suffix for the download label, e.g. "PDF" / "JPG", from the extension.
	$: attachmentFormat = attachment ? (attachment.split('.').pop() ?? '').toUpperCase() : '';

	/**
	 * Format an ISO date (YYYY-MM-DD) as a full dateline, e.g. "January 5, 2026".
	 * @param {string} iso
	 * @param {import('$lib/i18n/dictionaries').Locale} loc
	 */
	function formatDate(iso, loc) {
		const [y, m, d] = iso.split('-').map(Number);
		return new Date(y, m - 1, d).toLocaleDateString(loc === 'es' ? 'es-US' : 'en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	$: dateline = formatDate(release.date, $locale);

	// Issuing-organization strings, translatable via the `es` byId override.
	$: sourceName = override?.sourceName ?? release.source?.name ?? '';
	$: sourceLogoAlt = override?.sourceLogoAlt ?? release.source?.logoAlt ?? sourceName;
</script>

<svelte:head>
	<title>{title} — {$messages.pressReleases.metaTitle}</title>
	<meta name="description" content={summary} />
</svelte:head>

<main class="press-page">
	<!-- Outside the article so the stripe spans the viewport, matching the band under
	     the site nav. Inside `.press-article` it was pinned to that element's 760px
	     content box and read as an underline of the column. -->
	<div class="press-rail"><Rail /></div>

	<article class="press-article">
		<a href="/media#press" class="press-back">&larr; {$messages.pressReleases.backToMedia}</a>

		{#if release.source}
			<!-- Issued by another organization: name the source above the headline so the
			     release is never mistaken for campaign-authored copy. -->
			<div class="press-source">
				{#if release.source.logo}
					<img
						class="press-source-logo"
						src={release.source.logo}
						alt={sourceLogoAlt}
						width="48"
						height="48"
						loading="lazy"
					/>
				{/if}
				<div class="press-source-text">
					<p class="press-source-label">{$messages.pressReleases.issuedBy}</p>
					<p class="press-source-name">
						{#if release.source.url}
							<a href={release.source.url} target="_blank" rel="noopener noreferrer">{sourceName}</a>
						{:else}{sourceName}{/if}
					</p>
				</div>
			</div>
		{:else}
			<p class="press-eyebrow">{$messages.pressReleases.forImmediateRelease}</p>
		{/if}
		<h1 class="press-title">{title}</h1>

		<p class="press-dateline">
			{#if release.location}<span class="press-location">{release.location}</span> — {/if}{dateline}
		</p>

		<p class="press-summary">{summary}</p>

		<div class="press-body">
			{#each body as part}
				{#if part.type === 'p'}
					<p>{#each inlineSegments(part.text) as seg}{#if seg.href}<a
								href={seg.href}
								class="press-link"
								target="_blank"
								rel="noopener noreferrer">{seg.text}</a>{:else}{seg.text}{/if}{/each}</p>
				{:else if part.type === 'chart'}
					<PressBarChart
						chartTitle={part.chartTitle}
						yMax={part.yMax}
						yStep={part.yStep}
						bars={part.bars}
						note={part.note}
						source={part.source}
					/>
				{:else if part.type === 'ul'}
					<ul>
						{#each part.items as li}
							<li>{li}</li>
						{/each}
					</ul>
				{:else if part.type === 'quote'}
					<blockquote class="press-quote">
						<p>{part.text}</p>
						{#if part.attribution}
							<cite class="press-quote-cite">{part.attribution}</cite>
						{/if}
					</blockquote>
				{/if}
			{/each}
		</div>

		{#if release.source}
			<p class="press-reproduced">{$messages.pressReleases.reproducedNote}</p>
		{/if}

		{#if attachment}
			<p class="press-download">
				<a href={attachment} download target="_blank" rel="noopener noreferrer">
					↓ {$messages.pressReleases.downloadOriginal}{attachmentFormat ? ` (${attachmentFormat})` : ''}
				</a>
			</p>
		{/if}

		{#if release.contactEmail}
			<div class="press-contact">
				<span class="press-contact-label">{$messages.pressReleases.pressContact}</span>
				<a href={`mailto:${release.contactEmail}`}>{release.contactEmail}</a>
			</div>
		{/if}

		<div class="press-cta">
			<Button href="https://secure.actblue.com/donate/peter-crosby-1">{$messages.common.donate}</Button>
		</div>
	</article>
</main>

<style>
	.press-page {
		background: var(--paper);
	}

	.press-article {
		position: relative;
		max-width: 760px;
		margin: 0 auto;
		padding: clamp(2.5rem, 6vw, 4rem) 1.5rem 4rem;
	}

	/* Full-bleed band. `line-height: 0` keeps the inline box from adding a hairline
	   of extra height under the stripe. */
	.press-rail {
		line-height: 0;
	}

	.press-back {
		display: inline-block;
		margin: 1rem 0 2rem;
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--blue);
		text-decoration: none;
	}

	.press-back:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.press-eyebrow {
		margin: 0 0 0.75rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--blue);
	}

	/* ── External release attribution ──────────────────────────────
	   Sits where the "For immediate release" eyebrow normally goes. Boxed and
	   marked with the issuer's logo so the byline is unmissable — the body below
	   is another organization's words, not the campaign's. */
	.press-source {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin: 0 0 1.25rem;
		padding: 0.85rem 1rem;
		border: 1px solid var(--line-l);
		border-left: 3px solid var(--blue);
		background: var(--paper);
	}

	.press-source-logo {
		flex: 0 0 auto;
		width: 48px;
		height: 48px;
		object-fit: contain;
	}

	.press-source-text {
		min-width: 0;
	}

	.press-source-label {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.65rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.press-source-name {
		margin: 0.15rem 0 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: 1.05rem;
		line-height: 1.2;
		color: var(--ink);
	}

	.press-source-name a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.press-reproduced {
		margin: 2rem 0 0;
		padding-top: 1rem;
		border-top: 1px solid var(--line-l);
		font-family: var(--sans);
		font-size: 0.85rem;
		font-style: italic;
		color: var(--ink-2);
	}

	.press-title {
		margin: 0 0 1rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.85rem, 4.5vw, 2.75rem);
		letter-spacing: -0.035em;
		line-height: 1.03;
		color: var(--ink);
	}

	.press-dateline {
		margin: 0 0 1.5rem;
		font-family: var(--mono);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.press-location {
		font-weight: 600;
		color: var(--ink);
	}

	.press-summary {
		margin: 0 0 2rem;
		font-family: var(--serif);
		font-size: clamp(1.125rem, 2.2vw, 1.3125rem);
		line-height: 1.5;
		color: var(--ink);
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--line-l);
	}

	.press-body {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.8;
		color: var(--ink-2);
	}

	.press-body p {
		margin: 0 0 1.15rem;
	}

	.press-body ul {
		margin: 0 0 1.15rem;
		padding-left: 1.5rem;
	}

	.press-body li {
		margin-bottom: 0.4rem;
	}

	.press-link {
		color: var(--blue);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.press-link:hover {
		color: var(--ink);
	}

	/* Pull quote — Source Serif italic per the brand, with a civic-blue rule. */
	.press-quote {
		margin: 1.75rem 0;
		padding: 0.25rem 0 0.25rem 1.5rem;
		border-left: 3px solid var(--blue);
	}

	.press-quote p {
		margin: 0;
		font-family: var(--serif);
		font-style: italic;
		font-size: clamp(1.125rem, 2.2vw, 1.3125rem);
		line-height: 1.5;
		color: var(--ink);
	}

	.press-quote-cite {
		display: block;
		margin-top: 0.75rem;
		font-family: var(--mono);
		font-style: normal;
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.press-download {
		margin: 2.5rem 0 0;
	}

	.press-download a {
		display: inline-block;
		padding: 0.7rem 1.4rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--blue);
		text-decoration: none;
		border: 1px solid var(--blue);
		transition:
			background 0.18s ease,
			color 0.18s ease;
	}

	.press-download a:hover {
		background: var(--blue);
		color: var(--paper);
	}

	/* When a download link is present, the contact block continues below it. */
	.press-download + .press-contact {
		margin-top: 2rem;
	}

	.press-contact {
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line-l);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.press-contact-label {
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.press-contact a {
		font-family: var(--sans);
		font-size: 1rem;
		color: var(--blue);
		text-decoration: none;
	}

	.press-contact a:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.press-cta {
		margin-top: 2.5rem;
		padding-top: 2rem;
		border-top: 1px solid var(--line-l);
		text-align: center;
	}

	@media (max-width: 768px) {
		/* `.layout-main` already supplies the page gutter on mobile. The article's own
		   1.5rem was stacking on top of it, costing ~23% of a 375px screen and
		   squeezing the body copy. */
		.press-article {
			padding-left: 0;
			padding-right: 0;
		}

		/* Pull the stripe back out through that gutter so it reaches both edges.
		   `.layout-main` uses `overflow-x: clip` on mobile, so this cannot scroll. */
		.press-rail {
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
		}
	}
</style>
