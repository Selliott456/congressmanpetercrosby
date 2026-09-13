<script>
	import { inkOn } from '$lib/utils/chartColor';

	/**
	 * 100% stacked bars: one row per group, each splitting that whole group across the
	 * same responses in the same order. The first response anchors the left edge and
	 * the last anchors the right, so both read against a baseline down the rows — one
	 * candidate from each side, everything else in between.
	 *
	 * A value is printed inside its segment only when it fits; the rest are carried by
	 * the legend, the hover tooltip and the table view. Touching segments are separated
	 * by a 2px surface gap, never a stroke.
	 */

	/** @typedef {{ label: string; value: number; color: string }} Segment */
	/** @typedef {{ label: string; sublabel?: string; segments: Segment[] }} Row */

	/** @type {Row[]} */
	export let rows = [];
	/** Decimal places shown for values. @type {number} */
	export let digits = 1;
	/** @type {string} */
	export let ariaLabel = 'Stacked bar chart';

	/** Container width at which labels stack above their bar. */
	const COMPACT_AT = 520;
	/** Side label column and gap, in px — mirrored into CSS so the math matches the layout. */
	const LABEL_W = 176;
	const GAP = 16;
	/** Narrowest segment that holds a "30.7%" label with padding on both sides. */
	const MIN_LABEL_W = 46;

	let width = 720;

	$: compact = width < COMPACT_AT;
	/** The bar's own width — what an in-segment label has to fit inside. */
	$: barW = compact ? width : width - LABEL_W - GAP;
	$: fmt = (/** @type {number} */ v) => v.toFixed(digits);

	/** @type {{ label: string; value: number; x: number; y: number } | null} */
	let hovered = null;
	/** Measured tooltip width, used to keep it inside the card. */
	let tipW = 0;
	$: tipLeft = hovered
		? Math.min(Math.max(hovered.x, tipW / 2 + 4), Math.max(tipW / 2 + 4, width - tipW / 2 - 4))
		: 0;

	/** @param {Segment} seg @param {MouseEvent} event */
	function onEnter(seg, event) {
		const el = /** @type {HTMLElement} */ (event.currentTarget);
		const root = el.closest('.chart');
		if (!root) return;
		const box = el.getBoundingClientRect();
		const rootBox = root.getBoundingClientRect();
		hovered = {
			label: seg.label,
			value: seg.value,
			x: box.left + box.width / 2 - rootBox.left,
			y: box.top - rootBox.top
		};
	}
</script>

<div
	class="chart"
	class:compact
	bind:clientWidth={width}
	style="--label-w:{LABEL_W}px; --gap:{GAP}px"
>
	<div class="plot" role="img" aria-label={ariaLabel} on:mouseleave={() => (hovered = null)}>
		{#each rows as row}
			{@const total = row.segments.reduce((sum, s) => sum + s.value, 0)}
			<div class="row">
				<div class="label">
					<span class="label-main">{row.label}</span>
					{#if row.sublabel}<span class="label-sub">{row.sublabel}</span>{/if}
				</div>
				<div class="bar">
					{#each row.segments as seg}
						<span
							class="seg"
							style="flex:{seg.value} 1 0; background:{seg.color}"
							role="presentation"
							on:mouseenter={(e) => onEnter(seg, e)}
						>
							{#if (seg.value / total) * barW >= MIN_LABEL_W}
								<span class="seg-label" style="color:{inkOn(seg.color)}">{fmt(seg.value)}%</span>
							{/if}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	{#if hovered}
		<div class="tooltip" bind:clientWidth={tipW} style="left:{tipLeft}px; top:{hovered.y}px">
			<span class="tt-label">{hovered.label}</span>
			<span class="tt-value">{fmt(hovered.value)}%</span>
		</div>
	{/if}
</div>

<style>
	.chart {
		position: relative;
		width: 100%;
	}

	.row {
		display: grid;
		grid-template-columns: var(--label-w) minmax(0, 1fr);
		column-gap: var(--gap);
		align-items: center;
		padding: 0.5rem 0;
	}

	.compact .row {
		grid-template-columns: minmax(0, 1fr);
		row-gap: 0.4rem;
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
		font-family: var(--mono);
		font-size: 0.64rem;
		color: #5b6b80;
	}

	.bar {
		display: flex;
		gap: 2px;
		height: 24px;
	}

	.seg {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 0;
		cursor: default;
		transition: filter 0.12s ease;
	}

	/* Rounded data-ends on the bar's two outer edges only. */
	.seg:first-child {
		border-radius: 4px 0 0 4px;
	}

	.seg:last-child {
		border-radius: 0 4px 4px 0;
	}

	.seg:hover {
		filter: brightness(1.1);
	}

	.seg-label {
		font-family: var(--mono);
		font-size: 0.68rem;
		font-weight: 500;
		pointer-events: none;
	}

	.tooltip {
		position: absolute;
		transform: translate(-50%, calc(-100% - 8px));
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
</style>
