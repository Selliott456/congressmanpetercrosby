<script>
	/**
	 * Horizontal bars sorted high to low: magnitude for one series of unordered
	 * categories, so every bar takes the same color (coloring them apart would only
	 * re-encode what length already shows). Horizontal because the category names are
	 * long; the value rides each bar's end.
	 *
	 * HTML with percentage positions, so long labels wrap instead of clipping. Below
	 * `COMPACT_AT` the label moves above its bar.
	 */

	/** @typedef {{ label: string; sublabel?: string; value: number }} Row */

	/** @type {Row[]} */
	export let rows = [];
	/** @type {string} */
	export let color = '#2E5FA0';
	/** Axis maximum (percent). @type {number} */
	export let max = 100;
	/** Decimal places shown for values. @type {number} */
	export let digits = 1;
	/** @type {string} */
	export let ariaLabel = 'Bar chart';

	/** Container width at which labels stack above their bar. */
	const COMPACT_AT = 520;

	let width = 720;

	$: compact = width < COMPACT_AT;
	$: sorted = [...rows].sort((a, b) => b.value - a.value);
	$: ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
	$: pos = (/** @type {number} */ v) => (Math.min(Math.max(v, 0), max) / max) * 100;
</script>

<div class="chart" class:compact bind:clientWidth={width}>
	<div class="plot" role="img" aria-label={ariaLabel}>
		<div class="grid" aria-hidden="true">
			{#each ticks as t}<span style="left:{pos(t)}%"></span>{/each}
		</div>

		{#each sorted as row}
			<div class="row">
				<div class="label">
					<span class="label-main">{row.label}</span>
					{#if row.sublabel}<span class="label-sub">{row.sublabel}</span>{/if}
				</div>
				<div class="track">
					<span class="bar" style="width:{pos(row.value)}%; background:{color}"></span>
					<span class="value" style="left:calc({pos(row.value)}% + 8px)">
						{row.value.toFixed(digits)}%
					</span>
				</div>
			</div>
		{/each}

		<div class="axis" aria-hidden="true">
			{#each ticks as t}<span style="left:{pos(t)}%">{t}%</span>{/each}
		</div>
	</div>
</div>

<style>
	.chart {
		--label-w: 13.5rem;
		--gap: 1.25rem;
		/* Room past the longest bar for its value label. */
		--value-room: 3.5rem;
		position: relative;
		width: 100%;
	}

	.chart.compact {
		--label-w: 0px;
		--gap: 0px;
	}

	.plot {
		position: relative;
	}

	.grid {
		position: absolute;
		top: 0;
		bottom: 1.5rem;
		left: calc(var(--label-w) + var(--gap));
		right: var(--value-room);
		pointer-events: none;
	}

	.grid span {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--line-l-2);
	}

	.row {
		position: relative;
		display: grid;
		grid-template-columns: var(--label-w) minmax(0, 1fr);
		column-gap: var(--gap);
		align-items: center;
		padding: 0.55rem 0;
	}

	.compact .row {
		grid-template-columns: minmax(0, 1fr);
		row-gap: 0.35rem;
	}

	/* Hover lifts the row with a translucent wash, so the gridlines still show. */
	.row:hover {
		background: rgba(46, 95, 160, 0.05);
	}

	.label-main {
		display: block;
		font-size: 0.85rem;
		line-height: 1.3;
		color: var(--ink);
	}

	.label-sub {
		display: block;
		margin-top: 0.1rem;
		font-size: 0.72rem;
		line-height: 1.35;
		color: #5b6b80;
	}

	.track {
		position: relative;
		height: 20px;
		margin-right: var(--value-room);
	}

	/* Square at the baseline, rounded at the data end. */
	.bar {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		border-radius: 0 4px 4px 0;
	}

	.value {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 500;
		white-space: nowrap;
		color: var(--ink);
	}

	.axis {
		position: relative;
		height: 1.1rem;
		margin: 0.4rem var(--value-room) 0 calc(var(--label-w) + var(--gap));
	}

	.axis span {
		position: absolute;
		top: 0;
		transform: translateX(-50%);
		font-family: var(--mono);
		font-size: 0.62rem;
		color: #5b6b80;
	}

	/* The 0% tick sits at the plot's left edge; centering it would half-clip it. */
	.axis span:first-child {
		transform: none;
	}
</style>
