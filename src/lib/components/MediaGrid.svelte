<script>
	import MediaCard from './MediaCard.svelte';
	import VideoLightbox from './VideoLightbox.svelte';

	/** @type {import('$lib/data/media').MediaItem[]} */
	export let items;
	/** Card surface passed through to each MediaCard. @type {'dark' | 'light'} */
	export let variant = 'dark';
	/** Card title heading level — 2 when the grid sits directly under the page's h1. @type {2 | 3} */
	export let headingLevel = 3;

	/** @type {import('$lib/data/media').MediaItem | null} */
	let active = null;

	/** @param {CustomEvent<import('$lib/data/media').MediaItem>} event */
	function onPlay(event) {
		active = event.detail;
	}

	function onClose() {
		active = null;
	}
</script>

<ul class="media-grid">
	{#each items as item (item.id)}
		<li class="media-grid-cell">
			<MediaCard {item} {variant} {headingLevel} on:play={onPlay} />
		</li>
	{/each}
</ul>

{#if active && active.youtubeId}
	<VideoLightbox youtubeId={active.youtubeId} title={active.title} on:close={onClose} />
{/if}

<style>
	.media-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.media-grid-cell {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 900px) {
		.media-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 560px) {
		.media-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
