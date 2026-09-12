<script>
	/**
	 * Analytics style guide — the design system for /analytics.
	 *
	 * Internal reference, like `style_guide.html` at the repo root: English-only and
	 * `noindex`. It documents the chart system rather than presenting campaign data,
	 * so it is deliberately outside the i18n dictionaries.
	 *
	 * Every chart below renders the REAL components with illustrative sample values,
	 * so the page can never drift from what /analytics actually ships. Sample numbers
	 * are labeled as such and are not polling results.
	 */
	import Rail from '$lib/components/Rail.svelte';
	import ChartFrame from '$lib/components/analytics/ChartFrame.svelte';
	import DivergingStackedBar from '$lib/components/analytics/DivergingStackedBar.svelte';
	import DotPlot from '$lib/components/analytics/DotPlot.svelte';
	import NetApprovalBar from '$lib/components/analytics/NetApprovalBar.svelte';
	import { SCALE_COLORS } from '$lib/data/analytics';

	const SURFACE = '#F7FAFC';

	const sections = [
		{ id: 'color', label: 'Color' },
		{ id: 'forms', label: 'Chart forms' },
		{ id: 'figures', label: 'KPI elements' },
		{ id: 'marks', label: 'Marks & anatomy' },
		{ id: 'interaction', label: 'Interaction' },
		{ id: 'responsive', label: 'Responsive' },
		{ id: 'rules', label: 'Rules' }
	];

	/** The diverging scale, in stack order from the positive pole outward. */
	const divergingScale = [
		{
			token: 'posStrong',
			hex: SCALE_COLORS.posStrong,
			role: 'Positive, strong',
			use: 'Outermost positive segment (“Very satisfied”)',
			contrast: '6.14:1'
		},
		{
			token: 'posSoft',
			hex: SCALE_COLORS.posSoft,
			role: 'Positive, soft',
			use: 'Inner positive segment, nearest the center',
			contrast: '2.33:1'
		},
		{
			token: 'negSoft',
			hex: SCALE_COLORS.negSoft,
			role: 'Negative, soft',
			use: 'Inner negative segment, nearest the center',
			contrast: '2.06:1'
		},
		{
			token: 'negStrong',
			hex: SCALE_COLORS.negStrong,
			role: 'Negative, strong',
			use: 'Outermost negative segment (“Very dissatisfied”)',
			contrast: '5.20:1'
		},
		{
			token: 'neutral',
			hex: SCALE_COLORS.neutral,
			role: 'Neutral',
			use: 'Responses on neither arm (“Unsure”)',
			contrast: '4.10:1'
		}
	];

	/** Categorical hues for voter groups. Fixed order — never cycled or reassigned. */
	const groupScale = [
		{ token: 'all', hex: '#2E5FA0', role: 'Slot 1', use: 'All district voters', contrast: '6.14:1' },
		{
			token: 'republican',
			hex: '#E8A33D',
			role: 'Slot 2',
			use: 'Registered Republicans',
			contrast: '2.06:1'
		},
		{
			token: 'unaffiliated',
			hex: '#2F7D46',
			role: 'Slot 3',
			use: 'Unaffiliated & independent',
			contrast: '4.84:1'
		}
	];

	const divergingChecks = [
		{ check: 'Lightness band', result: 'Pass', detail: 'All four steps inside OKLCH L 0.43–0.77.' },
		{ check: 'Chroma floor', result: 'Pass', detail: 'All four at or above C 0.10, so no step reads as gray.' },
		{
			check: 'CVD separation',
			result: 'Pass',
			detail: 'Worst adjacent pair ΔE 21.3 under protanopia (target ≥ 8), 22.9 under tritanopia.'
		},
		{
			check: 'Normal-vision floor',
			result: 'Pass',
			detail: 'Worst adjacent pair ΔE 23.8 unsimulated (hard gate ≥ 15).'
		},
		{
			check: 'Contrast vs surface',
			result: 'Relief required',
			detail:
				'The two light steps sit at 2.33:1 and 2.06:1, below the 3:1 mark target — permitted only alongside a relief channel. Every chart ships direct value labels and a full data table.'
		}
	];

	const groupChecks = [
		{ check: 'Lightness band', result: 'Pass', detail: 'All three inside OKLCH L 0.43–0.77.' },
		{ check: 'Chroma floor', result: 'Pass', detail: 'All three at or above C 0.10.' },
		{
			check: 'CVD separation',
			result: 'Pass',
			detail: 'Worst all-pairs ΔE 18.0 under deuteranopia — tested all-pairs, not just neighbors.'
		},
		{
			check: 'Normal-vision floor',
			result: 'Pass',
			detail: 'Worst all-pairs ΔE 19.0 unsimulated.'
		},
		{
			check: 'Contrast vs surface',
			result: 'Relief required',
			detail: 'Amber sits at 2.06:1; carried by direct labels, the legend, and the data table.'
		}
	];

	// ── Illustrative sample data for the live component demos ──────────────────
	/** @type {import('$lib/data/analytics').LikertSegment[]} */
	const demoLikert = [
		{ label: 'Strongly agree', value: 12, color: SCALE_COLORS.posStrong, side: 'pos' },
		{ label: 'Agree', value: 30, color: SCALE_COLORS.posSoft, side: 'pos' },
		{ label: 'Disagree', value: 26, color: SCALE_COLORS.negSoft, side: 'neg' },
		{ label: 'Strongly disagree', value: 21, color: SCALE_COLORS.negStrong, side: 'neg' },
		{ label: 'Unsure', value: 11, color: SCALE_COLORS.neutral, side: 'neutral' }
	];

	const demoLollipop = [
		{ label: 'Group A', points: [{ series: 'Group A', value: 64, color: '#2E5FA0' }] },
		{
			label: 'Group B',
			sublabel: 'With a supporting line',
			points: [{ series: 'Group B', value: 41, color: '#2E5FA0' }]
		},
		{ label: 'Group C', points: [{ series: 'Group C', value: 28, color: '#2E5FA0' }] }
	];

	const demoGrouped = [
		{
			label: 'Measure one',
			sublabel: 'Three series on a shared scale',
			points: [
				{ series: 'All', value: 72, color: '#2E5FA0' },
				{ series: 'Group B', value: 66, color: '#E8A33D' },
				{ series: 'Group C', value: 74, color: '#2F7D46' }
			]
		},
		{
			label: 'Measure two',
			points: [
				{ series: 'All', value: 55, color: '#2E5FA0' },
				{ series: 'Group B', value: 49, color: '#E8A33D' },
				{ series: 'Group C', value: 58, color: '#2F7D46' }
			]
		}
	];

	const demoNet = [
		{ id: 'd1', name: 'Example A', role: 'Sample row', approve: 46, disapprove: 40, net: 6 },
		{ id: 'd2', name: 'Example B', role: 'Sample row', approve: 41, disapprove: 49, net: -8 },
		{ id: 'd3', name: 'Example C', role: 'Sample row', approve: 33, disapprove: 55, net: -22 }
	];

	const markSpecs = [
		{ mark: 'Bar / column', spec: '≤ 24px thick; 4px rounded outer data-end, square at the baseline' },
		{ mark: 'Stacked segments', spec: '2px gap in the surface color between touching segments' },
		{ mark: 'Dot / marker', spec: 'r = 6 (≥ 8px diameter), with a 2px ring in the surface color' },
		{ mark: 'Line / stem', spec: '2px, round cap; lollipop stems at 22–28% opacity' },
		{ mark: 'Gridlines & axes', spec: 'Hairline 1px, solid, one step off the surface — never dashed' },
		{ mark: 'Zero baseline', spec: '1px in ink, drawn above the bars so the reference stays readable' }
	];

	const typeSpecs = [
		{ use: 'Chart title', font: 'Archivo italic 900 (--display)' },
		{ use: 'Survey question', font: 'Source Serif 4 roman (--serif)' },
		{ use: 'Takeaway & body', font: 'Inter (--sans)' },
		{ use: 'Axis ticks, value labels, meta', font: 'JetBrains Mono (--mono)' },
		{ use: 'Stat / hero figures', font: 'Inter 700, proportional figures' },
		{ use: 'Table columns of numbers', font: 'Inter with tabular-nums' }
	];

	const rules = [
		{
			kind: 'do',
			text: 'Publish a source, field dates, sample size, and margin of error with every figure.'
		},
		{
			kind: 'do',
			text: 'Ship direct value labels and a data table on every chart — they are the relief channel the light steps depend on.'
		},
		{
			kind: 'do',
			text: 'Keep a diverging scale symmetric around its baseline when the data spans both signs, so magnitudes stay comparable.'
		},
		{
			kind: 'do',
			text: 'Give each series its own lane when values cluster too tightly to separate at the rendered width.'
		},
		{
			kind: 'dont',
			text: 'Never plot a modeled, projected, or illustrative number alongside sourced data on the public page.'
		},
		{
			kind: 'dont',
			text: 'Never use two y-scales on one chart. Two measures of different scale means two charts.'
		},
		{
			kind: 'dont',
			text: 'Never zoom an axis to exaggerate a spread the chart is describing as narrow.'
		},
		{
			kind: 'dont',
			text: 'Never rely on hue alone for identity — a legend plus direct labels always accompany color.'
		},
		{
			kind: 'dont',
			text: 'Never place a neutral “unsure” response on either arm of a diverging scale.'
		}
	];
</script>

<svelte:head>
	<title>Analytics style guide — Peter Crosby for Congress</title>
	<meta name="description" content="The chart and color system behind the analytics pages." />
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="sg">
	<header class="masthead">
		<Rail />
		<div class="inner">
			<p class="eyebrow">Internal reference</p>
			<h1 class="page-title">Analytics style guide</h1>
			<p class="lede">
				The chart system behind <a href="/analytics">the analytics pages</a> — color, forms,
				figures, and the accessibility standard each one is held to. Every chart below is the
				live component rendered with illustrative sample values, not polling results.
			</p>
		</div>
	</header>

	<div class="masthead-rail"><Rail /></div>

	<nav class="jump" aria-label="On this page">
		<div class="jump-inner">
			<span class="jump-label">On this page</span>
			<ul class="jump-list">
				{#each sections as s}
					<li><a class="jump-link" href={'#' + s.id}>{s.label}</a></li>
				{/each}
			</ul>
		</div>
	</nav>

	<!-- ── Color ───────────────────────────────────────────────── -->
	<section class="section" id="color">
		<h2 class="section-title">Color</h2>
		<p class="section-lede">
			Color carries one job per scale and is verified against a fixed set of checks rather than
			chosen by eye. All measurements below are taken against the chart surface,
			<code>{SURFACE}</code>, and ΔE figures are Euclidean distance in OKLab ×100 under
			Machado-Oliveira-Fernandes CVD simulation at full severity.
		</p>

		<h3 class="sub-title">Diverging scale — ordered responses</h3>
		<p class="body">
			Used wherever responses run along a single agree-to-disagree axis. Two hue families
			diverge from a shared center, each darkening outward so intensity is legible as lightness
			as well as hue, with a hue-free gray reserved for responses that belong to neither arm.
		</p>

		<div class="swatch-grid">
			{#each divergingScale as s}
				<article class="swatch">
					<div class="swatch-chip" style="background:{s.hex}"></div>
					<p class="swatch-role">{s.role}</p>
					<p class="swatch-hex">{s.hex}</p>
					<p class="swatch-use">{s.use}</p>
					<p class="swatch-meta">Contrast {s.contrast}</p>
				</article>
			{/each}
		</div>

		<div class="why">
			<h4 class="why-title">Why this scale</h4>
			<ul class="why-list">
				<li>
					<strong>The poles separate on the blue–yellow channel.</strong> Blue against amber
					stays distinct under both protanopia and deuteranopia, the two most common forms of
					color-vision deficiency. A diverging pair that separates only on the red–green
					channel collapses into one hue for those viewers.
				</li>
				<li>
					<strong>Each arm darkens outward.</strong> Intensity is encoded twice — hue family
					for direction, lightness for strength — so the order survives grayscale printing and
					forced-colors mode.
				</li>
				<li>
					<strong>The neutral is deliberately hue-free.</strong> A gray midpoint keeps an
					“unsure” response from reading as leaning toward either side. That category is also
					laid out apart from the axis rather than stacked past one arm.
				</li>
				<li>
					<strong>The light steps are backed by a relief channel.</strong> Two steps fall below
					the 3:1 contrast target against the surface. That is only permissible when the value
					is legible another way, so every chart carries direct labels on the marks and a full
					data table beneath.
				</li>
			</ul>
		</div>

		<div class="table-wrap">
			<table class="check-table">
				<caption>Diverging scale — verification, adjacent pairs</caption>
				<thead>
					<tr><th scope="col">Check</th><th scope="col">Result</th><th scope="col">Measurement</th></tr>
				</thead>
				<tbody>
					{#each divergingChecks as c}
						<tr>
							<th scope="row">{c.check}</th>
							<td><span class="pill" class:pill-warn={c.result !== 'Pass'}>{c.result}</span></td>
							<td>{c.detail}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<h3 class="sub-title">Categorical scale — voter groups</h3>
		<p class="body">
			Used when the series themselves are the subject and no order is implied. Hues are assigned
			in a fixed order and never cycled or reassigned when a series is filtered out, so a color
			always means the same group.
		</p>

		<div class="swatch-grid">
			{#each groupScale as s}
				<article class="swatch">
					<div class="swatch-chip" style="background:{s.hex}"></div>
					<p class="swatch-role">{s.role}</p>
					<p class="swatch-hex">{s.hex}</p>
					<p class="swatch-use">{s.use}</p>
					<p class="swatch-meta">Contrast {s.contrast}</p>
				</article>
			{/each}
		</div>

		<div class="why">
			<h4 class="why-title">Why this scale</h4>
			<ul class="why-list">
				<li>
					<strong>Verified all-pairs, not just neighbors.</strong> Dots in a grouped plot can
					land beside each other in any combination, so every pair is tested rather than only
					adjacent ones. The weakest pair holds ΔE 18.0 under deuteranopia.
				</li>
				<li>
					<strong>Three is the ceiling for this form.</strong> All-pairs separation is a
					strictly harder test and caps how many series a dot plot can carry. A fourth group
					would be folded into “Other” or split into small multiples rather than given a new
					hue.
				</li>
				<li>
					<strong>Identity never rests on color alone.</strong> A legend is always present, and
					values are labeled directly on the marks, so the mapping survives for anyone who
					cannot separate the hues.
				</li>
			</ul>
		</div>

		<div class="table-wrap">
			<table class="check-table">
				<caption>Categorical scale — verification, all pairs</caption>
				<thead>
					<tr><th scope="col">Check</th><th scope="col">Result</th><th scope="col">Measurement</th></tr>
				</thead>
				<tbody>
					{#each groupChecks as c}
						<tr>
							<th scope="row">{c.check}</th>
							<td><span class="pill" class:pill-warn={c.result !== 'Pass'}>{c.result}</span></td>
							<td>{c.detail}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- ── Chart forms ──────────────────────────────────────────── -->
	<section class="section" id="forms">
		<h2 class="section-title">Chart forms</h2>
		<p class="section-lede">
			The data's job picks the form. Sample values below are illustrative.
		</p>

		<ChartFrame
			eyebrow="Form · diverging stacked bar"
			title="Ordered responses"
			question="Sample Likert question with a neutral option"
			takeaway="For agree-to-disagree data. Responses diverge from a shared center with the softest category nearest it, so the balance between the two arms is the first thing read. A neutral option is shown apart from the axis."
			source="Illustrative sample values — not polling results."
			legend={demoLikert.map((s) => ({ label: s.label, color: s.color }))}
			tableColumns={['Response', 'Share']}
			tableRows={demoLikert.map((s) => [s.label, `${s.value}%`])}
		>
			<DivergingStackedBar segments={demoLikert} ariaLabel="Sample diverging stacked bar" />
		</ChartFrame>

		<ChartFrame
			eyebrow="Form · lollipop"
			title="One value per row"
			takeaway="For comparing magnitude across a handful of named rows. A single hue — coloring these by value would spend the identity channel re-encoding what position already shows."
			source="Illustrative sample values — not polling results."
			tableColumns={['Row', 'Value']}
			tableRows={demoLollipop.map((r) => [r.label, `${r.points[0].value}%`])}
		>
			<DotPlot rows={demoLollipop} max={80} ariaLabel="Sample lollipop chart" />
		</ChartFrame>

		<ChartFrame
			eyebrow="Form · grouped dot plot"
			title="Several series per row"
			takeaway="For comparing the same measure across groups. A connecting line spans the range so the spread reads at a glance; below 520px each series moves to its own lane so tightly-clustered dots never overlap."
			source="Illustrative sample values — not polling results."
			legend={[
				{ label: 'All', color: '#2E5FA0' },
				{ label: 'Group B', color: '#E8A33D' },
				{ label: 'Group C', color: '#2F7D46' }
			]}
			tableColumns={['Measure', 'All', 'Group B', 'Group C']}
			tableRows={demoGrouped.map((r) => [
				r.label,
				`${r.points[0].value}%`,
				`${r.points[1].value}%`,
				`${r.points[2].value}%`
			])}
		>
			<DotPlot rows={demoGrouped} max={100} ariaLabel="Sample grouped dot plot" />
		</ChartFrame>

		<ChartFrame
			eyebrow="Form · diverging bar"
			title="Values around a baseline"
			takeaway="For net figures that can fall either side of zero. The axis reserves only the side the data uses, and zero stays the baseline so magnitudes read against it."
			source="Illustrative sample values — not polling results."
			tableColumns={['Row', 'Approve', 'Disapprove', 'Net']}
			tableRows={demoNet.map((r) => [
				r.name,
				`${r.approve}%`,
				`${r.disapprove}%`,
				r.net > 0 ? `+${r.net}` : `${r.net}`
			])}
		>
			<NetApprovalBar rows={demoNet} ariaLabel="Sample diverging bar chart" />
		</ChartFrame>

		<div class="why">
			<h4 class="why-title">Choosing between them</h4>
			<ul class="why-list">
				<li><strong>Ordered-scale share</strong> (agree ↔ disagree) → diverging stacked bar.</li>
				<li><strong>Magnitude across named rows</strong> → lollipop, one hue.</li>
				<li><strong>The same measure across groups</strong> → grouped dot plot, categorical hues.</li>
				<li><strong>Above or below a baseline</strong> → diverging bar around zero.</li>
				<li><strong>A single headline number</strong> → a stat tile or hero figure, never a one-bar chart.</li>
			</ul>
		</div>
	</section>

	<!-- ── KPI elements ─────────────────────────────────────────── -->
	<section class="section" id="figures">
		<h2 class="section-title">KPI elements</h2>
		<p class="section-lede">
			When the form is a number rather than a chart. Figures use the sans face with proportional
			numerals; tabular figures are reserved for columns that must align vertically.
		</p>

		<h3 class="sub-title">Hero figure</h3>
		<p class="body">
			One per view, and only for the single number a page leads with. It sits with the dataset it
			describes, alongside that dataset's methodology.
		</p>
		<div class="demo-panel">
			<div class="snapshot">
				<div class="snapshot-head">
					<p class="hero-figure">57<span class="hero-unit">%</span></p>
					<div class="hero-copy">
						<p class="hero-label">Short statement of what the figure measures</p>
						<p class="hero-sub">A qualifying line beneath it</p>
					</div>
				</div>
				<dl class="meta-row">
					<div class="meta"><dt>Field dates</dt><dd>Aug 3–17, 2026</dd></div>
					<div class="meta"><dt>Sample</dt><dd>n = 565</dd></div>
					<div class="meta"><dt>Margin of error</dt><dd>±4%</dd></div>
					<div class="meta"><dt>Geography</dt><dd>UT-02</dd></div>
				</dl>
			</div>
		</div>

		<h3 class="sub-title">Stat tiles</h3>
		<p class="body">
			A row of supporting figures. Label in sentence case, an optional qualifying line, and the
			unit set smaller and raised so the numeral stays dominant.
		</p>
		<div class="demo-panel">
			<div class="kpi-row">
				{#each [{ v: 70, l: 'Primary label for the figure', s: 'Qualifying detail' }, { v: 33, l: 'Second supporting figure', s: 'Qualifying detail' }, { v: 79, l: 'Third supporting figure', s: 'Qualifying detail' }] as k}
					<article class="kpi">
						<p class="kpi-value">{k.v}<span class="kpi-unit">%</span></p>
						<p class="kpi-label">{k.l}</p>
						<p class="kpi-sub">{k.s}</p>
					</article>
				{/each}
			</div>
		</div>

		<h3 class="sub-title">Operational counts</h3>
		<p class="body">
			Figures that are counted rather than surveyed take the green accent and an explicit note
			that they are not survey results, so the two kinds of number are never confused.
		</p>
		<div class="demo-panel">
			<div class="ground-grid">
				{#each [{ v: '28', l: 'Counted item', n: 'Where it was counted' }, { v: '4', l: 'Counted item', n: 'Where it was counted' }, { v: '400+', l: 'Counted item', n: 'Where it was counted' }] as g}
					<article class="ground-stat">
						<p class="ground-value">{g.v}</p>
						<p class="ground-label">{g.l}</p>
						<p class="ground-sub">{g.n}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── Marks & anatomy ──────────────────────────────────────── -->
	<section class="section" id="marks">
		<h2 class="section-title">Marks &amp; anatomy</h2>
		<p class="section-lede">
			Fixed across every chart. The data is the only element allowed to be loud; grid, axes, and
			labels stay recessive.
		</p>

		<div class="table-wrap">
			<table class="check-table">
				<caption>Mark specifications</caption>
				<thead>
					<tr><th scope="col">Mark</th><th scope="col">Specification</th></tr>
				</thead>
				<tbody>
					{#each markSpecs as m}
						<tr><th scope="row">{m.mark}</th><td>{m.spec}</td></tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="why">
			<h4 class="why-title">Separation is done with the surface, not with strokes</h4>
			<ul class="why-list">
				<li>
					A <strong>2px gap in the surface color</strong> separates touching stacked segments
					and adjacent bars. Neighboring steps read as distinct because of the gap, not because
					of an outline.
				</li>
				<li>
					Dots carry a <strong>2px ring in the surface color</strong> so they stay legible
					where they overlap a line or each other. The ring is part of the hit target.
				</li>
				<li>
					A border is never drawn around a mark to separate it — that adds ink that isn't data.
				</li>
			</ul>
		</div>

		<h3 class="sub-title">Type in charts</h3>
		<div class="table-wrap">
			<table class="check-table">
				<caption>Typographic roles</caption>
				<thead>
					<tr><th scope="col">Use</th><th scope="col">Face</th></tr>
				</thead>
				<tbody>
					{#each typeSpecs as ty}
						<tr><th scope="row">{ty.use}</th><td>{ty.font}</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="body">
			Text never wears a data color. Values, labels, legends, and axis text use ink tokens; the
			colored mark beside them carries the identity. The one exception is a label set inside a
			filled segment, where the text takes white or ink by the fill's luminance.
		</p>
	</section>

	<!-- ── Interaction ──────────────────────────────────────────── -->
	<section class="section" id="interaction">
		<h2 class="section-title">Interaction</h2>
		<p class="section-lede">Hover the marks in the demos above to see both behaviors.</p>
		<div class="why">
			<h4 class="why-title">Tooltips</h4>
			<ul class="why-list">
				<li>Every mark carries a tooltip naming its series and exact value.</li>
				<li>
					Placement is edge-aware: the tooltip measures itself, clamps horizontally so it can
					never run past the card, and flips below its mark when there is not room above.
				</li>
				<li>Tooltips are supplementary. Every value they show is also on the mark or in the table.</li>
			</ul>
			<h4 class="why-title">Data table</h4>
			<ul class="why-list">
				<li>
					Every chart ships a table toggle. This is the relief channel the light color steps
					depend on, not an optional extra.
				</li>
				<li>
					Tables use real <code>th</code> scopes for rows and columns, and tabular numerals so
					figures align.
				</li>
			</ul>
		</div>
	</section>

	<!-- ── Responsive ───────────────────────────────────────────── -->
	<section class="section" id="responsive">
		<h2 class="section-title">Responsive behavior</h2>
		<p class="section-lede">
			Charts are sized by their container, never by a fixed width. Narrow the window to watch each
			of these engage.
		</p>
		<div class="why">
			<ul class="why-list">
				<li>
					<strong>Row labels stack above the plot below 520px.</strong> A fixed side column
					leaves too little track on a phone to place marks accurately, so the label moves above
					and the full width goes to the data.
				</li>
				<li>
					<strong>Series dodge into lanes when they cluster.</strong> Where values sit closer
					together than the marks are wide, each series takes its own lane and its own label
					rather than compressing into an unreadable cluster.
				</li>
				<li>
					<strong>Inline labels are suppressed rather than clipped.</strong> A segment too narrow
					for its value drops the label; the legend and table carry it. Text is never cropped by
					its own mark.
				</li>
				<li>
					<strong>Cards run edge-to-edge on phones.</strong> Side borders drop and the figure
					breaks past the text column, so prose stays measured while the chart takes the width.
				</li>
			</ul>
		</div>
	</section>

	<!-- ── Rules ────────────────────────────────────────────────── -->
	<section class="section" id="rules">
		<h2 class="section-title">Rules</h2>
		<div class="rules">
			<div class="rule-col">
				<h3 class="rule-head rule-head-do">Always</h3>
				<ul class="rule-list">
					{#each rules.filter((r) => r.kind === 'do') as r}
						<li>{r.text}</li>
					{/each}
				</ul>
			</div>
			<div class="rule-col">
				<h3 class="rule-head rule-head-dont">Never</h3>
				<ul class="rule-list">
					{#each rules.filter((r) => r.kind === 'dont') as r}
						<li>{r.text}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
</main>

<style>
	.sg {
		width: 100%;
	}

	.masthead {
		background: var(--ink-deep);
		color: var(--paper);
	}

	.inner,
	.section {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.inner {
		padding-top: 2.75rem;
		padding-bottom: 3rem;
	}

	.eyebrow {
		margin: 0 0 0.85rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.82rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--sky);
	}

	.page-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(2rem, 5vw, 3.25rem);
		line-height: 1.03;
	}

	.lede {
		margin: 1.15rem 0 0;
		max-width: 64ch;
		font-family: var(--serif);
		font-size: clamp(1rem, 1.7vw, 1.15rem);
		line-height: 1.6;
		color: var(--paper-3);
	}

	.lede a {
		color: var(--sky);
	}

	.masthead-rail {
		line-height: 0;
	}

	/* Jump ribbon */
	.jump {
		background: var(--blue);
		border-bottom: 1px solid rgba(9, 27, 54, 0.2);
	}

	.jump-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0.55rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 1.625rem;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.jump-inner::-webkit-scrollbar {
		display: none;
	}

	.jump-label {
		flex-shrink: 0;
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.85);
	}

	.jump-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1.5rem;
		flex-wrap: nowrap;
		flex-shrink: 0;
	}

	.jump-link {
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.82);
		text-decoration: none;
		white-space: nowrap;
	}

	.jump-link:hover {
		color: var(--paper);
	}

	/* Sections */
	.section {
		padding-top: 3rem;
		padding-bottom: 1rem;
		scroll-margin-top: 6rem;
	}

	.section-title {
		margin: 0 0 1rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.5rem, 3vw, 2rem);
		color: var(--ink);
	}

	.sub-title {
		margin: 2.25rem 0 0.6rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.15rem;
		color: var(--ink);
	}

	.section-lede {
		margin: 0 0 1.5rem;
		max-width: 72ch;
		font-size: 0.98rem;
		line-height: 1.6;
		color: var(--ink);
	}

	.body {
		margin: 0 0 1.25rem;
		max-width: 72ch;
		font-size: 0.92rem;
		line-height: 1.6;
		color: #48586e;
	}

	code {
		font-family: var(--mono);
		font-size: 0.85em;
		background: var(--paper-2);
		padding: 0.1em 0.35em;
	}

	/* Swatches */
	.swatch-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1px;
		background: var(--line-l);
		border: 1px solid var(--line-l);
		margin-bottom: 1.5rem;
	}

	.swatch {
		background: var(--paper);
		padding: 1rem 1.1rem 1.15rem;
	}

	.swatch-chip {
		height: 56px;
		margin-bottom: 0.8rem;
	}

	.swatch-role {
		margin: 0;
		font-size: 0.86rem;
		font-weight: 600;
		color: var(--ink);
	}

	.swatch-hex {
		margin: 0.2rem 0 0;
		font-family: var(--mono);
		font-size: 0.78rem;
		color: var(--blue);
	}

	.swatch-use {
		margin: 0.5rem 0 0;
		font-size: 0.78rem;
		line-height: 1.45;
		color: #5b6b80;
	}

	.swatch-meta {
		margin: 0.4rem 0 0;
		font-family: var(--mono);
		font-size: 0.68rem;
		color: #5b6b80;
	}

	/* Rationale blocks */
	.why {
		margin: 1.5rem 0;
		padding: 1.6rem 1.75rem;
		background: var(--paper-2);
		border-left: 3px solid var(--blue);
	}

	.why-title {
		margin: 0 0 0.85rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.05rem;
		color: var(--ink);
	}

	.why-title:not(:first-child) {
		margin-top: 1.5rem;
	}

	.why-list {
		margin: 0;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.7rem;
	}

	.why-list li {
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--ink);
		max-width: 74ch;
	}

	.why-list strong {
		color: var(--blue);
	}

	/* Tables */
	.table-wrap {
		overflow-x: auto;
		margin-bottom: 1.5rem;
	}

	.check-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.86rem;
		border: 1px solid var(--line-l);
	}

	.check-table caption {
		text-align: left;
		font-family: var(--mono);
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #5b6b80;
		padding-bottom: 0.55rem;
	}

	.check-table th,
	.check-table td {
		padding: 0.6rem 0.85rem;
		text-align: left;
		border-bottom: 1px solid var(--line-l-2);
		vertical-align: top;
	}

	.check-table thead th {
		font-family: var(--mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-3);
		background: var(--paper-2);
	}

	.check-table tbody th {
		font-weight: 600;
		color: var(--ink);
		white-space: nowrap;
	}

	.check-table td {
		color: #48586e;
		line-height: 1.55;
	}

	.pill {
		display: inline-block;
		font-family: var(--mono);
		font-size: 0.64rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 0.2rem 0.5rem;
		background: rgba(35, 89, 38, 0.12);
		color: var(--green);
		white-space: nowrap;
	}

	.pill-warn {
		background: rgba(169, 80, 28, 0.12);
		color: #a9501c;
	}

	/* Demo panels for the figure elements */
	.demo-panel {
		margin-bottom: 1.5rem;
	}

	.snapshot {
		border: 1px solid var(--line-l);
		border-left: 3px solid var(--blue);
		background: var(--paper);
		padding: 1.6rem 1.75rem;
	}

	.snapshot-head {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		flex-wrap: wrap;
	}

	.hero-figure {
		margin: 0;
		font-family: var(--sans);
		font-weight: 700;
		font-size: clamp(3rem, 7vw, 4.5rem);
		line-height: 0.9;
		letter-spacing: -0.03em;
		color: var(--blue);
	}

	.hero-unit {
		font-size: 0.45em;
		margin-left: 0.05em;
		vertical-align: super;
	}

	.hero-copy {
		flex: 1 1 20ch;
	}

	.hero-label {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--ink);
	}

	.hero-sub {
		margin: 0.3rem 0 0;
		font-size: 0.88rem;
		color: #5b6b80;
	}

	.meta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1.75rem;
		margin: 1.4rem 0 0;
		padding-top: 1.1rem;
		border-top: 1px solid var(--line-l-2);
	}

	.meta dt {
		font-family: var(--mono);
		font-size: 0.62rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--blue);
	}

	.meta dd {
		margin: 0.25rem 0 0;
		font-family: var(--mono);
		font-size: 0.92rem;
		color: var(--ink);
	}

	.kpi-row,
	.ground-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1px;
		background: var(--line-l);
		border: 1px solid var(--line-l);
	}

	.kpi,
	.ground-stat {
		background: var(--paper);
		padding: 1.4rem 1.35rem;
	}

	.kpi-value {
		margin: 0;
		font-family: var(--sans);
		font-weight: 700;
		font-size: 2.6rem;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--ink);
	}

	.kpi-unit {
		font-size: 0.5em;
		vertical-align: super;
		color: var(--blue);
	}

	.kpi-label,
	.ground-label {
		margin: 0.7rem 0 0;
		font-size: 0.92rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--ink);
	}

	.kpi-sub,
	.ground-sub {
		margin: 0.3rem 0 0;
		font-size: 0.8rem;
		line-height: 1.45;
		color: #5b6b80;
	}

	.ground-value {
		margin: 0;
		font-family: var(--sans);
		font-weight: 700;
		font-size: 2.1rem;
		line-height: 1;
		color: var(--green);
	}

	/* Rules */
	.rules {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.rule-col {
		border: 1px solid var(--line-l);
		background: var(--paper);
		padding: 1.5rem 1.6rem;
	}

	.rule-head {
		margin: 0 0 0.9rem;
		font-family: var(--mono);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.rule-head-do {
		color: var(--green);
	}

	.rule-head-dont {
		color: #a9501c;
	}

	.rule-list {
		margin: 0;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.7rem;
	}

	.rule-list li {
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--ink);
	}

	/* Chart cards inside the guide */
	.section :global(.frame) {
		margin-bottom: 1.5rem;
	}

	@media (max-width: 768px) {
		.inner,
		.section,
		.jump-inner {
			padding-left: var(--mobile-margin);
			padding-right: var(--mobile-margin);
		}

		.masthead,
		.masthead-rail,
		.jump {
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
		}

		.section {
			padding-left: 0;
			padding-right: 0;
		}

		.snapshot {
			padding: 1.2rem 1.25rem;
		}
	}
</style>
