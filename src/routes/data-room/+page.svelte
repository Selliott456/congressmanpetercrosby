<script>
	import { onMount } from 'svelte';
	import { messages, locale } from '$lib/i18n/locale';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { fill, fillParts } from '$lib/i18n/interpolate';
	import Rail from '$lib/components/Rail.svelte';
	import ChartFrame from '$lib/components/analytics/ChartFrame.svelte';
	import DivergingStackedBar from '$lib/components/analytics/DivergingStackedBar.svelte';
	import NetApprovalBar from '$lib/components/analytics/NetApprovalBar.svelte';
	import MarginPlot from '$lib/components/analytics/MarginPlot.svelte';
	import ShareBar from '$lib/components/analytics/ShareBar.svelte';
	import RankedBars from '$lib/components/analytics/RankedBars.svelte';
	import Heatmap from '$lib/components/analytics/Heatmap.svelte';
	import Dumbbell from '$lib/components/analytics/Dumbbell.svelte';
	import {
		POLLS,
		FEATURED_POLL_ID,
		LAST_UPDATED,
		likertQuestions,
		issuePriorities,
		ballotReadings,
		concernReadings,
		topConcerns,
		BALLOT_ORDER,
		BALLOT_COLORS,
		CANDIDATE_COLORS,
		SERIES_COLOR,
		SEQUENTIAL_RAMP,
		CHANGE_COLORS,
		GROUP_ORDER,
		GROUP_N,
		SMALL_SAMPLE_N,
		marginOfError,
		statewideApproval,
		coxApprovalTrend,
		groundGame,
		headlineStats
	} from '$lib/data/analytics';

	/** All copy comes from `$messages.analytics`; the data file holds the numbers
	    and the English source strings, with Spanish overrides keyed by id in
	    `analytics.byId` (the same convention as events and media). */
	$: t = $messages.analytics;

	/** Jump-bar destinations. Each id must match a `.analytics-section` below. */
	$: sections = [
		{ id: 'district-polling', label: t.nav.districtPolling },
		{ id: 'statewide-context', label: t.nav.statewideContext },
		{ id: 'ground-game', label: t.nav.groundGame },
		{ id: 'methodology', label: t.nav.methodology }
	];

	/** Localised label/sub for a stat, falling back to the English source.
	    Reactive (not a plain const) so it is rebuilt when the locale changes —
	    Svelte tracks `t` here, but would not see it inside a static function. */
	$: statText = (/** @type {typeof headlineStats[number]} */ s) => ({
		label: t.byId[s.id]?.label ?? s.label,
		sub: t.byId[s.id]?.sub ?? s.sub
	});

	$: hero = headlineStats[0];
	$: rest = headlineStats.slice(1);

	/**
	 * `t.polls` is an object literal in the dictionary on purpose: `pagesEs` is typed
	 * as the shape of `pagesEn`, so a poll added in English but not Spanish is a type
	 * error. That literal cannot be indexed by a plain `string`, so it is narrowed to
	 * a keyed record here — one cast, rather than weakening the dictionary type that
	 * is doing the useful work.
	 * @type {Record<string, typeof t.polls['internal-aug-2026']>}
	 */
	$: pollsById = t.polls;

	/** The newest district poll; its sample size fills the limits panel's `{n}`. */
	$: featuredPoll = POLLS[FEATURED_POLL_ID];

	/** A poll snapshot's methodology row: field dates, sample, margin, geography. */
	$: pollMeta = (/** @type {string} */ id) => [
		{ dt: t.meta.fieldDates, dd: pollsById[id].fieldLabel },
		{ dt: t.meta.sample, dd: fill(t.meta.sampleValue, { n: POLLS[id].sampleSize ?? '' }) },
		{
			dt: t.meta.marginOfError,
			dd: fill(POLLS[id].moeCalculated ? t.meta.moeValueCalculated : t.meta.moeValue, {
				moe: POLLS[id].marginOfError ?? ''
			})
		},
		{ dt: t.meta.geography, dd: t.meta.geographyValue }
	];

	/**
	 * A chart's source line, built from the poll its data came from rather than
	 * from a page-level constant — so charts drawn from different polls each cite
	 * their own sample, field dates and margin of error.
	 *
	 * Reactive (not a plain function) so it rebuilds on a locale change: Svelte
	 * tracks `t` here, but would not see it referenced inside a static function.
	 */
	$: sourceFor = (/** @type {string} */ pollId) => {
		const poll = POLLS[pollId];
		const text = pollsById[pollId];
		const template = !poll.partisan
			? t.sourcePublic
			: poll.moeCalculated
				? t.sourceInternalCalculated
				: t.sourceInternal;
		return fill(template, {
			pollster: text.shortPollster,
			n: poll.sampleSize ?? '',
			population: text.population,
			geography: text.geography,
			dates: text.fieldLabel,
			moe: poll.marginOfError ?? ''
		});
	};

	/** Methodology cards: campaign-sponsored polls first, then independent ones,
	    each group newest field period first. */
	const methodPolls = Object.values(POLLS).sort(
		(a, b) => Number(b.partisan) - Number(a.partisan) || b.fieldEnd.localeCompare(a.fieldEnd)
	);

	/** Page dateline, formatted in the reader's locale from a single ISO constant. */
	$: dateline = new Intl.DateTimeFormat($locale === 'es' ? 'es-US' : 'en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(`${LAST_UPDATED}T00:00:00Z`));

	// ── District polls ─────────────────────────────────────────
	/** Poll ids for the blocks below. The ballot-test surveys drive their own blocks
	    (newest first); August has no ballot test and keeps its own block further down. */
	const AUG_ID = issuePriorities.pollId;
	const SEP_ID = ballotReadings[ballotReadings.length - 1].pollId;

	/** One decimal: the precision these surveys publish. */
	const f1 = (/** @type {number} */ v) => v.toFixed(1);
	/** Margins read as "±4" when whole and "±3.6" when not. */
	const fmtMoe = (/** @type {number} */ v) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
	const moeOf = (/** @type {string} */ id) => POLLS[id].marginOfError ?? 0;

	$: ballotLegend = BALLOT_ORDER.map((k) => ({
		label: t.pollBlock.options[k],
		color: BALLOT_COLORS[k]
	}));

	/** A group's sample size and margin within one survey. All voters carry that poll's
	    margin; party groups carry the margin computed from their own size. */
	$: groupMeta = (
		/** @type {import('$lib/data/analytics').GroupKey} */ g,
		/** @type {string} */ pollId
	) =>
		fill(t.pollBlock.groupMeta, {
			n: GROUP_N[pollId][g],
			moe: g === 'all' ? fmtMoe(moeOf(pollId)) : f1(marginOfError(GROUP_N[pollId][g]))
		});

	$: ballotSegments = (/** @type {import('$lib/data/analytics').BallotRow} */ row) =>
		BALLOT_ORDER.map((k) => ({
			label: t.pollBlock.options[k],
			value: row.shares[k],
			color: BALLOT_COLORS[k]
		}));

	/**
	 * `t.pollBlocks` is an object literal for the same reason `t.polls` is — a block
	 * added in English but not Spanish must be a type error, not silent English.
	 * @type {Record<string, typeof t.pollBlocks['internal-sep-2026']>}
	 */
	$: blockCopy = t.pollBlocks;

	/** One district-polling block per ballot-test survey, newest first. Every figure a
	    block shows comes from its own poll, so the charts never mix surveys. */
	$: blocks = ballotReadings.map((reading) => {
		const pollId = reading.pollId;
		const moe = moeOf(pollId);
		const all = reading.all.shares;
		const leadsCrosby = all.crosby >= all.moore;
		const rows = concernReadings.find((c) => c.pollId === pollId)?.rows ?? [];
		const rep = reading.byParty.find((r) => r.group === 'republican')?.shares;
		const una = reading.byParty.find((r) => r.group === 'unaffiliated')?.shares;
		const share = (/** @type {string} */ id) => rows.find((c) => c.id === id)?.shares.all ?? 0;
		return {
			pollId,
			copy: blockCopy[pollId],
			moe,
			gap: Math.abs(all.moore - all.crosby),
			source: sourceFor(pollId),
			/** Crosby and Moore — the hero figures and the margin plot, leader first. */
			candidateRows: (leadsCrosby
				? /** @type {('crosby' | 'moore')[]} */ (['crosby', 'moore'])
				: /** @type {('crosby' | 'moore')[]} */ (['moore', 'crosby'])
			).map((k) => ({
				key: k,
				value: all[k],
				color: CANDIDATE_COLORS[k],
				label: t.pollBlock.options[k]
			})),
			takeaway: fill(blockCopy[pollId].takeaway, {
				crosby: f1(all.crosby),
				moore: f1(all.moore),
				gap: f1(Math.abs(all.moore - all.crosby)),
				moe: fmtMoe(moe),
				undecided: f1(all.unsure + all.none)
			}),
			heroSub: fill(blockCopy[pollId].heroSub, {
				gap: f1(Math.abs(all.moore - all.crosby)),
				moe: fmtMoe(moe)
			}),
			groupRows: [reading.all, ...reading.byParty].map((row) => ({
				label: t.groups[row.group],
				sublabel: groupMeta(row.group, pollId),
				segments: ballotSegments(row)
			})),
			tableRows: BALLOT_ORDER.map((k) => {
				const v = all[k];
				const ranged = k === 'crosby' || k === 'moore';
				return [
					t.pollBlock.options[k],
					`${f1(v)}%`,
					ranged ? `${f1(v - moe)}–${f1(v + moe)}%` : '—'
				];
			}),
			byPartyTakeaway:
				rep && una
					? fill(t.pollBlock.byParty.takeaway, {
							repMoore: f1(rep.moore),
							repCrosby: f1(rep.crosby),
							repUndecided: f1(rep.unsure + rep.none),
							unaCrosby: f1(una.crosby),
							unaMoore: f1(una.moore)
						})
					: '',
			concernRows: rows.map((c) => ({
				label: t.byId[c.id]?.label ?? c.issue,
				sublabel: t.byId[c.id]?.detail ?? c.detail,
				value: c.shares.all
			})),
			concernTakeaway: fill(t.pollBlock.concerns.takeaway, {
				aff: f1(share('issue-affordability')),
				acc: f1(share('issue-accountability')),
				gsl: f1(share('issue-great-salt-lake'))
			}),
			heatColumns: GROUP_ORDER.map((g) => ({
				key: g,
				label: t.groups[g],
				sublabel: `n = ${GROUP_N[pollId][g]}`,
				flagged: GROUP_N[pollId][g] < SMALL_SAMPLE_N
			})),
			heatRows: rows.map((c) => ({ label: t.byId[c.id]?.label ?? c.issue, values: c.shares })),
			heatNote: fill(t.pollBlock.concernsByParty.note, {
				dem: Math.round(marginOfError(GROUP_N[pollId].democratic)),
				other: Math.round(marginOfError(GROUP_N[pollId].other))
			})
		};
	});

	// ── September → week of September 21 (two readings of the same questions) ──
	/** Both surveys' source line, for the trend charts that draw on the pair. */
	$: pairSource = fill(t.trendPair.source, {
		a: pollsById[SEP_ID].fieldLabel,
		aN: POLLS[SEP_ID].sampleSize ?? '',
		b: pollsById[ballotReadings[0].pollId].fieldLabel,
		bN: POLLS[ballotReadings[0].pollId].sampleSize ?? ''
	});

	/** The ballot answers the trend tracks: both candidates plus "unsure", the pool
	    they are drawing from. @type {('crosby' | 'moore' | 'unsure')[]} */
	const TREND_KEYS = ['crosby', 'moore', 'unsure'];

	/** Ballot test, earlier reading → newest. */
	$: ballotTrendRows = TREND_KEYS.map((k) => ({
		label: t.pollBlock.options[k],
		from: ballotReadings[1].all.shares[k],
		to: ballotReadings[0].all.shares[k]
	}));
	$: ballotTrendGroups = [{ label: t.groups.all, rows: ballotTrendRows }];
	$: ballotSwing = ballotTrendRows.map((r) => r.to - r.from);
	/**
	 * The margin on a CHANGE between two surveys, not either survey's own: the two
	 * sampling errors compound, so the bar a movement has to clear is √(a² + b²) — about
	 * 5.5 points here, against ±3.8 and ±4 individually. Comparing a change to one poll's
	 * margin would call movement real when it is not.
	 */
	$: trendMoe = Math.sqrt(
		moeOf(ballotReadings[0].pollId) ** 2 + moeOf(ballotReadings[1].pollId) ** 2
	);
	$: trendMovers = ballotTrendRows
		.filter((r) => Math.abs(r.to - r.from) > trendMoe)
		.map((r) => r.label);
	$: ballotTrendTakeaway = fill(t.ballotTrend.takeaway, {
		crosby: `${ballotSwing[0] >= 0 ? '+' : '−'}${f1(Math.abs(ballotSwing[0]))}`,
		moore: `${ballotSwing[1] >= 0 ? '+' : '−'}${f1(Math.abs(ballotSwing[1]))}`,
		moeNote: trendMovers.length
			? fill(t.ballotTrend.moeExceeds, {
					moe: fmtMoe(trendMoe),
					names: trendMovers.join(', ')
				})
			: fill(t.ballotTrend.moeWithin, { moe: fmtMoe(trendMoe) })
	});

	/** The concerns question, earlier reading → newest, all voters. */
	$: concernTrendGroups = [
		{
			label: t.groups.all,
			rows: concernReadings[0].rows.map((c) => ({
				label: t.byId[c.id]?.label ?? c.issue,
				from: concernReadings[1].rows.find((p) => p.id === c.id)?.shares.all ?? 0,
				to: c.shares.all
			}))
		}
	];

	/** Groups both surveys report, for the August → September comparison.
	    @type {('all' | 'republican' | 'unaffiliated')[]} */
	const CHANGE_GROUPS = ['all', 'republican', 'unaffiliated'];

	/** August (whole points, as released) against September, matched by issue id. */
	$: changeGroups = issuePriorities.rows.map((aug) => {
		const sep = topConcerns.rows.find((c) => c.id === aug.id);
		return {
			label: t.byId[aug.id]?.label ?? aug.issue,
			sublabel: t.byId[aug.id]?.detail ?? aug.detail,
			rows: sep
				? CHANGE_GROUPS.map((g) => ({ label: t.groups[g], from: aug[g], to: sep.shares[g] }))
				: []
		};
	});
	$: changeTableRows = changeGroups.flatMap((grp) =>
		grp.rows.map((r) => [grp.label, r.label, `${r.from}%`, `${f1(r.to)}%`])
	);

	/** Approval rows with translated names/roles for the chart and its table. */
	$: approvalRows = statewideApproval.rows.map((r) => ({
		...r,
		name: t.byId[r.id]?.label ?? r.name,
		role: t.byId[r.id]?.role ?? r.role
	}));

	const coxDelta = coxApprovalTrend.points[1].value - coxApprovalTrend.points[0].value;

	/**
	 * The "What is not modeled here" panel. Shown deliberately: stating which metrics
	 * are absent — and why — is part of reporting the ones that are present. Without
	 * it nothing on the page tells a reader there is no head-to-head number and no
	 * forecast, which invites them to assume those figures exist.
	 *
	 * Kept behind a flag so it can be toggled for a specific audience without
	 * deleting the copy. Its text lives in `$messages.analytics.limits` (en + es).
	 */
	const SHOW_LIMITS = true;

	/** The trend sentence as ordered parts, so the figures inside it can be
	    highlighted without putting markup in the dictionary. */
	$: trendParts = fillParts(t.trend.body, {
		from: `${coxApprovalTrend.points[0].value}%`,
		fromPeriod: t.pollMeta.coxFrom,
		to: `${coxApprovalTrend.points[1].value}%`,
		toPeriod: t.pollMeta.coxTo,
		delta: coxDelta
	});

	// ── Sticky "On this page" ribbon (mirrors the Policies jump bar) ──────────
	/** Anchor id of the section currently in view — drives the "you are here" highlight.
	    Literal rather than `sections[0].id`: reactive statements run after the script
	    body, so `sections` is still undefined at initialisation. */
	let activeId = 'district-polling';
	/** The sticky jump bar; its height feeds the anchor offset. @type {HTMLElement | undefined} */
	let jumpBar;
	/** The horizontally-scrollable jump list (overflows on narrow screens). @type {HTMLElement | undefined} */
	let jumpInner;
	/** Edge-fade visibility — true only when there's hidden content to scroll toward. */
	let canScrollLeft = false;
	let canScrollRight = false;
	/** Offsets for the two stacked sticky bars (site nav + jump bar), applied as CSS vars. */
	let navTop = 0;
	let anchorOffset = 0;

	function measure() {
		const siteNav = /** @type {HTMLElement | null} */ (document.querySelector('.nav'));
		const navH = siteNav?.offsetHeight ?? 64;
		navTop = navH;
		anchorOffset = navH + (jumpBar?.offsetHeight ?? 0) + 16;
		updateScrollEdges();
	}

	function updateScrollEdges() {
		if (!jumpInner) return;
		const max = jumpInner.scrollWidth - jumpInner.clientWidth;
		canScrollLeft = jumpInner.scrollLeft > 1;
		canScrollRight = jumpInner.scrollLeft < max - 1;
	}

	/** Keep the active link centered within the scrollable list. */
	function scrollActiveIntoView() {
		if (!jumpInner || jumpInner.scrollWidth <= jumpInner.clientWidth) return;
		const link = jumpInner.querySelector('.jump-link[href="#' + activeId + '"]');
		if (!link) return;
		const c = jumpInner.getBoundingClientRect();
		const l = link.getBoundingClientRect();
		const target = jumpInner.scrollLeft + (l.left - c.left) - (c.width - l.width) / 2;
		jumpInner.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
	}

	$: if (jumpInner && activeId) scrollActiveIntoView();

	/** @param {string} id */
	function jumpTo(id) {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth' });
		activeId = id;
		history.replaceState(null, '', '#' + id);
	}

	onMount(() => {
		measure();
		window.addEventListener('resize', measure);
		jumpInner?.addEventListener('scroll', updateScrollEdges, { passive: true });

		const observed = Array.from(document.querySelectorAll('.analytics-section'));
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]?.target?.id) activeId = visible[0].target.id;
			},
			{ rootMargin: '-45% 0px -50% 0px', threshold: 0 }
		);
		observed.forEach((s) => observer.observe(s));

		// Re-correct a deep-linked anchor once the sticky offsets are known.
		const hashId = location.hash.slice(1);
		if (hashId && document.getElementById(hashId)) {
			requestAnimationFrame(() => {
				document.getElementById(hashId)?.scrollIntoView();
				activeId = hashId;
			});
		}

		return () => {
			window.removeEventListener('resize', measure);
			jumpInner?.removeEventListener('scroll', updateScrollEdges);
			observer.disconnect();
		};
	});
</script>

<PageMeta title={t.metaTitle} description={t.metaDescription} />

<main class="analytics" style="--analytics-nav-top: {navTop}px; --analytics-anchor: {anchorOffset}px;">
	<!-- ── Masthead — deliberately source-neutral, so new datasets can slot in ── -->
	<header class="masthead">
		<Rail />
		<div class="masthead-inner">
			<p class="eyebrow">{t.eyebrow}</p>
			<h1 class="page-title">{t.pageTitle}</h1>
			<p class="lede">{t.lede}</p>
			<!-- The page accumulates datasets with different field periods, so it needs
			     its own "as of" separate from any single poll's dates. -->
			<p class="dateline">
				{t.datelineLabel}
				<time datetime={LAST_UPDATED}>{dateline}</time>
			</p>
		</div>
	</header>

	<div class="masthead-rail"><Rail /></div>

	<!-- ── Sticky "On this page" ribbon ────────────────────────── -->
	<nav
		class="jump"
		class:has-left-fade={canScrollLeft}
		class:has-right-fade={canScrollRight}
		aria-label={t.onThisPage}
		bind:this={jumpBar}
	>
		<!-- The frame is capped to the content column and holds the edge fades; the
		     scroller inside it is what moves. -->
		<div class="jump-frame">
			<div class="jump-inner" bind:this={jumpInner}>
				<span class="jump-label">{t.onThisPage}</span>
				<ul class="jump-list">
					{#each sections as s}
						<li>
							<a
								class="jump-link"
								class:is-active={activeId === s.id}
								href={'#' + s.id}
								aria-current={activeId === s.id ? 'true' : undefined}
								on:click|preventDefault={() => jumpTo(s.id)}
							>
								{s.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</nav>

	<!-- ── Disclosure (applies to the whole page, so it stays up top) ── -->
	<section class="disclosure" aria-label="Source disclosure">
		<p><strong>{t.noteLabel}</strong> {t.noteBody}</p>
	</section>

	<!-- ── District polling ─────────────────────────────────────── -->
	<section id="district-polling" class="analytics-section charts" aria-labelledby="district-title">
		<header class="section-head">
			<div class="section-rail"><Rail height="4px" /></div>
			<h2 class="section-title" id="district-title">{t.nav.districtPolling}</h2>
		</header>

		<!-- One block per district poll, newest first. Each carries its own snapshot, so a
		     reader always knows which survey a chart came from. -->
		{#each blocks as b, i (b.pollId)}
			<div class="poll-block" id="survey-{b.pollId}">
				<h3 class="poll-title">{b.copy.title}</h3>

				<!-- The ballot test leads: both candidates' shares and the margin they sit
				     within, rather than one side's number. -->
				<div class="snapshot">
					<div class="snapshot-head">
						<div
							class="matchup"
							role="img"
							aria-label={b.candidateRows.map((c) => `${c.label} ${f1(c.value)}%`).join(', ')}
						>
							<p class="hero-figure matchup-figure">
								{f1(b.candidateRows[0].value)}<span class="hero-unit">%</span>
							</p>
							<span class="matchup-vs">{t.pollBlock.vs}</span>
							<p class="hero-figure matchup-figure">
								{f1(b.candidateRows[1].value)}<span class="hero-unit">%</span>
							</p>
							<p class="matchup-name">
								<span class="matchup-key" style="background:{b.candidateRows[0].color}"></span>
								{b.candidateRows[0].label}
							</p>
							<span></span>
							<p class="matchup-name">
								<span class="matchup-key" style="background:{b.candidateRows[1].color}"></span>
								{b.candidateRows[1].label}
							</p>
						</div>
						<div class="hero-copy">
							<p class="hero-label">{b.copy.heroLabel}</p>
							<p class="hero-sub">{b.heroSub}</p>
						</div>
					</div>
					<dl class="meta-row">
						{#each pollMeta(b.pollId) as m}
							<div class="meta"><dt>{m.dt}</dt><dd>{m.dd}</dd></div>
						{/each}
					</dl>
				</div>

				<ChartFrame
					level={4}
					eyebrow={t.eyebrows.ballot}
					title={t.pollBlock.ballot.title}
					question={t.pollBlock.ballot.question}
					takeaway={b.takeaway}
					legend={ballotLegend}
					source={b.source}
					tableColumns={[
						t.pollBlock.col.response,
						t.pollBlock.col.share,
						fill(t.pollBlock.col.range, { moe: fmtMoe(b.moe) })
					]}
					tableRows={b.tableRows}
				>
					<MarginPlot
						rows={b.candidateRows}
						moe={b.moe}
						bandLabel={fill(t.pollBlock.ballot.bandKey, { moe: fmtMoe(b.moe) })}
						ariaLabel={fill(t.pollBlock.ballot.ariaLabel, {
							crosby: f1(b.candidateRows.find((c) => c.key === 'crosby')?.value ?? 0),
							moore: f1(b.candidateRows.find((c) => c.key === 'moore')?.value ?? 0),
							moe: fmtMoe(b.moe)
						})}
					/>
					<div class="plot-divider"></div>
					<ShareBar
						rows={[b.groupRows[0]].map((r) => ({ ...r, label: t.pollBlock.ballot.barLabel }))}
						ariaLabel={t.pollBlock.ballot.barAria}
					/>
				</ChartFrame>

				<ChartFrame
					level={4}
					eyebrow={t.eyebrows.crosstabs}
					title={t.pollBlock.byParty.title}
					question={t.pollBlock.ballot.question}
					takeaway={b.byPartyTakeaway}
					legend={ballotLegend}
					note={t.pollBlock.byParty.note}
					source={b.source}
					tableColumns={[t.pollBlock.col.group, ...BALLOT_ORDER.map((k) => t.pollBlock.options[k])]}
					tableRows={b.groupRows.map((r) => [
						`${r.label} (${r.sublabel})`,
						...r.segments.map((seg) => `${f1(seg.value)}%`)
					])}
				>
					<ShareBar rows={b.groupRows} ariaLabel={t.pollBlock.byParty.ariaLabel} />
				</ChartFrame>

				<!-- The trend sits in the newest block, where a reader meets it right after
				     that survey's own figures. -->
				{#if i === 0}
					<ChartFrame
						level={4}
						eyebrow={t.eyebrows.trend}
						title={t.ballotTrend.title}
						question={t.pollBlock.ballot.question}
						takeaway={ballotTrendTakeaway}
						source={pairSource}
						tableColumns={[t.pollBlock.col.response, t.trendPair.colFrom, t.trendPair.colTo]}
						tableRows={ballotTrendRows.map((r) => [r.label, `${f1(r.from)}%`, `${f1(r.to)}%`])}
					>
						<Dumbbell
							groups={ballotTrendGroups}
							fromColor={CHANGE_COLORS.from}
							toColor={CHANGE_COLORS.to}
							fromLabel={t.trendPair.from}
							toLabel={t.trendPair.to}
							max={50}
							digits={1}
							ariaLabel={t.ballotTrend.ariaLabel}
						/>
					</ChartFrame>
				{/if}

				<ChartFrame
					level={4}
					eyebrow={t.eyebrows.issues}
					title={t.pollBlock.concerns.title}
					question={t.pollBlock.concerns.question}
					takeaway={b.concernTakeaway}
					note={t.pollBlock.concerns.note}
					source={b.source}
					tableColumns={[t.pollBlock.col.concern, t.pollBlock.col.share]}
					tableRows={b.concernRows.map((r) => [r.label, `${f1(r.value)}%`])}
				>
					<RankedBars
						rows={b.concernRows}
						color={SERIES_COLOR}
						ariaLabel={t.pollBlock.concerns.ariaLabel}
					/>
				</ChartFrame>

				<!-- A heatmap rather than a dot plot: five groups is more than a dot plot can
				     keep apart by color, and the grid needs no group colors at all. -->
				<ChartFrame
					level={4}
					eyebrow={t.eyebrows.crosstabs}
					title={t.pollBlock.concernsByParty.title}
					question={t.pollBlock.concerns.question}
					takeaway={t.pollBlock.concernsByParty.takeaway}
					note={b.heatNote}
					source={b.source}
				>
					<Heatmap
						columns={b.heatColumns}
						rows={b.heatRows}
						ramp={SEQUENTIAL_RAMP}
						caption={t.pollBlock.concernsByParty.caption}
						rowHeader={t.pollBlock.concernsByParty.rowHeader}
						scaleLabel={t.pollBlock.concernsByParty.scaleLabel}
						separateFirst
					/>
				</ChartFrame>

				{#if i === 0}
					<ChartFrame
						level={4}
						eyebrow={t.eyebrows.trend}
						title={t.concernsTrend.title}
						question={t.pollBlock.concerns.question}
						takeaway={t.concernsTrend.takeaway}
						note={t.pollBlock.concerns.note}
						source={pairSource}
						tableColumns={[t.pollBlock.col.concern, t.trendPair.colFrom, t.trendPair.colTo]}
						tableRows={concernTrendGroups[0].rows.map((r) => [
							r.label,
							`${f1(r.from)}%`,
							`${f1(r.to)}%`
						])}
					>
						<Dumbbell
							groups={concernTrendGroups}
							fromColor={CHANGE_COLORS.from}
							toColor={CHANGE_COLORS.to}
							fromLabel={t.trendPair.from}
							toLabel={t.trendPair.to}
							digits={1}
							ariaLabel={t.concernsTrend.ariaLabel}
						/>
					</ChartFrame>
				{/if}

				<!-- August → September pairs with the September survey, so it rides in that
				     block rather than the newest one. -->
				{#if b.pollId === SEP_ID}
					<ChartFrame
						level={4}
						eyebrow={t.eyebrows.change}
						title={t.change.title}
						takeaway={t.change.takeaway}
						source={fill(t.change.source, {
							aug: pollsById[AUG_ID].fieldLabel,
							augN: POLLS[AUG_ID].sampleSize ?? '',
							sep: pollsById[SEP_ID].fieldLabel,
							sepN: POLLS[SEP_ID].sampleSize ?? ''
						})}
						tableColumns={[t.change.colIssue, t.change.colGroup, t.change.colAug, t.change.colSep]}
						tableRows={changeTableRows}
					>
						<Dumbbell
							groups={changeGroups}
							fromColor={CHANGE_COLORS.from}
							toColor={CHANGE_COLORS.to}
							fromLabel={t.change.from}
							toLabel={t.change.to}
							ariaLabel={t.change.ariaLabel}
						/>
					</ChartFrame>
				{/if}
			</div>
		{/each}

		<div class="poll-block" id="survey-aug-2026">
			<h3 class="poll-title">{t.blockTitles.aug}</h3>

			<div class="snapshot">
				<div class="snapshot-head">
					<p class="hero-figure">{hero.value}<span class="hero-unit">{hero.unit}</span></p>
					<div class="hero-copy">
						<p class="hero-label">{statText(hero).label}</p>
						<p class="hero-sub">{statText(hero).sub}</p>
					</div>
				</div>
				<dl class="meta-row">
					{#each pollMeta(AUG_ID) as m}
						<div class="meta"><dt>{m.dt}</dt><dd>{m.dd}</dd></div>
					{/each}
				</dl>
			</div>

			<div class="kpi-row">
				{#each rest as stat}
					<article class="kpi">
						<p class="kpi-value">{stat.value}<span class="kpi-unit">{stat.unit}</span></p>
						<p class="kpi-label">{statText(stat).label}</p>
						<p class="kpi-sub">{statText(stat).sub}</p>
					</article>
				{/each}
			</div>

			{#each likertQuestions as q}
				{@const o = t.byId[q.id]}
				{@const segLabels = q.segments.map((s, si) => o?.segments?.[si] ?? s.label)}
				{@const localSegments = q.segments.map((s, si) => ({ ...s, label: segLabels[si] }))}
				<ChartFrame
					level={4}
					eyebrow={t.eyebrows.internal}
					title={o?.title ?? q.shortTitle}
					question={o?.question ?? q.question}
					takeaway={o?.takeaway ?? q.takeaway}
					source={q.responseRate
						? `${sourceFor(q.pollId)} ${fill(t.responseRate, { rate: q.responseRate })}`
						: sourceFor(q.pollId)}
					legend={localSegments.map((s) => ({ label: s.label, color: s.color }))}
					tableColumns={[t.likertTable.response, t.likertTable.share]}
					tableRows={localSegments.map((s) => [s.label, `${s.value}%`])}
				>
					<DivergingStackedBar segments={localSegments} ariaLabel={o?.question ?? q.question} />
				</ChartFrame>
			{/each}
		</div>
	</section>

	<!-- ── Statewide context ────────────────────────────────────── -->
	<section id="statewide-context" class="analytics-section charts" aria-labelledby="statewide-title">
		<header class="section-head">
			<div class="section-rail"><Rail height="4px" /></div>
			<h2 class="section-title" id="statewide-title">{t.nav.statewideContext}</h2>
		</header>

		<ChartFrame
			eyebrow={t.eyebrows.publicPoll}
			title={t.approval.title}
			takeaway={t.approval.takeaway}
			source={fill(t.approval.source, {
				pollster: pollsById[statewideApproval.pollId].pollster,
				period: pollsById[statewideApproval.pollId].fieldLabel
			})}
			tableColumns={[
				t.approval.colOfficeHolder,
				t.approval.colApprove,
				t.approval.colDisapprove,
				t.approval.colNet
			]}
			tableRows={approvalRows.map((r) => [
				r.name,
				r.approve === null ? t.approval.notReported : `${r.approve}%`,
				r.disapprove === null ? t.approval.notReported : `${r.disapprove}%`,
				r.net > 0 ? `+${r.net}` : `${r.net}`
			])}
		>
			<NetApprovalBar rows={approvalRows} ariaLabel={t.approval.ariaLabel} />
		</ChartFrame>

		<div class="trend-card">
			<p class="trend-eyebrow">{t.trend.eyebrow}</p>
			<!-- Kept on one line: indentation between the blocks would render as stray spaces. -->
			<p class="trend-headline">{#each trendParts as part}{#if part.key === 'delta'}<span class="trend-delta">{part.text}</span>{:else if part.key === 'from' || part.key === 'to'}<span class="trend-num">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
			<p class="trend-source">
				{fill(t.trend.source, {
					pollster: pollsById[coxApprovalTrend.pollId].pollster,
					period: pollsById[coxApprovalTrend.pollId].fieldLabel
				})}
			</p>
		</div>
	</section>

	<!-- ── Ground game ──────────────────────────────────────────── -->
	<section id="ground-game" class="analytics-section ground" aria-labelledby="ground-title">
		<header class="section-head">
			<div class="section-rail"><Rail height="4px" /></div>
			<h2 class="section-title" id="ground-title">{t.nav.groundGame}</h2>
		</header>
		<p class="ground-note">{t.ground.note}</p>
		<div class="ground-grid">
			{#each groundGame as item}
				<article class="ground-stat">
					<p class="ground-value">{item.prefix ?? ''}{item.value}{item.unit}</p>
					<p class="ground-label">{t.byId[item.id]?.label ?? item.label}</p>
					<p class="ground-sub">{t.byId[item.id]?.note ?? item.note}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- ── Methodology ──────────────────────────────────────────── -->
	<section id="methodology" class="analytics-section method" aria-labelledby="method-title">
		<header class="section-head">
			<div class="section-rail"><Rail height="4px" /></div>
			<h2 class="section-title" id="method-title">{t.nav.methodology}</h2>
		</header>

		<!-- One card per poll in the registry, so adding a poll to `POLLS` (plus its
		     translated entry) surfaces its methodology here without new markup. -->
		<div class="method-grid">
			{#each methodPolls as poll}
				{@const text = pollsById[poll.id]}
				<article class="method-card">
					<h3 class="method-card-title">{text.methodTitle}</h3>
					<dl class="method-list">
						<div>
							<dt>{poll.partisan ? t.method.sponsor : t.method.pollster}</dt>
							<dd>{text.pollster}</dd>
						</div>
						{#if poll.sampleSize !== null}
							<div>
								<dt>{t.method.sample}</dt>
								<dd>
									{fill(t.method.sampleValue, {
										n: poll.sampleSize,
										population: text.population
									})}
								</dd>
							</div>
						{/if}
						<div><dt>{t.method.geography}</dt><dd>{text.geography}</dd></div>
						<div>
							<dt>{poll.sampleSize !== null ? t.method.fieldDates : t.method.fieldPeriod}</dt>
							<dd>{text.fieldLabel}</dd>
						</div>
						{#if poll.marginOfError !== null}
							<div>
								<dt>{t.method.marginOfError}</dt>
								<dd>{fill(t.method.moeValue, { moe: poll.marginOfError })}</dd>
							</div>
						{/if}
						<div><dt>{t.method.partisanship}</dt><dd>{text.partisanship}</dd></div>
					</dl>
					{#if poll.releaseId}
						<a class="method-link" href="/press/{poll.releaseId}">{t.method.readRelease}</a>
					{:else if poll.url}
						<a class="method-link" href={poll.url} target="_blank" rel="noopener noreferrer">
							{t.method.readPoll}
						</a>
					{/if}
				</article>
			{/each}
		</div>

		{#if SHOW_LIMITS}
		<div class="limits">
			<h3 class="limits-title">{t.limits.title}</h3>
			<p class="limits-intro">{t.limits.intro}</p>
			<ul class="limits-list">
				{#each t.limits.items as item}
					<li>
						<strong>{item.label}</strong>
						{fill(item.text, { n: featuredPoll.sampleSize ?? '' })}
					</li>
				{/each}
			</ul>
		</div>
		{/if}
	</section>
</main>

<style>
	.analytics {
		width: 100%;
	}

	/* ── Masthead ─────────────────────────────────────────────── */
	.masthead {
		background: var(--ink-deep);
		color: var(--paper);
	}

	.masthead-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 2.75rem 1.5rem 3rem;
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
		letter-spacing: -0.01em;
	}

	.lede {
		margin: 1.15rem 0 0;
		max-width: 64ch;
		font-family: var(--serif);
		font-size: clamp(1rem, 1.7vw, 1.15rem);
		line-height: 1.6;
		color: var(--paper-3);
	}

	/* Mono + uppercase, matching the site's date/meta voice. */
	.dateline {
		margin: 1.35rem 0 0;
		font-family: var(--mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--sky);
	}

	.masthead-rail {
		line-height: 0;
	}

	/* ── Sticky "On this page" ribbon ─────────────────────────── */
	.jump {
		position: sticky;
		top: var(--analytics-nav-top, 4rem);
		z-index: 50;
		background: var(--blue);
		border-bottom: 1px solid rgba(9, 27, 54, 0.2);
		/* The page gutter, so the frame inside lines up with the section content. */
		padding-inline: 1.5rem;
	}

	/* Edge fades live on the non-scrolling frame (capped to the content column), so
	   they sit exactly at the scroller's clip edges, not out at the edges of the
	   full-width bar where they'd miss the cut-off words on wide screens. */
	.jump-frame::before,
	.jump-frame::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2.75rem;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.18s ease;
		z-index: 1;
	}

	.jump-frame::before {
		left: 0;
		background: linear-gradient(90deg, var(--blue), rgba(46, 95, 160, 0));
	}

	.jump-frame::after {
		right: 0;
		background: linear-gradient(270deg, var(--blue), rgba(46, 95, 160, 0));
	}

	.jump.has-left-fade .jump-frame::before,
	.jump.has-right-fade .jump-frame::after {
		opacity: 1;
	}

	/* Capped to the same 1120px column as the sections, so the links never run wider
	   than the page content. */
	.jump-frame {
		position: relative;
		max-width: 1120px;
		margin: 0 auto;
	}

	/* The scroller fills the frame, so its clip edges are the frame's edges. */
	.jump-inner {
		padding: 0.55rem 0;
		display: flex;
		align-items: center;
		gap: 1.625rem;
		min-width: 0;
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
		align-items: center;
		flex-wrap: nowrap;
		flex-shrink: 0;
		gap: 1.5rem;
		min-width: 0;
	}

	.jump-list::after {
		content: '';
		flex: 0 0 1.5rem;
	}

	.jump-list li {
		margin: 0;
	}

	.jump-link {
		display: inline-block;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: rgba(247, 250, 252, 0.82);
		text-decoration: none;
		padding: 0.25rem 0;
		border-bottom: 2px solid transparent;
		white-space: nowrap;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.jump-link:hover {
		color: var(--paper);
	}

	.jump-link.is-active {
		color: var(--paper);
		border-bottom-color: var(--paper);
	}

	/* ── Disclosure ───────────────────────────────────────────── */
	.disclosure {
		background: var(--paper-2);
		border-bottom: 1px solid var(--line-l);
	}

	.disclosure p {
		max-width: 1120px;
		margin: 0 auto;
		padding: 1.15rem 1.5rem;
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--ink);
	}

	.disclosure strong {
		color: var(--blue);
	}

	/* ── Sections ─────────────────────────────────────────────── */
	.analytics-section {
		scroll-margin-top: var(--analytics-anchor, 6rem);
	}

	.charts,
	.method,
	.ground {
		max-width: 1120px;
		margin: 0 auto;
		padding: 4rem 1.5rem 0;
	}

	/* A hairline between consecutive sections, so a new analysis reads as a new
	   section rather than as one more card in the previous one. The first section
	   skips it — the disclosure band above already closes the masthead. */
	.analytics-section + .analytics-section {
		border-top: 1px solid var(--line-l);
	}

	/* Section headings have to outrank the chart titles inside them; both are
	   display italic, so size alone was doing the work and losing. The rail is the
	   brand's section marker (it tops the nav and the hero frame). */
	.section-head {
		margin: 0 0 2rem;
	}

	.section-rail {
		width: 72px;
		margin-bottom: 1rem;
	}

	.section-title {
		margin: 0;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.9rem, 3.6vw, 2.5rem);
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: var(--ink);
	}

	/* ── Poll snapshot (headline figure + this survey's methodology) ── */
	.snapshot {
		border: 1px solid var(--line-l);
		border-left: 3px solid var(--blue);
		background: var(--paper);
		padding: 1.6rem 1.75rem;
		margin-bottom: 1.5rem;
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

	/* ── District poll blocks, newest first ───────────────────── */
	.poll-block {
		scroll-margin-top: var(--analytics-anchor, 6rem);
	}

	.poll-block + .poll-block {
		margin-top: 3.5rem;
		padding-top: 2.75rem;
		border-top: 1px solid var(--line-l);
	}

	/* Sits between the section title (h2) and the chart titles (h4) in weight. */
	.poll-title {
		margin: 0 0 1.1rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.35rem;
		letter-spacing: -0.01em;
		line-height: 1.2;
		color: var(--ink);
	}

	/* Ballot-test hero: both shares side by side. The figures stay in ink — identity
	   comes from the colored key beside each name, never from coloring the number. */
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

	/* Between the margin plot and the all-responses bar in the ballot card. */
	.plot-divider {
		margin: 1.4rem 0 0.9rem;
		border-top: 1px solid var(--line-l-2);
	}

	/* ── KPI row ──────────────────────────────────────────────── */
	/* Fixed column counts (4 → 2 → 1) rather than auto-fit: four tiles in an auto-fit
	   grid wrap 3 + 1 at mid widths, and the empty cells show the gap color. */
	.kpi-row {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		background: var(--line-l);
		border: 1px solid var(--line-l);
		margin-bottom: 1.5rem;
	}

	.kpi {
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

	.kpi-label {
		margin: 0.7rem 0 0;
		font-size: 0.92rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--ink);
	}

	.kpi-sub {
		margin: 0.3rem 0 0;
		font-size: 0.8rem;
		line-height: 1.45;
		color: #5b6b80;
	}

	@media (max-width: 1023px) {
		.kpi-row {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.kpi-row {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	/* Space between stacked chart cards (ChartFrame renders .frame). */
	.charts :global(.frame) {
		margin-bottom: 1.5rem;
	}

	.trend-card {
		padding: 1.75rem;
		background: var(--ink-2);
		color: var(--paper);
	}

	.trend-eyebrow {
		margin: 0 0 0.6rem;
		font-family: var(--mono);
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--sky);
	}

	.trend-num {
		font-family: var(--mono);
		color: var(--sky);
	}

	.trend-delta {
		font-family: var(--mono);
		color: #e8a33d;
	}

	.trend-headline {
		margin: 0;
		font-family: var(--serif);
		font-size: clamp(1.05rem, 2.2vw, 1.35rem);
		line-height: 1.5;
		max-width: 60ch;
	}

	.trend-source {
		margin: 1rem 0 0;
		font-size: 0.72rem;
		color: var(--paper-3);
	}

	/* ── Ground game ──────────────────────────────────────────── */
	.ground-note {
		margin: -1rem 0 1.5rem;
		font-size: 0.85rem;
		color: #5b6b80;
		max-width: 60ch;
	}

	/* Fixed column counts (4 → 2 → 1, set below), like the KPI row: four cards in an
	   auto-fit grid wrap 3 + 1 at mid widths, and the empty cells show the gap color. */
	.ground-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		background: var(--line-l);
		border: 1px solid var(--line-l);
	}

	.ground-stat {
		background: var(--paper);
		padding: 1.3rem 1.25rem;
	}

	.ground-value {
		margin: 0;
		font-family: var(--sans);
		font-weight: 700;
		font-size: 2.1rem;
		line-height: 1;
		color: var(--green);
	}

	.ground-label {
		margin: 0.6rem 0 0;
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--ink);
	}

	.ground-sub {
		margin: 0.25rem 0 0;
		font-size: 0.78rem;
		color: #5b6b80;
	}

	@media (max-width: 1023px) {
		.ground-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.ground-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	/* ── Methodology ──────────────────────────────────────────── */
	.method {
		padding-bottom: 4rem;
	}

	.method-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.method-card {
		padding: 1.6rem;
		background: var(--paper);
		border: 1px solid var(--line-l);
	}

	.method-card-title {
		margin: 0 0 1rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.1rem;
		color: var(--ink);
	}

	.method-list {
		margin: 0;
	}

	.method-list > div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--line-l-2);
	}

	.method-list dt {
		font-family: var(--mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #5b6b80;
		flex: none;
	}

	.method-list dd {
		margin: 0;
		font-size: 0.84rem;
		text-align: right;
		color: var(--ink);
	}

	.method-link {
		display: inline-block;
		margin-top: 1.1rem;
		font-family: var(--mono);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--blue);
		text-decoration: none;
	}

	.method-link:hover {
		text-decoration: underline;
	}

	.limits {
		margin-top: 2rem;
		padding: 1.75rem;
		background: var(--paper-2);
		border-left: 3px solid var(--green);
	}

	.limits-title {
		margin: 0 0 0.75rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 1.15rem;
		color: var(--ink);
	}

	.limits-intro {
		margin: 0 0 1rem;
		font-size: 0.92rem;
		line-height: 1.6;
		max-width: 68ch;
		color: var(--ink);
	}

	.limits-list {
		margin: 0;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.7rem;
	}

	.limits-list li {
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--ink);
		max-width: 68ch;
	}

	.limits-list strong {
		color: var(--blue);
	}

	@media (max-width: 768px) {
		/* `.layout-main` already supplies the page gutter on mobile, so these inner
		   containers drop their own horizontal padding — otherwise it doubles up. */
		.charts,
		.method,
		.ground {
			padding-left: 0;
			padding-right: 0;
		}

		/* Bleed the full-width bands past the layout gutter so they span the screen
		   like the site nav above, instead of floating inset with a visible notch on
		   either side. (Light sections stay contained; these are dark/tinted bands.) */
		.masthead,
		.masthead-rail,
		.jump,
		.disclosure {
			margin-left: calc(-1 * var(--mobile-margin));
			margin-right: calc(-1 * var(--mobile-margin));
		}

		/* Full-bleed on mobile: the frame and its fades reach the screen edges. */
		.jump {
			padding-inline: 0;
		}

		/* Re-add the gutter inside the bled bands so their text still lines up with
		   the body copy below. */
		.masthead-inner,
		.disclosure p {
			padding-left: var(--mobile-margin);
			padding-right: var(--mobile-margin);
		}

		/* The trailing gutter lives on .jump-list::after, so no padding-right here. */
		.jump-inner {
			padding-left: var(--mobile-margin);
			padding-right: 0;
		}

		/* Reclaim the space on narrow screens — the nav's aria-label carries it. */
		.jump-label {
			display: none;
		}

		.snapshot {
			padding: 1.2rem 1.25rem;
		}

		.meta-row {
			gap: 1.1rem 1.5rem;
		}
	}
</style>
