<script>
	import { messages } from '$lib/i18n/locale';

	/**
	 * Shared wrapper for every chart on /analytics: eyebrow, title, question
	 * wording, takeaway, legend, the chart itself, a source line, and a data-table
	 * toggle. The table is not optional polish — two steps of the diverging ramp
	 * sit below 3:1 contrast, and the dataviz rules require a relief channel
	 * (visible labels + a table view) wherever that's true.
	 */

	/** Small uppercase kicker above the title. @type {string | undefined} */
	export let eyebrow = undefined;
	/** Chart title. @type {string} */
	export let title;
	/** Verbatim survey question, shown in quotes under the title. @type {string | undefined} */
	export let question = undefined;
	/** One-sentence plain-language finding. @type {string | undefined} */
	export let takeaway = undefined;
	/** Source / methodology line. @type {string | undefined} */
	export let source = undefined;
	/** Legend entries. @type {{ label: string; color: string }[]} */
	export let legend = [];
	/** Column headers for the data table. @type {string[]} */
	export let tableColumns = [];
	/** Table rows, as arrays of cell strings. @type {(string | number)[][]} */
	export let tableRows = [];

	let showTable = false;
</script>

<figure class="frame">
	<figcaption class="frame-head">
		{#if eyebrow}<p class="frame-eyebrow">{eyebrow}</p>{/if}
		<h3 class="frame-title">{title}</h3>
		{#if question}
			<p class="frame-question">“{question}”</p>
		{/if}
		{#if takeaway}
			<p class="frame-takeaway">{takeaway}</p>
		{/if}
	</figcaption>

	{#if legend.length > 1}
		<ul class="legend">
			{#each legend as item}
				<li class="legend-item">
					<span class="legend-swatch" style="background:{item.color}"></span>
					<span class="legend-label">{item.label}</span>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="frame-plot">
		<slot />
	</div>

	<div class="frame-foot">
		{#if source}<p class="frame-source">{source}</p>{/if}
		{#if tableRows.length}
			<button
				type="button"
				class="table-toggle"
				aria-expanded={showTable}
				on:click={() => (showTable = !showTable)}
			>
				{showTable ? $messages.analytics.hideTable : $messages.analytics.showTable}
			</button>
		{/if}
	</div>

	{#if showTable && tableRows.length}
		<div class="table-wrap">
			<table class="data-table">
				<thead>
					<tr>
						{#each tableColumns as col}<th scope="col">{col}</th>{/each}
					</tr>
				</thead>
				<tbody>
					{#each tableRows as row}
						<tr>
							{#each row as cell, i}
								{#if i === 0}
									<th scope="row">{cell}</th>
								{:else}
									<td>{cell}</td>
								{/if}
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</figure>

<style>
	.frame {
		margin: 0;
		padding: 1.75rem;
		background: var(--paper);
		border: 1px solid var(--line-l);
	}

	.frame-head {
		margin-bottom: 1.25rem;
	}

	.frame-eyebrow {
		margin: 0 0 0.5rem;
		font-family: var(--mono);
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--blue);
	}

	.frame-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.15rem, 2.4vw, 1.5rem);
		line-height: 1.15;
		color: var(--ink);
	}

	.frame-question {
		margin: 0.6rem 0 0;
		font-family: var(--serif);
		font-size: 0.95rem;
		line-height: 1.45;
		color: var(--ink-3);
	}

	.frame-takeaway {
		margin: 0.75rem 0 0;
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--ink);
		max-width: 62ch;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.1rem;
		margin: 0 0 1.1rem;
		padding: 0;
		list-style: none;
	}

	.legend-item {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	.legend-swatch {
		width: 11px;
		height: 11px;
		flex: none;
	}

	.legend-label {
		font-size: 0.8rem;
		color: var(--ink-3);
	}

	/* No overflow container: the charts size themselves to the container at every
	   breakpoint (verified: no clipped labels), and `overflow-x: auto` would compute
	   `overflow-y` to `auto` too — which clipped tooltips at the plot's edges. */
	.frame-plot {
		width: 100%;
	}

	.frame-foot {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 1.25rem;
		padding-top: 0.9rem;
		border-top: 1px solid var(--line-l-2);
	}

	.frame-source {
		margin: 0;
		flex: 1 1 24ch;
		font-size: 0.72rem;
		line-height: 1.5;
		color: #5b6b80;
	}

	.table-toggle {
		flex: none;
		background: none;
		border: 1px solid var(--line-l);
		padding: 0.35rem 0.7rem;
		font-family: var(--mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--blue);
		cursor: pointer;
	}

	.table-toggle:hover {
		background: var(--paper-2);
	}

	.table-wrap {
		margin-top: 1rem;
		overflow-x: auto;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.82rem;
	}

	.data-table th,
	.data-table td {
		padding: 0.45rem 0.7rem;
		text-align: left;
		border-bottom: 1px solid var(--line-l-2);
	}

	.data-table thead th {
		font-family: var(--mono);
		font-size: 0.68rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.data-table td {
		font-variant-numeric: tabular-nums;
		color: var(--ink);
	}

	.data-table tbody th {
		font-weight: 500;
		color: var(--ink);
	}

	/* On phones the card runs edge-to-edge: side borders drop (it reads as a band,
	   not a floating card) and the gutter comes from `--mobile-margin`, so the
	   plot gets back the ~40px the layout gutter was taking. */
	@media (max-width: 768px) {
		.frame {
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
			padding: 1.25rem var(--mobile-margin);
			border-left: 0;
			border-right: 0;
		}

		/* The figure breaks out past the text column to the screen edge — the
		   editorial pattern: prose stays measured, the chart takes the full width.
		   The charts carry their own internal margins, so marks don't touch the edge. */
		.frame-plot {
			margin-left: calc(-0.5 * var(--mobile-margin));
			margin-right: calc(-0.5 * var(--mobile-margin));
		}
	}
</style>
