<script>
	import { locale, messages } from '$lib/i18n/locale';
	import Rail from '$lib/components/Rail.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

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
</script>

<svelte:head>
	<title>{title} — {$messages.pressReleases.metaTitle}</title>
	<meta name="description" content={summary} />
</svelte:head>

<main class="press-page">
	<article class="press-article">
		<div class="press-rail"><Rail /></div>

		<a href="/media#press" class="press-back">&larr; {$messages.pressReleases.backToMedia}</a>

		<p class="press-eyebrow">{$messages.pressReleases.forImmediateRelease}</p>
		<h1 class="press-title">{title}</h1>

		<p class="press-dateline">
			{#if release.location}<span class="press-location">{release.location}</span> — {/if}{dateline}
		</p>

		<p class="press-summary">{summary}</p>

		<div class="press-body">
			{#each body as part}
				{#if part.type === 'p'}
					<p>{part.text}</p>
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

	.press-rail {
		position: absolute;
		top: 0;
		left: 1.5rem;
		right: 1.5rem;
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
</style>
