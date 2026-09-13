<script>
	/**
	 * Data Room style guide — the design system for /data-room.
	 *
	 * Internal reference, like `style_guide.html` at the repo root: English-only and
	 * `noindex`. It documents the chart system rather than presenting campaign data,
	 * so it is deliberately outside the i18n dictionaries.
	 *
	 * Every chart below renders the REAL components with illustrative sample values, and
	 * every color is imported from `$lib/data/analytics` with its contrast computed from
	 * the hex, so the page can't drift from what /data-room ships. The ΔE figures are
	 * copied from the palette-validator results noted beside each set in `analytics.ts`:
	 * when a color changes, re-run the validator and update them here too. Sample numbers
	 * are labeled as such and are not polling results.
	 */
	import Rail from '$lib/components/Rail.svelte';
	import ChartFrame from '$lib/components/analytics/ChartFrame.svelte';
	import DivergingStackedBar from '$lib/components/analytics/DivergingStackedBar.svelte';
	import DotPlot from '$lib/components/analytics/DotPlot.svelte';
	import NetApprovalBar from '$lib/components/analytics/NetApprovalBar.svelte';
	import MarginPlot from '$lib/components/analytics/MarginPlot.svelte';
	import ShareBar from '$lib/components/analytics/ShareBar.svelte';
	import RankedBars from '$lib/components/analytics/RankedBars.svelte';
	import Heatmap from '$lib/components/analytics/Heatmap.svelte';
	import Dumbbell from '$lib/components/analytics/Dumbbell.svelte';
	import {
		CANDIDATE_COLORS,
		RESPONSE_GRAYS,
		SCALE_COLORS,
		SEQUENTIAL_RAMP,
		CHANGE_COLORS,
		SERIES_COLOR
	} from '$lib/data/analytics';
	import { contrast } from '$lib/utils/chartColor';

	const SURFACE = '#F7FAFC';

	/** WCAG contrast against the chart surface, computed from the hex so it can't go stale. */
	const ratio = (/** @type {string} */ hex) => `${contrast(hex, SURFACE).toFixed(2)}:1`;

	const sections = [
		{ id: 'color', label: 'Color' },
		{ id: 'forms', label: 'Chart forms' },
		{ id: 'figures', label: 'KPI elements' },
		{ id: 'marks', label: 'Marks & anatomy' },
		{ id: 'interaction', label: 'Interaction' },
		{ id: 'responsive', label: 'Responsive' },
		{ id: 'rules', label: 'Rules' }
	];

	/** @typedef {{ hex: string; role: string; use: string }} Swatch */
	/** @typedef {{ check: string; result: string; detail: string }} Check */
	/** @typedef {{ lead: string; text: string }} Reason */
	/** @typedef {{ title: string; body: string; swatches: Swatch[]; why: Reason[]; caption: string; checks: Check[] }} Scale */

	/** Every color set the Data Room uses, in the order a reader meets them. @type {Scale[]} */
	const scales = [
		{
			title: 'Candidates — identity',
			body: 'Used only where a candidate is the series: the ballot test and anything built on it. Civic blue for Crosby and brick red for Moore follow the party convention readers bring to a ballot chart.',
			swatches: [
				{ hex: CANDIDATE_COLORS.crosby, role: 'Crosby', use: 'Peter Crosby, wherever he is a series' },
				{ hex: CANDIDATE_COLORS.moore, role: 'Moore', use: 'Blake Moore, wherever he is a series' }
			],
			why: [
				{
					lead: 'Reserved.',
					text: 'No other series on a data page uses a blue or red that could be read as either candidate. That rule is why the sentiment scale below moved off blue and red.'
				},
				{
					lead: 'Figures stay in ink.',
					text: 'Candidate names and numbers are set in ink with a short colored key beside them; the numerals themselves are never colored.'
				}
			],
			caption: 'Candidate pair — verification',
			checks: [
				{ check: 'Lightness band', result: 'Pass', detail: 'Both inside OKLCH L 0.43–0.77.' },
				{ check: 'Chroma floor', result: 'Pass', detail: 'Both at or above C 0.10.' },
				{
					check: 'CVD separation',
					result: 'Pass',
					detail: 'ΔE 16.0 under protanopia (target ≥ 8), 28.1 under tritanopia.'
				},
				{ check: 'Normal-vision floor', result: 'Pass', detail: 'ΔE 25.1 unsimulated (hard gate ≥ 15).' },
				{ check: 'Contrast vs surface', result: 'Pass', detail: 'Both above the 3:1 mark target.' }
			]
		},
		{
			title: 'Other answers — neutral',
			body: 'Ballot answers that belong to neither candidate. Grays, because they are nobody’s side. “Unsure” doubles as the neutral on the sentiment scale.',
			swatches: [
				{ hex: RESPONSE_GRAYS.other, role: 'Other', use: 'A different candidate' },
				{ hex: RESPONSE_GRAYS.unsure, role: 'Unsure', use: 'Undecided; also the sentiment neutral' },
				{ hex: RESPONSE_GRAYS.none, role: 'None of the above', use: 'Declined every option' }
			],
			why: [
				{
					lead: 'The darkest gray sits in the middle.',
					text: 'In lightness order the three grays were too close to tell apart. Putting Unsure between Other and None separates every neighbor, and gives the undecided share the most weight.'
				},
				{
					lead: 'The candidates anchor the ends.',
					text: 'On a ballot bar Crosby starts at the left edge and Moore at the right, so both read against a baseline down the rows; the grays fill the middle.'
				}
			],
			caption: 'Grays on the ballot bar — verification, neighbors',
			checks: [
				{
					check: 'CVD separation',
					result: 'Pass',
					detail: 'Worst neighbor pair on the bar ΔE 18.4 under protanopia, candidates included.'
				},
				{
					check: 'Normal-vision floor',
					result: 'Pass',
					detail: 'Worst neighbor pair ΔE 18.6. In lightness order the grays measured 12–13 and failed.'
				},
				{
					check: 'Contrast vs surface',
					result: 'Relief required',
					detail: `Other (${ratio(RESPONSE_GRAYS.other)}) and None (${ratio(RESPONSE_GRAYS.none)}) fall below 3:1; carried by in-bar labels where they fit, the legend, the tooltip, and the data table.`
				},
				{
					check: 'Lightness band & chroma',
					result: 'Exempt',
					detail: 'Grays fail both by design: they carry no identity, only “neither candidate.”'
				}
			]
		},
		{
			title: 'Diverging scale — sentiment and approval',
			body: 'Used wherever answers run along one favorable-to-unfavorable axis: satisfaction, likelihood to vote, job approval. Teal-green for favorable and olive-gold for unfavorable, each darkening outward, with the Unsure gray for answers on neither arm.',
			swatches: [
				{
					hex: SCALE_COLORS.posStrong,
					role: 'Favorable, strong',
					use: 'Outermost favorable segment (“Very satisfied”); approval above water'
				},
				{ hex: SCALE_COLORS.posSoft, role: 'Favorable, soft', use: 'Inner favorable segment, nearest the center' },
				{ hex: SCALE_COLORS.negSoft, role: 'Unfavorable, soft', use: 'Inner unfavorable segment, nearest the center' },
				{
					hex: SCALE_COLORS.negStrong,
					role: 'Unfavorable, strong',
					use: 'Outermost unfavorable segment (“Very dissatisfied”); approval underwater'
				},
				{ hex: SCALE_COLORS.neutral, role: 'Neutral', use: 'Answers on neither arm (“Unsure”)' }
			],
			why: [
				{
					lead: 'It avoids the candidates’ colors.',
					text: 'The first version ran blue to rust. Beside Crosby-blue ballot charts, “satisfied with Moore” drawn in blue invited a misreading. Every purple tested collapsed into Crosby blue for colorblind readers, and every darker gold into Moore red, which is why the poles are teal and olive.'
				},
				{
					lead: 'The poles separate on the blue–yellow channel.',
					text: 'Teal against gold stays distinct under protanopia and deuteranopia, the two most common forms of color-vision deficiency.'
				},
				{
					lead: 'Each arm darkens outward.',
					text: 'Direction is hue and strength is lightness, so the order survives grayscale printing and forced-colors mode.'
				},
				{
					lead: 'The light steps are backed by a relief channel.',
					text: 'Both soft steps fall below 3:1 against the surface, so every chart carries direct labels on the marks and a full data table.'
				}
			],
			caption: 'Diverging scale — verification, adjacent pairs',
			checks: [
				{ check: 'Lightness band', result: 'Pass', detail: 'All four steps inside OKLCH L 0.43–0.77.' },
				{ check: 'Chroma floor', result: 'Pass', detail: 'All four at or above C 0.10, so no step reads as gray.' },
				{
					check: 'CVD separation',
					result: 'Pass',
					detail: 'Worst adjacent pair ΔE 12.2 under protanopia (target ≥ 8), 15.9 under tritanopia.'
				},
				{
					check: 'Normal-vision floor',
					result: 'Pass',
					detail: 'Worst adjacent pair ΔE 17.0 unsimulated (hard gate ≥ 15).'
				},
				{
					check: 'Contrast vs surface',
					result: 'Relief required',
					detail: `The soft steps sit at ${ratio(SCALE_COLORS.posSoft)} and ${ratio(SCALE_COLORS.negSoft)}, below the 3:1 mark target — permitted only alongside direct labels and a data table.`
				},
				{
					check: 'Distance from the candidates',
					result: 'Full color only',
					detail: 'Strong teal vs Crosby blue ΔE 17.4 and dark gold vs Moore red ΔE 16.3 for full-color readers. Under CVD the dark gold and Moore red converge (ΔE 4.9), tolerable only because every segment is labeled.'
				}
			]
		},
		{
			title: 'Sequential ramp — magnitude',
			body: 'Used where more is simply more: heatmap cells, and the two shades of a before → after comparison (light = earlier, civic blue = later). Single-series bars take the middle step, civic blue.',
			swatches: SEQUENTIAL_RAMP.map((hex, i) => ({
				hex,
				role: `Step ${i + 1}`,
				use:
					i === 0
						? 'Lowest values; the earlier reading in a before → after'
						: hex === SERIES_COLOR
							? 'Civic blue: single-series bars; the later reading'
							: i === SEQUENTIAL_RAMP.length - 1
								? 'Highest values'
								: 'Heatmap step'
			})),
			why: [
				{
					lead: 'One hue.',
					text: 'Magnitude reads as lightness alone; a multi-hue ramp would suggest categories that aren’t there.'
				},
				{
					lead: 'The light end is not the surface.',
					text: 'Even the lowest value stays visibly shaded, so a pale cell always means a small number, never a missing one.'
				},
				{
					lead: 'Values are printed.',
					text: 'Every heatmap cell carries its number, in ink or white chosen by the cell’s luminance, so no one has to estimate a shade.'
				}
			],
			caption: 'Sequential ramp — verification (ordinal)',
			checks: [
				{
					check: 'Lightness',
					result: 'Pass',
					detail: 'Monotone light → dark; every adjacent step at least ΔL 0.06 apart.'
				},
				{ check: 'Single hue', result: 'Pass', detail: 'Hue spread 5°, so magnitude reads as lightness alone.' },
				{
					check: 'Light end vs surface',
					result: 'Pass',
					detail: `Step 1 at ${ratio(SEQUENTIAL_RAMP[0])} (floor 2:1).`
				}
			]
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

	/** A ballot-style row: candidate A, the three grays, candidate B.
	    @param {number[]} v */
	const ballotSegments = (v) => [
		{ label: 'Candidate A', value: v[0], color: CANDIDATE_COLORS.crosby },
		{ label: 'Other', value: v[1], color: RESPONSE_GRAYS.other },
		{ label: 'Unsure', value: v[2], color: RESPONSE_GRAYS.unsure },
		{ label: 'None of the above', value: v[3], color: RESPONSE_GRAYS.none },
		{ label: 'Candidate B', value: v[4], color: CANDIDATE_COLORS.moore }
	];

	/** A 2-point gap inside a ±4 margin: each dot sits inside the other's band. */
	const demoMargin = [
		{ label: 'Candidate A', value: 36, color: CANDIDATE_COLORS.crosby },
		{ label: 'Candidate B', value: 34, color: CANDIDATE_COLORS.moore }
	];

	const demoShare = [
		{ label: 'All respondents', sublabel: 'n = 500 · ±4 pts', segments: ballotSegments([36, 4, 22, 4, 34]) },
		{ label: 'Group two', sublabel: 'n = 180 · ±7.3 pts', segments: ballotSegments([22, 5, 25, 8, 40]) }
	];

	const demoRanked = [
		{ label: 'Item one', sublabel: 'With a supporting line', value: 68 },
		{ label: 'Item two', value: 55 },
		{ label: 'Item three', value: 31 },
		{ label: 'Item four', value: 18 }
	];

	const demoLollipop = [
		{ label: 'Group A', points: [{ series: 'Group A', value: 64, color: SERIES_COLOR }] },
		{
			label: 'Group B',
			sublabel: 'With a supporting line',
			points: [{ series: 'Group B', value: 41, color: SERIES_COLOR }]
		},
		{ label: 'Group C', points: [{ series: 'Group C', value: 28, color: SERIES_COLOR }] }
	];

	const demoHeatColumns = [
		{ key: 'all', label: 'All', sublabel: 'n = 500' },
		{ key: 'a', label: 'Group A', sublabel: 'n = 220' },
		{ key: 'b', label: 'Group B', sublabel: 'n = 180' },
		{ key: 'c', label: 'Group C', sublabel: 'n = 60', flagged: true }
	];
	const demoHeatRows = [
		{ label: 'Item one', values: { all: 68, a: 71, b: 62, c: 75 } },
		{ label: 'Item two', values: { all: 55, a: 48, b: 63, c: 52 } },
		{ label: 'Item three', values: { all: 31, a: 40, b: 22, c: 28 } }
	];

	const demoDumbbell = [
		{
			label: 'Measure one',
			sublabel: 'The same question, asked twice',
			rows: [
				{ label: 'All', from: 62, to: 58 },
				{ label: 'Group B', from: 55, to: 57 }
			]
		},
		{
			label: 'Measure two',
			rows: [
				{ label: 'All', from: 40, to: 46 },
				{ label: 'Group B', from: 38, to: 39 }
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
		{
			mark: 'Stacked segments',
			spec: '2px gap in the surface color between touching segments; rounded only at the bar’s two outer ends'
		},
		{ mark: 'Dot / marker', spec: '12–16px across, with a 2px ring in the surface color' },
		{
			mark: 'Estimate band',
			spec: 'Value ± margin of error: the series color at 18% opacity, with 2px solid end caps'
		},
		{
			mark: 'Heatmap cell',
			spec: '2px surface gap between cells; the value printed in ink or white by the fill’s luminance'
		},
		{
			mark: 'Line / stem',
			spec: '2px, round cap; lollipop stems at 22–28% opacity; dumbbell links in the hairline gray'
		},
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
			text: 'Show each subgroup’s sample size and margin, and flag groups under 100 respondents.'
		},
		{
			kind: 'do',
			text: 'Say when a figure is calculated rather than published — a subgroup margin, a reconstructed sample size.'
		},
		{
			kind: 'do',
			text: 'Draw the margin of error on a close result, so a tie reads as a tie.'
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
			kind: 'dont',
			text: 'Never plot a modeled, projected, or illustrative number alongside sourced data on the public page.'
		},
		{
			kind: 'dont',
			text: 'Never use blue or red for anything but the two candidates.'
		},
		{
			kind: 'dont',
			text: 'Never give a fourth group its own hue. Past three, tell groups apart by position — rows or heatmap columns.'
		},
		{
			kind: 'dont',
			text: 'Never use two y-scales on one chart. Two measures of different scale means two charts.'
		},
		{
			kind: 'dont',
			text: 'Never zoom an axis to exaggerate a spread or a change the chart is describing as small.'
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
	<title>Data Room style guide — Peter Crosby for Congress</title>
	<meta name="description" content="The chart and color system behind the Data Room." />
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="sg">
	<header class="masthead">
		<Rail />
		<div class="inner">
			<p class="eyebrow">Internal reference</p>
			<h1 class="page-title">Data Room style guide</h1>
			<p class="lede">
				The chart system behind <a href="/data-room">the Data Room</a> — color, forms,
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
			Every color does one job and is verified against a fixed set of checks rather than chosen
			by eye. The hex values come straight from <code>src/lib/data/analytics.ts</code> and the
			contrast ratios are computed from them. Measurements are taken against the chart surface,
			<code>{SURFACE}</code>; ΔE figures are Euclidean distance in OKLab ×100 under
			Machado-Oliveira-Fernandes CVD simulation at full severity.
		</p>

		{#each scales as scale}
			<h3 class="sub-title">{scale.title}</h3>
			<p class="body">{scale.body}</p>

			<div class="swatch-grid">
				{#each scale.swatches as s}
					<article class="swatch">
						<div class="swatch-chip" style="background:{s.hex}"></div>
						<p class="swatch-role">{s.role}</p>
						<p class="swatch-hex">{s.hex}</p>
						<p class="swatch-use">{s.use}</p>
						<p class="swatch-meta">Contrast {ratio(s.hex)}</p>
					</article>
				{/each}
			</div>

			<div class="why">
				<h4 class="why-title">Why this scale</h4>
				<ul class="why-list">
					{#each scale.why as w}
						<li><strong>{w.lead}</strong> {w.text}</li>
					{/each}
				</ul>
			</div>

			<div class="table-wrap">
				<table class="check-table">
					<caption>{scale.caption}</caption>
					<thead>
						<tr><th scope="col">Check</th><th scope="col">Result</th><th scope="col">Measurement</th></tr>
					</thead>
					<tbody>
						{#each scale.checks as c}
							<tr>
								<th scope="row">{c.check}</th>
								<td>
									<span
										class="pill"
										class:pill-warn={c.result !== 'Pass' && c.result !== 'Exempt'}
										class:pill-muted={c.result === 'Exempt'}>{c.result}</span
									>
								</td>
								<td>{c.detail}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}

		<div class="why">
			<h4 class="why-title">Retired: the voter-group palette</h4>
			<ul class="why-list">
				<li>
					<strong>Groups are told apart by position, not hue.</strong> An earlier three-hue set
					(blue, amber, green) colored voter groups in a dot plot. The September crosstabs have
					five groups — past the three a hue-coded dot plot can keep apart when every pair is
					tested — and its blue would now read as Crosby. Groups now get rows or heatmap columns
					instead.
				</li>
			</ul>
		</div>
	</section>

	<!-- ── Chart forms ──────────────────────────────────────────── -->
	<section class="section" id="forms">
		<h2 class="section-title">Chart forms</h2>
		<p class="section-lede">
			The data's job picks the form. Sample values below are illustrative.
		</p>

		<ChartFrame
			eyebrow="Form · estimates with margin of error"
			title="A close two-way result"
			question="Sample head-to-head question"
			takeaway="For a ballot test, or any two estimates whose gap may be inside the margin. Each estimate carries a band of ± its margin of error; when the gap is smaller than the margin, each dot sits inside the other’s band and the chart shows the tie on its own. A 100% bar beneath accounts for everyone else."
			legend={demoShare[0].segments.map((seg) => ({ label: seg.label, color: seg.color }))}
			source="Illustrative sample values — not polling results."
			tableColumns={['Response', 'Share', 'Range (±4)']}
			tableRows={demoShare[0].segments.map((seg) => [
				seg.label,
				`${seg.value}%`,
				seg.label.startsWith('Candidate') ? `${seg.value - 4}–${seg.value + 4}%` : '—'
			])}
		>
			<MarginPlot
				rows={demoMargin}
				moe={4}
				digits={0}
				bandLabel="Bands show each estimate’s ±4-point margin of error."
				ariaLabel="Sample estimates with margin-of-error bands"
			/>
			<div class="plot-divider"></div>
			<ShareBar rows={[demoShare[0]]} digits={0} ariaLabel="Sample bar of all responses" />
		</ChartFrame>

		<ChartFrame
			eyebrow="Form · 100% stacked bars"
			title="One whole, split the same way for each group"
			takeaway="For part-to-whole across groups. Every row uses the same answers in the same order; the first anchors the left edge and the last the right, so both compare down the rows. Each row carries its sample size and margin, and a value prints inside its segment only when it fits."
			legend={demoShare[0].segments.map((seg) => ({ label: seg.label, color: seg.color }))}
			source="Illustrative sample values — not polling results."
			tableColumns={['Group', ...demoShare[0].segments.map((seg) => seg.label)]}
			tableRows={demoShare.map((r) => [r.label, ...r.segments.map((seg) => `${seg.value}%`)])}
		>
			<ShareBar rows={demoShare} digits={0} ariaLabel="Sample 100% stacked bars" />
		</ChartFrame>

		<ChartFrame
			eyebrow="Form · diverging stacked bar"
			title="Ordered responses"
			question="Sample Likert question with a neutral option"
			takeaway="For agree-to-disagree data. Responses diverge from a shared center with the softest category nearest it, so the balance between the two arms is the first thing read. A neutral option is shown apart from the axis."
			source="Illustrative sample values — not polling results."
			legend={demoLikert.map((seg) => ({ label: seg.label, color: seg.color }))}
			tableColumns={['Response', 'Share']}
			tableRows={demoLikert.map((seg) => [seg.label, `${seg.value}%`])}
		>
			<DivergingStackedBar segments={demoLikert} ariaLabel="Sample diverging stacked bar" />
		</ChartFrame>

		<ChartFrame
			eyebrow="Form · ranked bars"
			title="Magnitude across many named items"
			takeaway="Horizontal so long names wrap instead of clipping, sorted high to low, one hue — coloring the bars apart would only re-encode what length already shows."
			note="For a multi-select question, say so: shares add up to more than 100%."
			source="Illustrative sample values — not polling results."
			tableColumns={['Item', 'Share']}
			tableRows={demoRanked.map((r) => [r.label, `${r.value}%`])}
		>
			<RankedBars rows={demoRanked} color={SERIES_COLOR} digits={0} ariaLabel="Sample ranked bars" />
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
			eyebrow="Form · heatmap table"
			title="Shares across several groups"
			takeaway="For more groups than hue can keep apart. One sequential hue, the value printed in every cell, each column headed by its sample size, and a reference column set apart on the left. It is a real table, so it is its own data table."
			note="† Small sample: flag any group under 100 respondents, and give its margin in the note."
			source="Illustrative sample values — not polling results."
		>
			<Heatmap
				columns={demoHeatColumns}
				rows={demoHeatRows}
				ramp={SEQUENTIAL_RAMP}
				digits={0}
				caption="Sample heatmap table"
				rowHeader="Item"
				scaleLabel="Share of group"
				separateFirst
			/>
		</ChartFrame>

		<ChartFrame
			eyebrow="Form · dumbbell"
			title="Two readings of the same question"
			takeaway="For change between two surveys that asked the same thing. Earlier is light and later is dark, on an axis from zero so a small change looks small. Values sit in aligned columns, because near-identical readings put the dots on top of each other."
			source="Illustrative sample values — not polling results."
			tableColumns={['Measure', 'Group', 'Then', 'Now']}
			tableRows={demoDumbbell.flatMap((g) => g.rows.map((r) => [g.label, r.label, `${r.from}%`, `${r.to}%`]))}
		>
			<Dumbbell
				groups={demoDumbbell}
				fromColor={CHANGE_COLORS.from}
				toColor={CHANGE_COLORS.to}
				fromLabel="Then"
				toLabel="Now"
				ariaLabel="Sample dumbbell chart"
			/>
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
				<li><strong>A close two-way result</strong> → estimates with margin bands, plus a 100% bar for everyone else.</li>
				<li><strong>Part-to-whole across groups</strong> → 100% stacked bars, the same order in every row.</li>
				<li><strong>Ordered-scale share</strong> (agree ↔ disagree) → diverging stacked bar.</li>
				<li><strong>Magnitude across many named items</strong> → ranked bars, one hue.</li>
				<li><strong>Magnitude across a few named rows</strong> → lollipop, one hue.</li>
				<li><strong>The same measure across several groups</strong> → heatmap table.</li>
				<li><strong>Two readings of the same question</strong> → dumbbell.</li>
				<li><strong>Above or below a baseline</strong> → diverging bar around zero.</li>
				<li><strong>A single headline number</strong> → a stat tile or hero figure, never a one-bar chart; a matchup hero when the headline is two numbers.</li>
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
			One per poll block, and only for the number that block leads with. It sits with the dataset
			it describes, alongside that dataset's methodology.
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

		<h3 class="sub-title">Matchup hero</h3>
		<p class="body">
			When the headline is two numbers side by side, as in a ballot test. Both figures stay in
			ink, with identity carried by a short colored key beside each name, never by coloring the
			numerals. The label states the reading plainly, and the line beneath gives the gap against
			the margin of error.
		</p>
		<div class="demo-panel">
			<div class="snapshot">
				<div class="snapshot-head">
					<div class="matchup">
						<p class="hero-figure matchup-figure">36<span class="hero-unit">%</span></p>
						<span class="matchup-vs">vs.</span>
						<p class="hero-figure matchup-figure">34<span class="hero-unit">%</span></p>
						<p class="matchup-name">
							<span class="matchup-key" style="background:{CANDIDATE_COLORS.crosby}"></span>Candidate A
						</p>
						<span></span>
						<p class="matchup-name">
							<span class="matchup-key" style="background:{CANDIDATE_COLORS.moore}"></span>Candidate B
						</p>
					</div>
					<div class="hero-copy">
						<p class="hero-label">Plain statement of the reading</p>
						<p class="hero-sub">The gap, stated against the margin of error</p>
					</div>
				</div>
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
			that they are not survey results, so the two kinds of number are never confused. The note
			also says when each count dates from, since counts go stale at different rates.
		</p>
		<div class="demo-panel">
			<div class="ground-grid">
				{#each [{ v: '40+', l: 'Counted item', n: 'What it covers' }, { v: '400+', l: 'Counted item', n: 'What it covers' }, { v: '550+', l: 'Counted item', n: 'What it covers' }] as g}
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
			filled segment or cell, where the text takes white or ink by the fill's luminance —
			<code>inkOn</code> in <code>src/lib/utils/chartColor.ts</code> picks it, never a hand-kept
			list of light colors.
		</p>
	</section>

	<!-- ── Interaction ──────────────────────────────────────────── -->
	<section class="section" id="interaction">
		<h2 class="section-title">Interaction</h2>
		<p class="section-lede">Hover the marks in the demos above to see both behaviors.</p>
		<div class="why">
			<h4 class="why-title">Tooltips</h4>
			<ul class="why-list">
				<li>
					Marks whose values aren't all printed carry a tooltip naming the series and exact value:
					stacked segments, dots in a dot plot, net bars.
				</li>
				<li>
					Charts that print every value — the margin plot, ranked bars, the dumbbell, the heatmap —
					skip the tooltip and lift the hovered row or cell instead.
				</li>
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
					depend on, not an optional extra. The heatmap is the exception: it is a real
					<code>table</code>, so it is its own data table.
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
					and the full width goes to the data. The dumbbell narrows its columns instead.
				</li>
				<li>
					<strong>Labels wrap instead of clipping.</strong> The newer forms are laid out in HTML
					with percentage positions, so long labels — Spanish ones especially — wrap onto a
					second line.
				</li>
				<li>
					<strong>The heatmap scrolls inside its own box.</strong> On a phone the grid scrolls
					sideways with its row labels pinned, rather than squeezing cells below legibility.
				</li>
				<li>
					<strong>Axes thin out.</strong> Where a track gets narrow, tick labels drop to the ends
					and the middle so they never collide.
				</li>
				<li>
					<strong>Inline labels are suppressed rather than clipped.</strong> A segment too narrow
					for its value drops the label; the legend, tooltip and table carry it. Text is never
					cropped by its own mark.
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

	.pill-muted {
		background: var(--paper-2);
		color: #5b6b80;
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

	/* Matchup hero — mirrors /analytics */
	.matchup {
		display: grid;
		grid-template-columns: auto auto auto;
		column-gap: 0.9rem;
		align-items: center;
		justify-items: start;
	}

	.matchup-figure {
		color: var(--ink);
		font-size: clamp(2.6rem, 6vw, 4rem);
	}

	.matchup-vs {
		font-family: var(--serif);
		font-style: italic;
		font-size: 1.05rem;
		color: #5b6b80;
	}

	.matchup-name {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		margin: 0.55rem 0 0;
		font-family: var(--mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.matchup-key {
		flex: none;
		width: 16px;
		height: 4px;
	}

	/* Between a margin plot and its all-responses bar */
	.plot-divider {
		margin: 1.4rem 0 0.9rem;
		border-top: 1px solid var(--line-l-2);
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
