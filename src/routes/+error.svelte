<script>
	import { page } from '$app/stores';
	import { messages } from '$lib/i18n/locale';
	import Button from '$lib/components/Button.svelte';
	import Rail from '$lib/components/Rail.svelte';

	// Pick the copy block for the current HTTP status: 404, any 5xx, else generic.
	$: status = $page.status;
	$: content =
		status === 404
			? $messages.errorPage.notFound
			: status >= 500
				? $messages.errorPage.serverError
				: $messages.errorPage.generic;
</script>

<svelte:head>
	<title>{status} · {content.title} — Peter Crosby for Congress</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="error-page">
	<div class="error-inner">
		<p class="eyebrow">{content.eyebrow}</p>
		<p class="status" aria-hidden="true">{status}</p>
		<Rail height="6px" />
		<h1 class="title">{content.title}</h1>
		<p class="lede">{content.lede}</p>

		<nav class="actions" aria-label={$messages.errorPage.helpLead}>
			<Button href="/" variant="secondary">{$messages.errorPage.homeCta}</Button>
			<Button href="/events" variant="accent">{$messages.errorPage.eventsCta}</Button>
			<Button href="/contact" variant="accent">{$messages.errorPage.contactCta}</Button>
		</nav>
	</div>
</main>

<style>
	.error-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 62vh;
		padding: clamp(3rem, 8vw, 6rem) 1.5rem;
		background: var(--paper);
		color: var(--ink-deep);
	}

	.error-inner {
		width: 100%;
		max-width: 760px;
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--blue);
	}

	.status {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		line-height: 0.9;
		font-size: clamp(5rem, 21vw, 10.5rem);
		letter-spacing: -0.02em;
		color: var(--ink-deep);
	}

	/* Short centered ridge-line accent under the status number. */
	.error-inner :global(.rail) {
		width: 132px;
		margin: 1.25rem auto 1.75rem;
	}

	.title {
		margin: 0 0 1rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.5rem, 4.5vw, 2.25rem);
		line-height: 1.1;
		color: var(--ink);
	}

	.lede {
		margin: 0 auto 2.25rem;
		max-width: 46ch;
		font-family: var(--serif);
		font-size: 1.125rem;
		line-height: 1.6;
		color: rgba(9, 27, 54, 0.78);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		justify-content: center;
	}

	/* Let the shared Button size to its label here (it's fixed-width by default)
	   so the three CTAs sit on one tidy row instead of wrapping. */
	.actions :global(.btn) {
		width: auto;
	}
</style>
