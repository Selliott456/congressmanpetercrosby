<script>
	import { scaleLinear } from 'd3-scale';

	/**
	 * Diverging bar chart around a zero baseline — net approval (approve minus
	 * disapprove). Bars grow left of zero when underwater, right when above it,
	 * with the rounded data-end on the outer edge and a square edge at the baseline.
	 *
	 * Responsive: below `COMPACT_AT` the row label moves ABOVE its bar rather than
	 * sitting in a fixed side column, so the bars keep a usable scale on a phone.
	 */

	/** @typedef {{ name: string; role: string; approve: number | null; disapprove: number | null; net: number }} Row */

	/** @type {Row[]} */
	export let rows = [];
	/** Color for underwater (negative) bars. @type {string} */
	export let negColor = '#A9501C';
	/** Color for above-water (positive) bars. @type {string} */
	export let posColor = '#2E5FA0';
	/** Width reserved for row labels in the side-by-side layout. @type {number} */
	export let labelWidth = 190;
	/** @type {string} */
	export let ariaLabel = 'Net approval, diverging bar chart';

	/** Container width at which labels stack above their bar. */
	const COMPACT_AT = 520;
	const BAR_H = 20;
	const R = 4;
	const MARGIN_TOP = 6;
	const MARGIN_BOTTOM = 28;

	let width = 720;

	$: compact = width < COMPACT_AT;
	$: gutter = compact ? 0 : labelWidth;
	/** Room for the value label that rides the bar's outer end. */
	$: marginRight = compact ? 34 : 52;
	/** Left room for a value label on a bar that reaches the domain edge (e.g. −30).
	    Without it that label renders at a negative x and is clipped off-screen. */
	$: marginLeft = compact ? 30 : 8;
	$: rowH = compact ? 70 : 44;

	$: innerW = Math.max(120, width - gutter - marginLeft - marginRight);
	$: niceMax = Math.max(10, Math.ceil(Math.max(...rows.map((r) => Math.abs(r.net)), 10) / 10) * 10);
	$: hasPos = rows.some((r) => r.net > 0);
	$: hasNeg = rows.some((r) => r.net < 0);
	/**
	 * Only reserve the side of zero that the data actually uses. When every figure is
	 * underwater, a symmetric domain spends half the canvas on an empty positive arm —
	 * costly on a phone. Zero stays the baseline either way, so magnitudes still read
	 * against it; the axis just stops where the data does.
	 */
	$: domain = hasPos && hasNeg ? [-niceMax, niceMax] : hasNeg ? [-niceMax, 0] : [0, niceMax];
	$: x = scaleLinear().domain(domain).range([0, innerW]);
	$: ticks = x.ticks(compact ? 4 : 6).filter((t) => Number.isInteger(t));
	$: height = MARGIN_TOP + rows.length * rowH + MARGIN_BOTTOM;
	/** Vertical center of a row's bar. */
	$: barY = (/** @type {number} */ i) =>
		compact ? MARGIN_TOP + i * rowH + 52 : MARGIN_TOP + i * rowH + rowH / 2 - 6;

	/**
	 * @param {number} x0 @param {number} w @param {number} y @param {number} h
	 * @param {boolean} roundLeft @param {boolean} roundRight
	 */
	function barPath(x0, w, y, h, roundLeft, roundRight) {
		const r = Math.min(R, w / 2, h / 2);
		if (w <= 0) return '';
		const rl = roundLeft ? r : 0;
		const rr = roundRight ? r : 0;
		return [
			`M${x0 + rl},${y}`,
			`H${x0 + w - rr}`,
			rr ? `A${rr},${rr} 0 0 1 ${x0 + w},${y + rr}` : '',
			`V${y + h - rr}`,
			rr ? `A${rr},${rr} 0 0 1 ${x0 + w - rr},${y + h}` : '',
			`H${x0 + rl}`,
			rl ? `A${rl},${rl} 0 0 1 ${x0},${y + h - rl}` : '',
			`V${y + rl}`,
			rl ? `A${rl},${rl} 0 0 1 ${x0 + rl},${y}` : '',
			'Z'
		]
			.filter(Boolean)
			.join(' ');
	}

	/** @type {{ name: string; approve: number | null; disapprove: number | null; net: number; x: number; y: number } | null} */
	let hovered = null;
	/** Measured tooltip width, used to keep it inside the plot's clipping box. */
	let tipW = 0;
	/** Clamp to the container and flip below the bar when there's no room above. */
	$: tipLeft = hovered
		? Math.min(Math.max(hovered.x, tipW / 2 + 4), Math.max(tipW / 2 + 4, width - tipW / 2 - 4))
		: 0;
	$: tipBelow = hovered ? hovered.y < 64 : false;
</script>

<div class="chart" bind:clientWidth={width}>
	<svg width="100%" {height} role="img" aria-label={ariaLabel} on:mouseleave={() => (hovered = null)}>
		<g transform="translate({gutter + marginLeft},0)">
			{#each ticks as t}
				<line
					x1={x(t)}
					x2={x(t)}
					y1={MARGIN_TOP}
					y2={MARGIN_TOP + rows.length * rowH - 8}
					stroke="var(--line-l-2)"
					stroke-width="1"
					shape-rendering="crispEdges"
				/>
				<text x={x(t)} y={MARGIN_TOP + rows.length * rowH + 10} text-anchor="middle" class="tick">
					{t > 0 ? `+${t}` : t}
				</text>
			{/each}
		</g>

		{#each rows as row, i}
			{@const cy = barY(i)}
			{@const rowTop = MARGIN_TOP + i * rowH}
			{@const isNeg = row.net < 0}
			{@const x0 = isNeg ? x(row.net) : x(0)}
			{@const w = Math.abs(x(row.net) - x(0))}

			{#if compact}
				<text x={0} y={rowTop + 14} class="row-label">{row.name}</text>
				<text x={0} y={rowTop + 31} class="row-sublabel">{row.role}</text>
			{:else}
				<text x={0} y={cy - 5} dominant-baseline="central" class="row-label">{row.name}</text>
				<text x={0} y={cy + 11} dominant-baseline="central" class="row-sublabel">{row.role}</text>
			{/if}

			<g transform="translate({gutter + marginLeft},0)">
				<path
					d={barPath(x0, w, cy - BAR_H / 2, BAR_H, isNeg, !isNeg)}
					fill={isNeg ? negColor : posColor}
					on:mouseenter={() =>
						(hovered = {
							name: row.name,
							approve: row.approve,
							disapprove: row.disapprove,
							net: row.net,
							x: (isNeg ? x0 : x0 + w) + gutter + marginLeft,
							y: cy
						})}
					role="presentation"
				/>
				<text
					x={isNeg ? x0 - 8 : x0 + w + 8}
					y={cy}
					text-anchor={isNeg ? 'end' : 'start'}
					dominant-baseline="central"
					class="value-label"
				>
					{row.net > 0 ? `+${row.net}` : row.net}
				</text>
			</g>
		{/each}

		<!-- zero baseline, drawn last so it sits above the bars -->
		<line
			x1={gutter + marginLeft + x(0)}
			x2={gutter + marginLeft + x(0)}
			y1={MARGIN_TOP - 2}
			y2={MARGIN_TOP + rows.length * rowH - 8}
			stroke="var(--ink)"
			stroke-width="1"
			shape-rendering="crispEdges"
		/>
	</svg>

	{#if hovered}
		<div
			class="tooltip"
			class:below={tipBelow}
			bind:clientWidth={tipW}
			style="left:{tipLeft}px; top:{hovered.y}px"
		>
			<span class="tt-name">{hovered.name}</span>
			{#if hovered.approve !== null && hovered.disapprove !== null}
				<span class="tt-detail">{hovered.approve}% approve · {hovered.disapprove}% disapprove</span>
			{/if}
			<span class="tt-value">Net {hovered.net > 0 ? `+${hovered.net}` : hovered.net}</span>
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

	path {
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
		padding: 0.4rem 0.65rem;
		font-size: 0.75rem;
		white-space: nowrap;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		z-index: 2;
	}

	.tooltip.below {
		transform: translate(-50%, 12px);
	}

	.tt-detail {
		color: var(--paper-3);
		font-size: 0.7rem;
	}

	.tt-value {
		font-family: var(--mono);
		color: var(--sky);
	}
</style>
