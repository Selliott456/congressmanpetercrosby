<script context="module">
	// Unique-id counter so each chart's data table can be labelled by its title.
	let uid = 0;
</script>

<script>
	/**
	 * A recreated poll bar chart for press releases. Renders on a light (paper)
	 * ground: hairline gridlines, brand-colored bars with a value label, an x-axis
	 * of category labels, and an optional note + source line. The visual chart is
	 * hidden from assistive tech, which instead gets an equivalent data table.
	 */

	/** @type {string} */
	export let chartTitle;
	/** Y-axis maximum (percent). @type {number} */
	export let yMax;
	/** Y-axis gridline interval (percent). @type {number} */
	export let yStep;
	/** @type {{ label: string; value: number; color: string }[]} */
	export let bars;
	/** @type {string | undefined} */
	export let note = undefined;
	/** @type {string | undefined} */
	export let source = undefined;

	const titleId = `pbc-${uid++}`;

	// Gridline ticks, top → bottom (yMax … 0).
	$: ticks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => yMax - i * yStep);

	/**
	 * Legible label color for a bar: ink on light fills, white on dark ones.
	 * @param {string} hex e.g. "#487996"
	 */
	function labelColor(hex) {
		const h = hex.replace('#', '');
		const r = parseInt(h.slice(0, 2), 16);
		const g = parseInt(h.slice(2, 4), 16);
		const b = parseInt(h.slice(4, 6), 16);
		const L = 0.2126 * r + 0.7152 * g + 0.0722 * b; // perceived luminance, 0–255
		return L > 150 ? 'var(--ink)' : '#ffffff';
	}
</script>

<figure class="pbc">
	<figcaption id={titleId} class="pbc-title">{chartTitle}</figcaption>

	<div class="pbc-plot" aria-hidden="true">
		{#each ticks as t}
			<div class="pbc-line" style="bottom:{(t / yMax) * 100}%">
				<span class="pbc-ytick">{t}%</span>
			</div>
		{/each}
		<div class="pbc-bars">
			{#each bars as b}
				<div class="pbc-col">
					<div class="pbc-bar" style="height:{(b.value / yMax) * 100}%; background:{b.color};">
						<span class="pbc-val" style="color:{labelColor(b.color)}">{b.value}%</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="pbc-xaxis" aria-hidden="true">
		{#each bars as b}
			<span class="pbc-xlabel">{b.label}</span>
		{/each}
	</div>

	<!-- Accessible equivalent of the chart. -->
	<table class="pbc-sr" aria-labelledby={titleId}>
		<thead>
			<tr><th scope="col">Response</th><th scope="col">Share</th></tr>
		</thead>
		<tbody>
			{#each bars as b}
				<tr><th scope="row">{b.label}</th><td>{b.value}%</td></tr>
			{/each}
		</tbody>
	</table>

	{#if note}<p class="pbc-note">{note}</p>{/if}
	{#if source}<p class="pbc-source">{source}</p>{/if}
</figure>

<style>
	.pbc {
		margin: 2.25rem 0;
	}

	.pbc-title {
		font-family: var(--sans);
		font-weight: 600;
		font-size: 1.0625rem;
		line-height: 1.3;
		color: var(--ink);
		margin: 0 0 1.25rem;
	}

	/* Plot: gridlines + y-axis labels in a left gutter, bars overlaid. */
	.pbc-plot {
		position: relative;
		height: clamp(220px, 42vw, 300px);
		padding-left: 2.6rem;
	}

	.pbc-line {
		position: absolute;
		left: 2.6rem;
		right: 0;
		height: 0;
		border-top: 1px solid var(--line-l);
	}

	.pbc-ytick {
		position: absolute;
		/* Sit in the left gutter, just left of the gridline (not over the bars). */
		right: 100%;
		margin-right: 0.4rem;
		width: 2rem;
		text-align: right;
		transform: translateY(-50%);
		font-family: var(--mono);
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.pbc-bars {
		position: absolute;
		left: 2.6rem;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: flex-end;
		gap: clamp(6px, 2%, 22px);
	}

	.pbc-col {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.pbc-bar {
		position: relative;
		width: 80%;
		max-width: 92px;
		min-height: 2px;
	}

	.pbc-val {
		position: absolute;
		top: 5px;
		left: 0;
		right: 0;
		text-align: center;
		font-family: var(--mono);
		font-size: 0.72rem;
		font-weight: 600;
	}

	.pbc-xaxis {
		display: flex;
		gap: clamp(6px, 2%, 22px);
		margin: 0.5rem 0 0 2.6rem;
	}

	.pbc-xlabel {
		flex: 1;
		text-align: center;
		font-family: var(--sans);
		font-size: clamp(0.6rem, 2.5vw, 0.72rem);
		line-height: 1.25;
		color: var(--ink-2);
		/* Wrap at spaces; only break a word if it can't fit on its own. */
		overflow-wrap: break-word;
	}

	.pbc-note {
		margin: 1rem 0 0;
		font-family: var(--sans);
		font-style: italic;
		font-size: 0.8125rem;
		color: var(--ink-3);
	}

	.pbc-source {
		margin: 0.5rem 0 0;
		font-family: var(--mono);
		font-size: 0.6875rem;
		line-height: 1.5;
		color: var(--ink-3);
	}

	.pbc-note + .pbc-source {
		margin-top: 0.35rem;
	}

	/* Visually hidden, still in the accessibility tree. */
	.pbc-sr {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}
</style>
