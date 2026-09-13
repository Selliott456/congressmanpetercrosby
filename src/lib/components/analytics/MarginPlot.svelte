<script>
	/**
	 * Point estimates with their margin-of-error ranges — the honest form for a close
	 * ballot test. Each row is a dot on a shared axis with a band spanning value ± moe.
	 * When the gap between two dots is smaller than the margin, each dot sits inside the
	 * other's band, and the chart shows the tie on its own. (Bands merely overlapping is
	 * not the test: they overlap for any gap under twice the margin.)
	 *
	 * HTML with percentage positions, so it reflows without measuring. Below
	 * `COMPACT_AT` the row label moves above its track.
	 */

	/** @typedef {{ label: string; value: number; color: string }} Row */

	/** @type {Row[]} */
	export let rows = [];
	/** Margin of error, in percentage points. @type {number} */
	export let moe;
	/** Axis maximum (percent), a multiple of 10. @type {number} */
	export let max = 50;
	/** Decimal places shown for values. @type {number} */
	export let digits = 1;
	/** Key under the plot explaining the bands. @type {string} */
	export let bandLabel = '';
	/** @type {string} */
	export let ariaLabel = 'Estimates with margin-of-error ranges';

	/** Container width at which labels stack above their track. */
	const COMPACT_AT = 520;

	let width = 720;

	$: compact = width < COMPACT_AT;
	$: ticks = Array.from({ length: max / 10 + 1 }, (_, i) => i * 10);
	/** Axis position as a percentage of the track, clamped to the axis. */
	$: pos = (/** @type {number} */ v) => (Math.min(Math.max(v, 0), max) / max) * 100;
	$: fmt = (/** @type {number} */ v) => v.toFixed(digits);
</script>

<div class="chart" class:compact bind:clientWidth={width}>
	<div class="plot" role="img" aria-label={ariaLabel}>
		<div class="grid" aria-hidden="true">
			{#each ticks as t}<span style="left:{pos(t)}%"></span>{/each}
		</div>

		{#each rows as row}
			{@const lo = pos(row.value - moe)}
			{@const hi = pos(row.value + moe)}
			<div class="row">
				<span class="label">{row.label}</span>
				<div class="track" style="--c:{row.color}">
					<span class="band" style="left:{lo}%; width:{hi - lo}%"></span>
					<span class="dot" style="left:{pos(row.value)}%"></span>
					<!-- The estimate and its range, stacked so the pair stays narrow enough
					     to sit past the band's end even on a phone. -->
					<span class="value" style="left:calc({hi}% + 8px)">
						<span class="value-main">{fmt(row.value)}%</span>
						<span class="value-range">{fmt(row.value - moe)}–{fmt(row.value + moe)}</span>
					</span>
				</div>
			</div>
		{/each}

		<div class="axis" aria-hidden="true">
			{#each ticks as t}<span style="left:{pos(t)}%">{t}%</span>{/each}
		</div>
	</div>

	{#if bandLabel}
		<p class="key"><span class="key-band" aria-hidden="true"></span>{bandLabel}</p>
	{/if}
</div>

<style>
	.chart {
		--label-w: 9.5rem;
		--gap: 1rem;
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

	/* Gridlines span every row, aligned to the track column. */
	.grid {
		position: absolute;
		top: 0;
		bottom: 1.5rem;
		left: calc(var(--label-w) + var(--gap));
		right: 0;
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
		padding: 0.6rem 0;
	}

	.compact .row {
		grid-template-columns: minmax(0, 1fr);
		row-gap: 0.3rem;
	}

	.label {
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--ink);
	}

	.track {
		position: relative;
		height: 34px;
	}

	/* The range: a light wash of the candidate's color with solid end caps. */
	.band {
		position: absolute;
		top: 50%;
		height: 14px;
		transform: translateY(-50%);
		box-sizing: border-box;
		border-inline: 2px solid var(--c);
	}

	.band::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--c);
		opacity: 0.18;
	}

	.dot {
		position: absolute;
		top: 50%;
		width: 16px;
		height: 16px;
		box-sizing: border-box;
		border-radius: 50%;
		background: var(--c);
		border: 2px solid var(--paper);
		transform: translate(-50%, -50%);
	}

	.value {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		white-space: nowrap;
		font-family: var(--mono);
		line-height: 1.2;
	}

	.value-main {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--ink);
	}

	.value-range {
		font-size: 0.66rem;
		color: #5b6b80;
	}

	.axis {
		position: relative;
		height: 1.1rem;
		margin: 0.4rem 0 0 calc(var(--label-w) + var(--gap));
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

	.key {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0.85rem 0 0;
		font-size: 0.78rem;
		color: var(--ink-3);
	}

	.key-band {
		position: relative;
		flex: none;
		width: 22px;
		height: 10px;
		box-sizing: border-box;
		border-inline: 2px solid var(--ink-3);
	}

	.key-band::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--ink-3);
		opacity: 0.18;
	}
</style>
