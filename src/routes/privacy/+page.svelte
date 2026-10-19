<script>
	/**
	 * Privacy policy. Copy lives in `$messages.privacy` (en + es); this file only renders
	 * it. While `PRIVACY_DRAFT` is set the page is `noindex` — which also keeps it out of
	 * the sitemap, since that reads the robots meta — and shows the open questions the
	 * campaign still has to answer. See `src/lib/data/privacy.ts`.
	 */
	import { messages } from '$lib/i18n/locale';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Emphasis from '$lib/components/Emphasis.svelte';
	import Rail from '$lib/components/Rail.svelte';
	import { PRIVACY_DRAFT, PRIVACY_OPEN_QUESTIONS } from '$lib/data/privacy';
</script>

<!-- `<svelte:head>` has to sit at the top level, so the draft check goes inside it rather
     than around it; `PageMeta` (canonical, og tags) is what the published page gets. -->
<svelte:head>
	{#if PRIVACY_DRAFT}
		<title>{$messages.privacy.metaTitle}</title>
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

{#if !PRIVACY_DRAFT}
	<PageMeta title={$messages.privacy.metaTitle} description={$messages.privacy.metaDescription} />
{/if}

<main class="privacy-page">
	<header class="privacy-head">
		<p class="privacy-eyebrow">{$messages.privacy.eyebrow}</p>
		<h1 class="privacy-title">{$messages.privacy.title}</h1>
		<p class="privacy-lede">{$messages.privacy.lede}</p>
		<p class="privacy-updated">
			{$messages.privacy.updatedLabel}: <time datetime="2026-10-18">{$messages.privacy.updated}</time>
		</p>
	</header>

	<Rail />

	{#if PRIVACY_DRAFT}
		<!-- Deliberately in English only: it is a note to the campaign and the next
		     developer, not site copy, and it never ships to a published page. -->
		<aside class="privacy-draft" aria-labelledby="privacy-draft-title">
			<p class="privacy-draft-title" id="privacy-draft-title">
				{$messages.privacy.draftNoticeTitle}
			</p>
			<p class="privacy-draft-body">{$messages.privacy.draftNoticeBody}</p>
			<ol class="privacy-draft-list">
				{#each PRIVACY_OPEN_QUESTIONS as question}
					<li>{question}</li>
				{/each}
			</ol>
		</aside>
	{/if}

	<div class="privacy-body">
		{#each $messages.privacy.sections as section}
			<section class="privacy-section" aria-labelledby={`privacy-${section.id}`}>
				<h2 class="privacy-section-title" id={`privacy-${section.id}`}>{section.title}</h2>
				{#each section.blocks as block}
					{#if block.type === 'p'}
						<p class="privacy-p"><Emphasis text={block.text} /></p>
					{:else if block.type === 'ul'}
						<ul class="privacy-ul">
							{#each block.items as item}
								<li><Emphasis text={item} /></li>
							{/each}
						</ul>
					{:else if block.type === 'links'}
						<p class="privacy-links-label">{block.label}</p>
						<ul class="privacy-links">
							{#each block.items as link}
								<li>
									<a href={link.href} target="_blank" rel="noopener noreferrer"
										>{link.label} <span aria-hidden="true">↗</span></a
									>
								</li>
							{/each}
						</ul>
					{/if}
				{/each}
			</section>
		{/each}
	</div>
</main>

<style>
	.privacy-page {
		max-width: 760px;
		margin: 0 auto;
		padding: clamp(2.5rem, 6vw, 4rem) 1.5rem clamp(3rem, 7vw, 5rem);
	}

	.privacy-eyebrow {
		margin: 0 0 0.4rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.privacy-title {
		margin: 0 0 0.9rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(2rem, 5vw, 3rem);
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: var(--ink-deep);
	}

	.privacy-lede {
		margin: 0 0 1rem;
		font-family: var(--serif);
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--ink-2);
		/* Intro ledes opt out of the mobile body-justify (see +layout.svelte). */
		text-align: inherit;
	}

	.privacy-updated {
		margin: 0 0 1.75rem;
		font-family: var(--mono);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	/* Draft notice — intentionally loud, and gone the moment PRIVACY_DRAFT flips. */
	.privacy-draft {
		margin: 2rem 0 0;
		padding: 1.1rem 1.25rem;
		border: 1px solid var(--line-l);
		border-left: 4px solid var(--green);
		background: var(--paper-2);
	}

	.privacy-draft-title {
		margin: 0 0 0.4rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.05rem;
		color: var(--ink-deep);
	}

	.privacy-draft-body,
	.privacy-draft-list {
		font-family: var(--font-primary);
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--ink-2);
	}

	.privacy-draft-body {
		margin: 0 0 0.7rem;
	}

	.privacy-draft-list {
		margin: 0;
		padding-left: 1.2rem;
	}

	.privacy-draft-list li + li {
		margin-top: 0.45rem;
	}

	.privacy-body {
		margin-top: 2.25rem;
	}

	.privacy-section + .privacy-section {
		margin-top: 2.25rem;
	}

	.privacy-section-title {
		margin: 0 0 0.75rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.35rem;
		letter-spacing: -0.01em;
		color: var(--ink-deep);
	}

	.privacy-p,
	.privacy-ul {
		font-family: var(--font-primary);
		font-size: 1rem;
		line-height: 1.65;
		color: var(--ink-2);
	}

	.privacy-p {
		margin: 0 0 0.9rem;
	}

	.privacy-ul {
		margin: 0 0 0.9rem;
		padding-left: 1.25rem;
	}

	.privacy-ul li + li {
		margin-top: 0.5rem;
	}

	.privacy-links-label {
		margin: 0 0 0.4rem;
		font-family: var(--mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.privacy-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.privacy-links a {
		font-family: var(--font-primary);
		font-size: 0.9rem;
		color: var(--blue);
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}

	.privacy-links a:hover,
	.privacy-links a:focus-visible {
		border-bottom-color: currentColor;
	}
</style>
