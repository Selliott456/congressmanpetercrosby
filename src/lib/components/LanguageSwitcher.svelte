<script>
	import { locale, setLocale, messages } from '$lib/i18n/locale';

	let open = false;
	/** @type {HTMLElement | undefined} */
	let root;
	/** @type {HTMLButtonElement | undefined} */
	let trigger;

	// Languages shown in their own name (autonyms), no country flags.
	$: options = [
		{ code: /** @type {'en'} */ ('en'), label: $messages.language.english },
		{ code: /** @type {'es'} */ ('es'), label: $messages.language.spanish }
	];
	$: current = options.find((o) => o.code === $locale) ?? options[0];

	function toggle() {
		open = !open;
	}

	/** @param {'en' | 'es'} code */
	function choose(code) {
		setLocale(code);
		open = false;
		trigger?.focus();
	}

	/** @param {MouseEvent} event */
	function handleWindowClick(event) {
		if (open && root && !root.contains(/** @type {Node} */ (event.target))) open = false;
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Escape' && open) {
			open = false;
			trigger?.focus();
		}
	}
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleKeydown} />

<div class="lang" class:open bind:this={root}>
	<button
		type="button"
		class="lang-trigger"
		aria-haspopup="menu"
		aria-expanded={open}
		aria-label={$messages.language.switch}
		bind:this={trigger}
		on:click={toggle}
	>
		<span class="lang-globe" aria-hidden="true">&#127760;</span>
		<span class="lang-current">{current.label}</span>
		<span class="lang-caret" aria-hidden="true">&#9662;</span>
	</button>

	{#if open}
		<ul class="lang-menu" role="menu" aria-label={$messages.language.switch}>
			{#each options as opt}
				<li role="none">
					<button
						type="button"
						role="menuitem"
						class="lang-option"
						class:active={opt.code === $locale}
						aria-current={opt.code === $locale ? 'true' : undefined}
						on:click={() => choose(opt.code)}
					>
						{opt.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.lang {
		position: relative;
		flex-shrink: 0;
	}

	.lang-trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.28rem 0.5rem;
		background: transparent;
		border: 1px solid var(--line-d);
		border-radius: 0;
		cursor: pointer;
		color: rgba(247, 250, 252, 0.85);
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		white-space: nowrap;
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;
	}

	.lang-trigger:hover,
	.lang-trigger:focus-visible {
		border-color: var(--sky);
		color: var(--paper);
		background: rgba(255, 255, 255, 0.06);
	}

	.lang-globe {
		font-size: 0.85rem;
		line-height: 1;
	}

	.lang-caret {
		font-size: 0.6rem;
		line-height: 1;
		transition: transform 0.2s ease;
	}

	.lang.open .lang-caret {
		transform: rotate(180deg);
	}

	.lang-menu {
		position: absolute;
		top: calc(100% + 4px);
		right: 0;
		z-index: 200;
		min-width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		background: var(--ink-deep);
		border: 1px solid var(--line-d);
	}

	.lang-option {
		display: block;
		width: 100%;
		padding: 0.45rem 0.7rem;
		text-align: left;
		background: transparent;
		border: 0;
		cursor: pointer;
		color: rgba(247, 250, 252, 0.8);
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		white-space: nowrap;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.lang-option:hover,
	.lang-option:focus-visible {
		background: rgba(255, 255, 255, 0.08);
		color: var(--paper);
	}

	.lang-option.active {
		color: var(--sky);
	}
</style>
