<script>
	import { scaleLinear } from 'd3-scale';

	/**
	 * Horizontal dot plot. Handles two cases:
	 *  • one point per row  → lollipop (stem from zero), single hue, no legend
	 *  • several points per row → grouped dots joined by a range line, so the
	 *    spread across groups is the thing you read
	 *
	 * Responsive: below `COMPACT_AT` the row label moves ABOVE its track instead of
	 * sitting in a fixed side column. A 190px label gutter leaves only ~60px of
	 * track on a phone, which pushes dots off the plot entirely; stacking hands
	 * that width back to the data.
	 *
	 * Dots carry a 2px surface ring so they stay legible where they overlap.
	 */

	/** @typedef {{ series: string; value: number; color: string }} Point */
	/** @typedef {{ label: string; sublabel?: string; points: Point[] }} Row */

	/** @type {Row[]} */
	export let rows = [];
	/** Axis maximum (percent). @type {number} */
	export let max = 100;
	/** Width reserved for row labels in the side-by-side layout. @type {number} */
	export let labelWidth = 190;
	/** @type {string} */
	export let ariaLabel = 'Dot plot';

	/** Container width at which labels stack above their track. */
	const COMPACT_AT = 520;
	const DOT_R = 6;
	const MARGIN_TOP = 6;
	const MARGIN_BOTTOM = 26;
	/** Vertical spacing between dodged series lanes. */
	const LANE_H = 22;

	let width = 720;

	$: compact = width < COMPACT_AT;
	/** In compact mode the label sits above the track, so it reserves no width. */
	$: gutter = compact ? 0 : labelWidth;
	/** Room at the right for the value label that rides the outermost dot. */
	$: marginRight = compact ? 58 : 44;
	/** Left room so the center-anchored "0%" tick isn't half-clipped at the origin. */
	$: marginLeft = compact ? 10 : 0;

	$: maxPoints = Math.max(1, ...rows.map((r) => r.points.length));
	/**
	 * Tightly-clustered series overlap into an unreadable blob on a narrow track —
	 * 3 groups within 7 points sit ~20px apart, less than three dot widths. Rather
	 * than zoom the axis (which would exaggerate a spread the chart is calling
	 * *tight*), give each series its own lane and label it directly.
	 */
	$: dodge = compact && maxPoints > 1;
	$: rowH = compact ? (dodge ? 46 + maxPoints * LANE_H : 76) : 46;

	$: innerW = Math.max(120, width - gutter - marginLeft - marginRight);
	$: x = scaleLinear().domain([0, max]).range([0, innerW]);
	$: ticks = x.ticks(compact ? 4 : 5);
	$: height = MARGIN_TOP + rows.length * rowH + MARGIN_BOTTOM;
	/** Vertical center of a row's track (the single-value / non-dodged case). */
	$: trackY = (/** @type {number} */ i) =>
		compact ? MARGIN_TOP + i * rowH + 58 : MARGIN_TOP + i * rowH + rowH / 2 - 5;
	/** Vertical center of series lane `j` within row `i` when dodging. */
	$: laneY = (/** @type {number} */ i, /** @type {number} */ j) =>
		MARGIN_TOP + i * rowH + 52 + j * LANE_H;

	/** @type {{ label: string; series: string; value: number; x: number; y: number } | null} */
	let hovered = null;
	/** Measured tooltip width, used to keep it inside the plot's clipping box. */
	let tipW = 0;
	/** `.frame-plot` scrolls horizontally, which also clips vertically — so the
	    tooltip has to stay in bounds rather than overflow. Clamp x to the container
	    and flip below the mark when there isn't room above it. */
	$: tipLeft = hovered
		? Math.min(Math.max(hovered.x, tipW / 2 + 4), Math.max(tipW / 2 + 4, width - tipW / 2 - 4))
		: 0;
	$: tipBelow = hovered ? hovered.y < 56 : false;
</script>

<div class="chart" bind:clientWidth={width}>
	<svg width="100%" {height} role="img" aria-label={ariaLabel} on:mouseleave={() => (hovered = null)}>
		<!-- gridlines + axis -->
		<g transform="translate({gutter + marginLeft},0)">
			{#each ticks as t}
				<line
					x1={x(t)}
					x2={x(t)}
					y1={MARGIN_TOP}
					y2={MARGIN_TOP + rows.length * rowH - 10}
					stroke="var(--line-l-2)"
					stroke-width="1"
					shape-rendering="crispEdges"
				/>
				<text x={x(t)} y={MARGIN_TOP + rows.length * rowH + 8} text-anchor="middle" class="tick">
					{t}%
				</text>
			{/each}
		</g>

		{#each rows as row, i}
			{@const cy = trackY(i)}
			{@const rowTop = MARGIN_TOP + i * rowH}
			<!-- row label: beside the track on wide screens, above it on narrow -->
			{#if compact}
				<text x={0} y={rowTop + 14} class="row-label">{row.label}</text>
				{#if row.sublabel}
					<text x={0} y={rowTop + 31} class="row-sublabel">{row.sublabel}</text>
				{/if}
			{:else}
				<text x={0} y={cy - (row.sublabel ? 6 : 0)} dominant-baseline="central" class="row-label">
					{row.label}
				</text>
				{#if row.sublabel}
					<text x={0} y={cy + 11} dominant-baseline="central" class="row-sublabel">
						{row.sublabel}
					</text>
				{/if}
			{/if}

			<g transform="translate({gutter + marginLeft},0)">
				{#if dodge && row.points.length > 1}
					<!-- One lane per series: no overlap, and every value is directly
					     labeled. The shared gridlines still show how tightly they cluster. -->
					{#each row.points as pt, j}
						{@const ly = laneY(i, j)}
						<line
							x1={x(0)}
							x2={x(pt.value)}
							y1={ly}
							y2={ly}
							stroke={pt.color}
							stroke-width="2"
							stroke-linecap="round"
							opacity="0.22"
						/>
						<circle
							cx={x(pt.value)}
							cy={ly}
							r={DOT_R}
							fill={pt.color}
							stroke="var(--paper)"
							stroke-width="2"
							on:mouseenter={() =>
								(hovered = {
									label: row.label,
									series: pt.series,
									value: pt.value,
									x: x(pt.value) + gutter + marginLeft,
									y: ly
								})}
							role="presentation"
						/>
						<text
							x={x(pt.value) + DOT_R + 7}
							y={ly}
							dominant-baseline="central"
							class="value-label"
						>
							{pt.value}%
						</text>
					{/each}
				{:else}
					{#if row.points.length === 1}
						<!-- lollipop stem -->
						<line
							x1={x(0)}
							x2={x(row.points[0].value)}
							y1={cy}
							y2={cy}
							stroke={row.points[0].color}
							stroke-width="2"
							stroke-linecap="round"
							opacity="0.28"
						/>
					{:else}
						<!-- range line across the group -->
						<line
							x1={x(Math.min(...row.points.map((p) => p.value)))}
							x2={x(Math.max(...row.points.map((p) => p.value)))}
							y1={cy}
							y2={cy}
							stroke="var(--line-l)"
							stroke-width="2"
							stroke-linecap="round"
						/>
					{/if}

					{#each row.points as pt}
						<circle
							cx={x(pt.value)}
							cy={cy}
							r={DOT_R}
							fill={pt.color}
							stroke="var(--paper)"
							stroke-width="2"
							on:mouseenter={() =>
								(hovered = {
									label: row.label,
									series: pt.series,
									value: pt.value,
									x: x(pt.value) + gutter + marginLeft,
									y: cy
								})}
							role="presentation"
						/>
					{/each}

					<!-- direct label: the single value, or the group's range -->
					{#if row.points.length === 1}
						<text
							x={x(row.points[0].value) + DOT_R + 7}
							y={cy}
							dominant-baseline="central"
							class="value-label"
						>
							{row.points[0].value}%
						</text>
					{:else}
						{@const hi = Math.max(...row.points.map((p) => p.value))}
						{@const lo = Math.min(...row.points.map((p) => p.value))}
						<text x={x(hi) + DOT_R + 7} y={cy} dominant-baseline="central" class="value-label">
							{lo}–{hi}%
						</text>
					{/if}
				{/if}
			</g>
		{/each}
	</svg>

	{#if hovered}
		<div
			class="tooltip"
			class:below={tipBelow}
			bind:clientWidth={tipW}
			style="left:{tipLeft}px; top:{hovered.y}px"
		>
			<span class="tt-series">{hovered.series}</span>
			<span class="tt-value">{hovered.value}%</span>
		</div>
	{/if}
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
	}

	svg {
		display: block;
		overflow: visible;
	}

	circle {
		cursor: default;
	}

	.row-label {
		font-size: 0.85rem;
		fill: var(--ink);
	}

	.row-sublabel {
		font-size: 0.72rem;
		fill: #5b6b80;
	}

	.value-label {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 500;
		fill: var(--ink);
	}

	.tick {
		font-family: var(--mono);
		font-size: 0.62rem;
		fill: #5b6b80;
	}

	.tooltip {
		position: absolute;
		transform: translate(-50%, calc(-100% - 12px));
		background: var(--ink-deep);
		color: var(--paper);
		padding: 0.35rem 0.6rem;
		font-size: 0.75rem;
		white-space: nowrap;
		pointer-events: none;
		display: flex;
		gap: 0.5rem;
		align-items: baseline;
		z-index: 2;
	}

	.tooltip.below {
		transform: translate(-50%, 12px);
	}

	.tt-value {
		font-family: var(--mono);
		color: var(--sky);
	}
</style>
