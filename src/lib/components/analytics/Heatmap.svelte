<script>
	import { inkOn } from '$lib/utils/chartColor';

	/**
	 * Heatmap table: a grid of percentages, each cell shaded on a one-hue sequential
	 * ramp and printed with its value. Suited to shares across several groups — it
	 * needs no per-group colors (so it holds more groups than the three a dot plot can
	 * keep apart), and it reads both ways: down a column is one group's profile, across
	 * a row is how widely a response is shared.
	 *
	 * It is a real <table>, so it is its own data table — no separate table view. On
	 * narrow screens it scrolls sideways inside its own box, with the row labels pinned.
	 */

	/** @typedef {{ key: string; label: string; sublabel?: string; flagged?: boolean }} Column */
	/** @typedef {{ label: string; values: Record<string, number> }} Row */

	/** @type {Column[]} */
	export let columns = [];
	/** @type {Row[]} */
	export let rows = [];
	/** Validated sequential ramp, light → dark. @type {string[]} */
	export let ramp;
	/** Value at the top of the darkest step. @type {number} */
	export let max = 100;
	/** Decimal places shown for values. @type {number} */
	export let digits = 1;
	/** Accessible caption for the table. @type {string} */
	export let caption;
	/** Heading over the row labels. @type {string} */
	export let rowHeader = '';
	/** Set the first column apart as a reference (e.g. "All voters"). @type {boolean} */
	export let separateFirst = false;
	/** Label for the color-scale key; the key is omitted without one. @type {string} */
	export let scaleLabel = '';

	/**
	 * Cells take the ramp's own colors in equal steps (0–20%, 20–40% … for five stops
	 * and a max of 100), never a blend between stops. A blend passes through mid-blues
	 * where neither dark nor white text reaches 4.5:1; every validated stop clears it
	 * with the label color `inkOn` picks. The printed value carries the precision.
	 */
	$: steps = ramp.length;
	$: shade = (/** @type {number} */ v) =>
		ramp[Math.min(steps - 1, Math.max(0, Math.floor((v / max) * steps)))];
	/** Step boundaries for the key: 0, max/steps, … max. */
	$: edges = Array.from({ length: steps + 1 }, (_, i) => Math.round(((max / steps) * i) * 10) / 10);
	/** One solid band per step (hard color stops), so the key matches the cells exactly. */
	$: bands = `linear-gradient(90deg, ${ramp
		.map((c, i) => `${c} ${(i / steps) * 100}% ${((i + 1) / steps) * 100}%`)
		.join(', ')})`;
</script>

<div class="heatmap">
	<div class="scroll">
		<table>
			<caption class="visually-hidden">{caption}</caption>
			<thead>
				<tr>
					<th scope="col" class="corner">{rowHeader}</th>
					{#each columns as col, c}
						<th scope="col" class:ref={separateFirst && c === 0}>
							<span class="col-label">{col.label}</span>
							{#if col.sublabel}
								<span class="col-sub">
									{col.sublabel}{#if col.flagged}<span class="flag">†</span>{/if}
								</span>
							{/if}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as row}
					<tr>
						<th scope="row">{row.label}</th>
						{#each columns as col, c}
							{@const bg = shade(row.values[col.key])}
							<td
								class:ref={separateFirst && c === 0}
								style="background-color:{bg}; color:{inkOn(bg)}"
							>
								{row.values[col.key].toFixed(digits)}%
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if scaleLabel}
		<div class="scale" aria-hidden="true">
			<span class="scale-label">{scaleLabel}</span>
			<span class="scale-bar">
				<span class="scale-ramp" style="background:{bands}"></span>
				<span class="scale-ticks">
					{#each edges as edge}<span>{edge}%</span>{/each}
				</span>
			</span>
		</div>
	{/if}
</div>

<style>
	.scroll {
		overflow-x: auto;
	}

	/* A 2px surface gap between cells, never a stroke. */
	table {
		width: 100%;
		min-width: 30rem;
		border-collapse: separate;
		border-spacing: 2px;
	}

	th {
		font-weight: 500;
	}

	thead th {
		padding: 0 0.4rem 0.55rem;
		vertical-align: bottom;
		text-align: center;
	}

	.corner {
		text-align: left;
		font-family: var(--mono);
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #5b6b80;
	}

	.col-label {
		display: block;
		font-size: 0.76rem;
		font-weight: 600;
		line-height: 1.25;
		color: var(--ink);
	}

	.col-sub {
		display: block;
		margin-top: 0.15rem;
		font-family: var(--mono);
		font-size: 0.62rem;
		white-space: nowrap;
		color: #5b6b80;
	}

	.flag {
		margin-left: 0.1rem;
		color: var(--ink);
	}

	tbody th {
		padding: 0 0.9rem 0 0;
		text-align: left;
		font-size: 0.82rem;
		line-height: 1.25;
		color: var(--ink);
	}

	/* Row labels stay pinned while the grid scrolls sideways on a phone. */
	tbody th,
	.corner {
		position: sticky;
		left: 0;
		z-index: 1;
		min-width: 8.5rem;
		background: var(--paper);
	}

	td {
		min-width: 3.75rem;
		padding: 0.7rem 0.45rem;
		text-align: center;
		font-family: var(--mono);
		font-size: 0.78rem;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
	}

	td:hover {
		outline: 2px solid var(--ink);
		outline-offset: -2px;
	}

	tr:hover th[scope='row'] {
		color: var(--blue);
	}

	/* The reference column gets a wider gap after it. */
	.ref {
		border-right: 6px solid var(--paper);
		background-clip: padding-box;
	}

	.scale {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-top: 0.9rem;
	}

	.scale-label {
		font-family: var(--mono);
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #5b6b80;
		line-height: 8px;
	}

	.scale-bar {
		display: flex;
		flex-direction: column;
		width: 12.5rem;
	}

	.scale-ramp {
		display: block;
		height: 8px;
	}

	/* One label per step boundary, spread evenly so each sits under its edge. */
	.scale-ticks {
		display: flex;
		justify-content: space-between;
		margin-top: 0.2rem;
		font-family: var(--mono);
		font-size: 0.6rem;
		color: #5b6b80;
	}

	.visually-hidden {
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
