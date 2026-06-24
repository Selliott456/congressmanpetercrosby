<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { messages } from '$lib/i18n/locale';

	/** @type {string} */
	export let youtubeId;
	/** @type {string} */
	export let title;

	const dispatch = createEventDispatcher();
	/** @type {HTMLButtonElement | undefined} */
	let closeBtn;
	/** @type {string} */
	let prevOverflow = '';

	function close() {
		dispatch('close');
	}

	/** @param {KeyboardEvent} event */
	function onKeydown(event) {
		if (event.key === 'Escape') close();
	}

	onMount(() => {
		prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeBtn?.focus();
	});

	onDestroy(() => {
		document.body.style.overflow = prevOverflow;
	});
</script>

<svelte:window on:keydown={onKeydown} />

<div class="lb-root" role="dialog" aria-modal="true" aria-label={title}>
	<button class="lb-backdrop" type="button" aria-label={$messages.media.closeVideo} on:click={close}
	></button>
	<div class="lb-dialog">
		<button
			class="lb-close"
			type="button"
			bind:this={closeBtn}
			on:click={close}
			aria-label={$messages.media.closeVideo}
		>
			&times;
		</button>
		<div class="lb-frame">
			<iframe
				src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
				{title}
				allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
				allowfullscreen
			></iframe>
		</div>
	</div>
</div>

<style>
	.lb-root {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		place-items: center;
		padding: 1.5rem;
	}

	.lb-backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		background: rgba(9, 27, 54, 0.85);
		cursor: pointer;
	}

	.lb-dialog {
		position: relative;
		width: min(960px, 100%);
	}

	.lb-close {
		position: absolute;
		top: -2.6rem;
		right: 0;
		width: 2.2rem;
		height: 2.2rem;
		display: grid;
		place-items: center;
		background: transparent;
		border: 1px solid var(--line-d);
		color: var(--paper);
		font-size: 1.4rem;
		line-height: 1;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.lb-close:hover,
	.lb-close:focus-visible {
		background: rgba(255, 255, 255, 0.1);
		border-color: var(--sky);
	}

	.lb-frame {
		position: relative;
		aspect-ratio: 16 / 9;
		background: #000;
		border: 1px solid var(--line-d);
	}

	.lb-frame iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
