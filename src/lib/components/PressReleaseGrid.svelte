<script>
	import PressReleaseCard from './PressReleaseCard.svelte';

	/** @type {import('$lib/data/pressReleases').PressRelease[]} */
	export let items;
	/** Card surface passed through to each card. @type {'dark' | 'light'} */
	export let variant = 'dark';
</script>

<ul class="pr-grid">
	{#each items as item (item.id)}
		<li class="pr-grid-cell">
			<PressReleaseCard {item} {variant} />
		</li>
	{/each}
</ul>

<style>
	.pr-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.pr-grid-cell {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 900px) {
		.pr-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 560px) {
		.pr-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
