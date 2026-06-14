<script>
	import { messages } from '$lib/i18n/locale';
	import { peopleEndorsements, orgEndorsements } from '$lib/data/endorsements';
	import EndorsementCard from '$lib/components/EndorsementCard.svelte';
</script>

<svelte:head>
	<title>{$messages.endorsementsPage.metaTitle}</title>
	<meta name="description" content={$messages.endorsementsPage.metaDescription} />
</svelte:head>

<main class="endorse-page">
	<div class="endorse-inner">
		<div class="endorse-head">
			<p class="endorse-eyebrow">{$messages.endorsementsPage.eyebrow}</p>
			<h1 class="endorse-title">{$messages.endorsementsPage.pageTitle}</h1>
			<p class="endorse-lede">{$messages.endorsementsPage.lede}</p>
		</div>

		{#if peopleEndorsements.length}
			<section class="endorse-section">
				<h2 class="endorse-section-title">{$messages.endorsementsPage.peopleHeading}</h2>
				<ul class="endorse-grid">
					{#each peopleEndorsements as item (item.id)}
						<li><EndorsementCard {item} /></li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if orgEndorsements.length}
			<section class="endorse-section">
				<h2 class="endorse-section-title">{$messages.endorsementsPage.orgHeading}</h2>
				<ul class="endorse-grid">
					{#each orgEndorsements as item (item.id)}
						<li><EndorsementCard {item} /></li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
</main>

<style>
	.endorse-page {
		background: var(--paper);
		color: var(--ink);
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.endorse-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.endorse-head {
		margin-bottom: 2.5rem;
	}

	.endorse-eyebrow {
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

	.endorse-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.endorse-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(2rem, 5vw, 3rem);
		letter-spacing: -0.035em;
		line-height: 1.02;
		color: var(--ink);
	}

	.endorse-lede {
		margin: 0.65rem 0 0;
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.125rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.endorse-section {
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}

	.endorse-section:first-of-type {
		margin-top: 0;
	}

	.endorse-section-title {
		margin: 0 0 1.5rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid var(--line-l);
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.25rem, 3vw, 1.625rem);
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: var(--ink);
	}

	.endorse-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: clamp(1.5rem, 3vw, 2.5rem);
	}

	@media (max-width: 768px) {
		.endorse-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
