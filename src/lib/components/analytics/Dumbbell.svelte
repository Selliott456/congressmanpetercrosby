<script>
	/**
	 * Before → after per item: two dots on a shared axis joined by a line, in one hue at
	 * two shades (earlier light, later dark), so direction reads without a second color
	 * family. Values sit in aligned columns at the right rather than beside the dots —
	 * near-identical readings put the dots on top of each other, where labels would
	 * collide. The axis runs from zero, so a small change looks small.
	 */

	/** @typedef {{ label: string; from: number; to: number }} Row */
	/** @typedef {{ label: string; sublabel?: string; rows: Row[] }} Group */

	/** @type {Group[]} */
	export let groups = [];
	/** Dot color for the earlier reading. @type {string} */
	export let fromColor;
	/** Dot color for the later reading. @type {string} */
	export let toColor;
	/** Column heading for the earlier reading, e.g. "Aug". @type {string} */
	export let fromLabel;
	/** Column heading for the later reading, e.g. "Sep". @type {string} */
	export let toLabel;
	/** Axis maximum (percent). @type {number} */
	export let max = 100;
	/** Decimal places shown for values. @type {number} */
	export let digits = 0;
	/** @type {string} */
	export let ariaLabel = 'Change between two readings';

	/** Container width at which the label and value columns narrow. */
	const COMPACT_AT = 520;

	let width = 720;

	$: compact = width < COMPACT_AT;
	/** Three ticks on a phone: the track is only ~115px wide there. */
	$: ticks = (compact ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1]).map((f) => f * max);
	$: pos = (/** @type {number} */ v) => (Math.min(Math.max(v, 0), max) / max) * 100;
	$: fmt = (/** @type {number} */ v) => v.toFixed(digits);
</script>

<div class="chart" class:compact bind:clientWidth={width}>
	<div class="plot" role="img" aria-label={ariaLabel}>
		<div class="grid" aria-hidden="true">
			{#each ticks as t}<span style="left:{pos(t)}%"></span>{/each}
		</div>

		<!-- The value-column heads double as the legend: each carries its reading's dot. -->
		<div class="row head">
			<span></span>
			<span></span>
			<span class="col"><span class="key" style="background:{fromColor}"></span>{fromLabel}</span>
			<span class="col"><span class="key" style="background:{toColor}"></span>{toLabel}</span>
		</div>

		{#each groups as group}
			<div class="group-head">
				<span class="group-label">{group.label}</span>
				{#if group.sublabel}<span class="group-sub">{group.sublabel}</span>{/if}
			</div>
			{#each group.rows as row}
				<div class="row">
					<span class="row-label">{row.label}</span>
					<div class="track">
						<span
							class="link"
							style="left:{pos(Math.min(row.from, row.to))}%; width:{Math.abs(
								pos(row.to) - pos(row.from)
							)}%"
						></span>
						<span class="dot" style="left:{pos(row.from)}%; background:{fromColor}"></span>
						<span class="dot" style="left:{pos(row.to)}%; background:{toColor}"></span>
					</div>
					<span class="col num">{fmt(row.from)}%</span>
					<span class="col num to">{fmt(row.to)}%</span>
				</div>
			{/each}
		{/each}

		<div class="axis" aria-hidden="true">
			{#each ticks as t}<span style="left:{pos(t)}%">{t}%</span>{/each}
		</div>
	</div>
</div>

<style>
	.chart {
		--label-w: 9rem;
		--gap: 1rem;
		--col-w: 3.25rem;
		position: relative;
		width: 100%;
	}

	.chart.compact {
		--label-w: 6.5rem;
		--gap: 0.6rem;
		--col-w: 2.75rem;
	}

	.plot {
		position: relative;
	}

	.grid {
		position: absolute;
		top: 1.6rem;
		bottom: 1.5rem;
		left: calc(var(--label-w) + var(--gap));
		right: calc(2 * var(--col-w) + 2 * var(--gap));
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
		grid-template-columns: var(--label-w) minmax(0, 1fr) var(--col-w) var(--col-w);
		column-gap: var(--gap);
		align-items: center;
		padding: 0.3rem 0;
	}

	.row:not(.head):hover {
		background: rgba(46, 95, 160, 0.05);
	}

	/* The head's two cells hold words, not numbers, so they size to their own text and
	   never wrap — the numeric column width (3.25rem) squeezes a label like
	   "Week of Sep 21" into three lines. They still right-align with the value columns
	   below, and the empty track cell absorbs the extra width. */
	.head {
		grid-template-columns: var(--label-w) minmax(0, 1fr) auto auto;
		padding: 0 0 0.5rem;
	}

	.head .col {
		white-space: nowrap;
	}

	.col {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.35rem;
		font-family: var(--mono);
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #5b6b80;
	}

	.key {
		flex: none;
		width: 9px;
		height: 9px;
		border-radius: 50%;
	}

	.num {
		font-size: 0.75rem;
		letter-spacing: 0;
		text-transform: none;
		font-variant-numeric: tabular-nums;
	}

	.num.to {
		font-weight: 600;
		color: var(--ink);
	}

	/* An opaque ground, so the gridlines break between groups. */
	.group-head {
		position: relative;
		z-index: 1;
		background: var(--paper);
		padding: 1rem 0 0.3rem;
	}

	.head + .group-head {
		padding-top: 0.4rem;
	}

	.group-label {
		display: block;
		font-size: 0.88rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--ink);
	}

	.group-sub {
		display: block;
		margin-top: 0.1rem;
		font-size: 0.72rem;
		line-height: 1.35;
		color: #5b6b80;
	}

	.row-label {
		font-size: 0.8rem;
		line-height: 1.25;
		color: var(--ink-3);
	}

	.track {
		position: relative;
		height: 22px;
	}

	.link {
		position: absolute;
		top: 50%;
		height: 2px;
		transform: translateY(-50%);
		background: var(--line-l);
	}

	.dot {
		position: absolute;
		top: 50%;
		width: 14px;
		height: 14px;
		box-sizing: border-box;
		border-radius: 50%;
		border: 2px solid var(--paper);
		transform: translate(-50%, -50%);
	}

	.axis {
		position: relative;
		height: 1.1rem;
		margin: 0.4rem calc(2 * var(--col-w) + 2 * var(--gap)) 0 calc(var(--label-w) + var(--gap));
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

	/*
	 * Narrow screens: beside a label and two value columns the track is only ~115px, so
	 * a 3-point change comes out 7px and the two dots sit on top of each other. Stack
	 * instead — label and both values on one line, the track full-width beneath — which
	 * roughly triples the plot width. The axis still starts at zero: widening the track
	 * is what makes a small change legible, rather than truncating the scale to
	 * exaggerate it.
	 */
	.chart.compact .row {
		grid-template-columns: minmax(0, 1fr) auto auto;
		row-gap: 0.2rem;
		padding: 0.5rem 0;
	}

	.chart.compact .row-label,
	.chart.compact .row .num {
		grid-row: 1;
	}

	.chart.compact .track {
		grid-column: 1 / -1;
		grid-row: 2;
		height: 18px;
	}

	/* The head is a legend on its own line once the value columns are gone. */
	.chart.compact .head {
		display: flex;
		justify-content: flex-end;
		gap: 0.85rem;
		padding-bottom: 0.35rem;
	}

	/* Direct children only — the layout placeholders. The legend's key dots are empty
	   spans too, one level deeper. */
	.chart.compact .head > span:empty {
		display: none;
	}

	/* Gridlines and ticks span the full width, matching the stacked track. */
	.chart.compact .grid {
		left: 0;
		right: 0;
	}

	.chart.compact .axis {
		margin-left: 0;
		margin-right: 0;
	}
</style>
