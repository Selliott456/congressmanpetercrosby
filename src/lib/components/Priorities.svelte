<script>
	import { messages } from '$lib/i18n/locale';
	import Rail from './Rail.svelte';

	let selected = 0;
	/** @type {HTMLButtonElement[]} */
	let headerEls = [];

	$: priorities = $messages.home.priorities;

	/** @param {number} i */
	function num(i) {
		return String(i + 1).padStart(2, '0');
	}

	/**
	 * Arrow-key navigation across the priority headers (tabs pattern).
	 * @param {KeyboardEvent} event
	 * @param {number} i
	 */
	function onHeaderKeydown(event, i) {
		const n = priorities.length;
		let target = -1;
		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				target = (i + 1) % n;
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				target = (i - 1 + n) % n;
				break;
			case 'Home':
				target = 0;
				break;
			case 'End':
				target = n - 1;
				break;
			default:
				return;
		}
		event.preventDefault();
		selected = target;
		headerEls[target]?.focus();
	}
</script>

<section class="priorities" aria-labelledby="priorities-heading">
	<div class="pri-inner">
		<p class="pri-eyebrow">{$messages.home.prioritiesEyebrow}</p>
		<h2 id="priorities-heading" class="pri-title">{$messages.home.prioritiesTitle}</h2>
		<p class="pri-lede">{$messages.home.prioritiesLede}</p>

		<div class="pri-list">
			{#each priorities as p, i (i)}
				<button
					type="button"
					class="pri-header"
					class:active={selected === i}
					id={`pri-tab-${i}`}
					aria-expanded={selected === i}
					aria-controls={`pri-panel-${i}`}
					bind:this={headerEls[i]}
					on:click={() => (selected = i)}
					on:keydown={(e) => onHeaderKeydown(e, i)}
				>
					<span class="pri-num" aria-hidden="true">{num(i)}</span>
					<span class="pri-name">{p.title}</span>
					<span class="pri-caret" aria-hidden="true">&#9662;</span>
				</button>
				<div
					class="pri-panel"
					id={`pri-panel-${i}`}
					role="region"
					aria-labelledby={`pri-tab-${i}`}
					hidden={selected !== i}
				>
					<Rail />
					<div class="pri-panel-body">
						<p class="pri-summary">{p.summary}</p>
						<ul class="pri-points">
							{#each p.points as point}
								<li>{point}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>

		<a href="/faq" class="pri-link">{$messages.home.prioritiesLink}</a>
	</div>
</section>

<style>
	.priorities {
		background: var(--paper);
		padding-block: clamp(3rem, 7vw, 5rem);
	}

	.pri-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.pri-eyebrow {
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

	.pri-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.pri-title {
		margin: 0 0 0.65rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.6rem, 3.4vw, 2.25rem);
		letter-spacing: -0.03em;
		line-height: 1.04;
		color: var(--ink);
	}

	.pri-lede {
		margin: 0 0 2rem;
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	/* ── Mobile: accordion ──────────────────────────────────── */
	.pri-header {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		width: 100%;
		text-align: left;
		background: transparent;
		border: 0;
		border-top: 1px solid var(--line-l);
		padding: 1.05rem 0.25rem;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.pri-header:hover {
		background: var(--paper-2);
	}

	.pri-num {
		flex-shrink: 0;
		font-family: var(--mono);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: var(--blue);
	}

	.pri-name {
		min-width: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
		color: var(--ink);
	}

	.pri-header.active .pri-name {
		color: var(--blue);
	}

	.pri-caret {
		margin-left: auto;
		flex-shrink: 0;
		font-size: 0.7rem;
		color: var(--blue);
		transition: transform 0.2s ease;
	}

	.pri-header.active .pri-caret {
		transform: rotate(180deg);
	}

	.pri-panel-body {
		padding: 1.2rem 0.25rem 1.6rem;
	}

	.pri-summary {
		margin: 0 0 1rem;
		max-width: 64ch;
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.45;
		color: var(--ink);
	}

	.pri-points {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.7rem;
	}

	.pri-points li {
		position: relative;
		padding-left: 1.4rem;
		font-family: var(--sans);
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.pri-points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5em;
		width: 7px;
		height: 7px;
		background: var(--sky);
	}

	.pri-link {
		display: inline-block;
		margin-top: 1.75rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--blue);
		text-decoration: none;
	}

	.pri-link:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* ── Desktop: tab row + full-width detail panel beneath ──── */
	@media (min-width: 769px) {
		.pri-list {
			display: flex;
			flex-wrap: wrap;
			align-items: stretch;
		}

		.pri-header {
			order: 1;
			flex: 1 1 0;
			min-width: 0;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.55rem;
			border-top: 3px solid var(--line-l);
			padding: 1rem 1.1rem 1.15rem;
		}

		.pri-header.active {
			border-top-color: var(--sky);
			background: var(--paper-2);
		}

		.pri-caret {
			display: none;
		}

		.pri-panel {
			order: 2;
			flex-basis: 100%;
		}

		.pri-panel-body {
			background: var(--paper-2);
			padding: 1.6rem 1.85rem 1.85rem;
		}

		.pri-points {
			grid-template-columns: 1fr 1fr;
			gap: 0.75rem 2.5rem;
		}
	}
</style>
