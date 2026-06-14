<script>
	import MediaCard from './MediaCard.svelte';
	import VideoLightbox from './VideoLightbox.svelte';

	/** @type {import('$lib/data/media').MediaItem[]} */
	export let items;

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
			<MediaCard {item} on:play={onPlay} />
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
