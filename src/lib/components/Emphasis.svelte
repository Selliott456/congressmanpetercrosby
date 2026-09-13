<script>
	import { emphasisRuns } from '$lib/utils/emphasis';

	/** Copy that may contain `**bold**` runs. @type {string} */
	export let text;
</script>

<!-- One line on purpose: whitespace between the blocks would render as stray spaces around the bold text. -->
{#each emphasisRuns(text) as run}{#if run.em}<strong>{run.text}</strong>{:else}{run.text}{/if}{/each}

<style>
	strong {
		font-weight: 700;
		color: var(--ink);
	}
</style>
