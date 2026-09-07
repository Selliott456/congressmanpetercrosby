<script>
	import { scaleLinear } from 'd3-scale';
	import { messages } from '$lib/i18n/locale';

	/**
	 * Diverging stacked bar for an ordered (Likert) question — the correct form for
	 * agree↔disagree data. Positive responses stack leftward from the center,
	 * negative rightward, softest category nearest the center.
	 *
	 * A "neutral" segment (e.g. Unsure) is deliberately NOT placed on the polarity
	 * axis — putting it past the negative arm would imply it leans negative. It is
	 * rendered as a detached strip below, with its own label.
	 */

	/** @typedef {{ label: string; value: number; color: string; side: 'pos' | 'neg' | 'neutral' }} Segment */

	/** @type {Segment[]} */
	export let segments = [];
	/** Accessible description of the chart. @type {string} */
	export let ariaLabel = 'Diverging stacked bar chart';

	const BAR_H = 22;
	const GAP = 2; // surface gap between touching segments
	const R = 4; // rounded outer data-end
	const MARGIN = { top: 8, right: 16, bottom: 26, left: 16 };

	let width = 720;

	$: pos = segments.filter((s) => s.side === 'pos');
	$: neg = segments.filter((s) => s.side === 'neg');
	$: neutral = segments.find((s) => s.side === 'neutral');

	$: posTotal = pos.reduce((sum, s) => sum + s.value, 0);
	$: negTotal = neg.reduce((sum, s) => sum + s.value, 0);

	/** Symmetric domain so the center line is honest, rounded up to a clean 10. */
	$: niceMax = Math.max(10, Math.ceil(Math.max(posTotal, negTotal) / 10) * 10);

	$: innerW = Math.max(240, width - MARGIN.left - MARGIN.right);
	$: x = scaleLinear().domain([-niceMax, niceMax]).range([0, innerW]);

	$: ticks = x.ticks(Math.min(8, (niceMax * 2) / 10)).filter((t) => Number.isInteger(t));

	/**
	 * Lay out one arm. Softest category sits nearest the center; the outermost
	 * segment carries the rounded end.
	 *
	 * `xScale` is passed in rather than closed over: Svelte only tracks variables
	 * referenced directly in a reactive statement, so `layout(pos, -1)` would not
	 * re-run when the scale changes on resize, and the bars would stay pinned to
	 * the initial width while the center line moved.
	 *
	 * @param {Segment[]} arm
	 * @param {1 | -1} dir  1 = rightward (negative arm), -1 = leftward (positive arm)
	 * @param {(v: number) => number} xScale
	 */
	function layout(arm, dir, xScale) {
		// Order from center outward: the array is authored center-last for the
		// positive arm (strong, soft) and center-first for the negative (soft, strong).
		const outward = dir === -1 ? [...arm].reverse() : [...arm];
		let cursor = 0;
		return outward.map((seg, i) => {
			const start = cursor;
			const end = cursor + seg.value;
			cursor = end;
			const a = xScale(dir * start);
			const b = xScale(dir * end);
			const x0 = Math.min(a, b);
			const x1 = Math.max(a, b);
			const isOuter = i === outward.length - 1;
			// Trim the center-facing edge by the surface gap, and between segments.
			const trimmed =
				dir === 1 ? { x0: x0 + (i === 0 ? 0 : GAP / 2), x1: x1 } : { x0, x1: x1 - (i === 0 ? 0 : GAP / 2) };
			return {
				seg,
				x0: trimmed.x0,
				x1: trimmed.x1,
				w: Math.max(0, trimmed.x1 - trimmed.x0 - GAP / 2),
				isOuter,
				dir
			};
		});
	}

	$: posBars = layout(pos, -1, x);
	$: negBars = layout(neg, 1, x);

	/**
	 * Rounded-rect path with radius on the outer end only (square at the center
	 * baseline), per the mark spec.
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

	/** Only label inside a segment when the text comfortably fits. */
	const MIN_LABEL_W = 30;

	/** @type {{ label: string; value: number; xPct: number } | null} */
	let hovered = null;
	/** Measured tooltip width, used to keep it inside the plot's clipping box. */
	let tipW = 0;
	/** Clamped so the tooltip can't spill past either edge of the card. */
	$: tipLeft = hovered
		? Math.min(
				Math.max((hovered.xPct / 100) * width, tipW / 2 + 4),
				Math.max(tipW / 2 + 4, width - tipW / 2 - 4)
			)
		: 0;

	/** @param {{ seg: Segment }} bar @param {MouseEvent} event */
	function onEnter(bar, event) {
		const target = /** @type {SVGElement} */ (event.currentTarget);
		const svg = target.ownerSVGElement;
		if (!svg) return;
		const box = target.getBoundingClientRect();
		const svgBox = svg.getBoundingClientRect();
		hovered = {
			label: bar.seg.label,
			value: bar.seg.value,
			xPct: ((box.left + box.width / 2 - svgBox.left) / svgBox.width) * 100
		};
	}
</script>

<div class="chart" bind:clientWidth={width}>
	<svg
		width="100%"
		height={MARGIN.top + BAR_H + MARGIN.bottom}
		role="img"
		aria-label={ariaLabel}
		on:mouseleave={() => (hovered = null)}
	>
		<g transform="translate({MARGIN.left},{MARGIN.top})">
			<!-- gridlines -->
			{#each ticks as t}
				<line
					x1={x(t)}
					x2={x(t)}
					y1={0}
					y2={BAR_H}
					stroke="var(--line-l-2)"
					stroke-width="1"
					shape-rendering="crispEdges"
				/>
			{/each}

			<!-- positive arm (leftward) -->
			{#each posBars as bar}
				<path
					d={barPath(bar.x0, bar.w, 0, BAR_H, bar.isOuter, false)}
					fill={bar.seg.color}
					role="presentation"
					on:mouseenter={(e) => onEnter(bar, e)}
				/>
				{#if bar.w >= MIN_LABEL_W}
					<text
						x={bar.x0 + bar.w / 2}
						y={BAR_H / 2}
						text-anchor="middle"
						dominant-baseline="central"
						class="seg-label"
						fill={bar.seg.color === '#5FAEDE' ? '#0F2545' : '#ffffff'}
					>
						{bar.seg.value}%
					</text>
				{/if}
			{/each}

			<!-- negative arm (rightward) -->
			{#each negBars as bar}
				<path
					d={barPath(bar.x0, bar.w, 0, BAR_H, false, bar.isOuter)}
					fill={bar.seg.color}
					role="presentation"
					on:mouseenter={(e) => onEnter(bar, e)}
				/>
				{#if bar.w >= MIN_LABEL_W}
					<text
						x={bar.x0 + bar.w / 2}
						y={BAR_H / 2}
						text-anchor="middle"
						dominant-baseline="central"
						class="seg-label"
						fill={bar.seg.color === '#E8A33D' ? '#0F2545' : '#ffffff'}
					>
						{bar.seg.value}%
					</text>
				{/if}
			{/each}

			<!-- center baseline -->
			<line
				x1={x(0)}
				x2={x(0)}
				y1={-4}
				y2={BAR_H + 4}
				stroke="var(--ink)"
				stroke-width="1"
				shape-rendering="crispEdges"
			/>

			<!-- axis ticks -->
			{#each ticks as t}
				<text x={x(t)} y={BAR_H + 17} text-anchor="middle" class="tick">{Math.abs(t)}%</text>
			{/each}
		</g>
	</svg>

	{#if hovered}
		<div class="tooltip" bind:clientWidth={tipW} style="left:{tipLeft}px">
			<span class="tt-label">{hovered.label}</span>
			<span class="tt-value">{hovered.value}%</span>
		</div>
	{/if}

	{#if neutral}
		<div class="neutral-strip">
			<span class="neutral-swatch" style="background:{neutral.color}"></span>
			<span class="neutral-text">
				<strong>{neutral.value}%</strong>
				{neutral.label} — {$messages.analytics.neutralSeparate}
			</span>
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

	.seg-label {
		font-family: var(--mono);
		font-size: 0.68rem;
		font-weight: 500;
		pointer-events: none;
	}

	.tick {
		font-family: var(--mono);
		font-size: 0.62rem;
		fill: #5b6b80;
	}

	.tooltip {
		position: absolute;
		top: -6px;
		transform: translate(-50%, -100%);
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

	.tt-value {
		font-family: var(--mono);
		color: var(--sky);
	}

	.neutral-strip {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		margin-top: 0.85rem;
		padding-top: 0.7rem;
		border-top: 1px solid var(--line-l-2);
	}

	.neutral-swatch {
		width: 11px;
		height: 11px;
		margin-top: 0.2rem;
		flex: none;
	}

	.neutral-text {
		font-size: 0.8rem;
		line-height: 1.45;
		color: var(--ink-3);
	}

	.neutral-text strong {
		font-family: var(--mono);
		color: var(--ink);
	}
</style>
