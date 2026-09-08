<script>
	import { onMount } from 'svelte';
	import { messages } from '$lib/i18n/locale';
	import { fill, fillParts } from '$lib/i18n/interpolate';
	import Rail from '$lib/components/Rail.svelte';
	import ChartFrame from '$lib/components/analytics/ChartFrame.svelte';
	import DivergingStackedBar from '$lib/components/analytics/DivergingStackedBar.svelte';
	import DotPlot from '$lib/components/analytics/DotPlot.svelte';
	import NetApprovalBar from '$lib/components/analytics/NetApprovalBar.svelte';
	import {
		INTERNAL_POLL,
		HINCKLEY_POLL,
		likertQuestions,
		softSupportByParty,
		issuePriorities,
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

	/** The internal-poll source line, assembled from translated parts. */
	$: internalSource = fill(t.sourceInternal, {
		pollster: 'Peter Crosby for Congress',
		n: INTERNAL_POLL.sampleSize,
		population: t.pollMeta.population,
		geography: t.pollMeta.geography,
		dates: t.pollMeta.fieldLabel,
		moe: INTERNAL_POLL.marginOfError
	});

	/** Party colors — validated all-pairs (worst CVD ΔE 18.0) on the paper surface. */
	const GROUP_COLORS = {
		all: '#2E5FA0',
		republican: '#E8A33D',
		unaffiliated: '#2F7D46'
	};

	$: issueRows = issuePriorities.map((it) => ({
		label: t.byId[it.id]?.label ?? it.issue,
		sublabel: t.byId[it.id]?.detail ?? it.detail,
		points: [
			{ series: t.groups.all, value: it.all, color: GROUP_COLORS.all },
			{ series: t.groups.republican, value: it.republican, color: GROUP_COLORS.republican },
			{ series: t.groups.unaffiliated, value: it.unaffiliated, color: GROUP_COLORS.unaffiliated }
		]
	}));

	$: softSupportRows = softSupportByParty.map((r) => ({
		label: t.byId[r.id]?.label ?? r.group,
		sublabel: r.electorateShare
			? fill(t.softSupport.electorateShare, { pct: r.electorateShare })
			: undefined,
		points: [
			{ series: t.byId[r.id]?.label ?? r.group, value: r.value, color: GROUP_COLORS.all }
		]
	}));

	/** Approval rows with translated names/roles for the chart and its table. */
	$: approvalRows = statewideApproval.map((r) => ({
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

<svelte:head>
	<title>{t.metaTitle}</title>
	<meta name="description" content={t.metaDescription} />
	<!-- Prototype page: keep it out of search results until the campaign signs off. -->
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="analytics" style="--analytics-nav-top: {navTop}px; --analytics-anchor: {anchorOffset}px;">
	<!-- ── Masthead — deliberately source-neutral, so new datasets can slot in ── -->
	<header class="masthead">
		<Rail />
		<div class="masthead-inner">
			<p class="eyebrow">{t.eyebrow}</p>
			<h1 class="page-title">{t.pageTitle}</h1>
			<p class="lede">{t.lede}</p>
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
	</nav>

	<!-- ── Disclosure (applies to the whole page, so it stays up top) ── -->
	<section class="disclosure" aria-label="Source disclosure">
		<p><strong>{t.noteLabel}</strong> {t.noteBody}</p>
	</section>

	<!-- ── District polling ─────────────────────────────────────── -->
	<section id="district-polling" class="analytics-section charts" aria-labelledby="district-title">
		<h2 class="section-title" id="district-title">{t.nav.districtPolling}</h2>

		<!-- Poll snapshot: the headline figure and this survey's methodology, kept
		     with the data they describe rather than in the page masthead. -->
		<div class="snapshot">
			<div class="snapshot-head">
				<p class="hero-figure">{hero.value}<span class="hero-unit">{hero.unit}</span></p>
				<div class="hero-copy">
					<p class="hero-label">{statText(hero).label}</p>
					<p class="hero-sub">{statText(hero).sub}</p>
				</div>
			</div>
			<dl class="meta-row">
				<div class="meta">
					<dt>{t.meta.fieldDates}</dt>
					<dd>{t.pollMeta.fieldLabel}</dd>
				</div>
				<div class="meta">
					<dt>{t.meta.sample}</dt>
					<dd>{fill(t.meta.sampleValue, { n: INTERNAL_POLL.sampleSize })}</dd>
				</div>
				<div class="meta">
					<dt>{t.meta.marginOfError}</dt>
					<dd>{fill(t.meta.moeValue, { moe: INTERNAL_POLL.marginOfError })}</dd>
				</div>
				<div class="meta">
					<dt>{t.meta.geography}</dt>
					<dd>{t.meta.geographyValue}</dd>
				</div>
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
				eyebrow={t.eyebrows.internal}
				title={o?.title ?? q.shortTitle}
				question={o?.question ?? q.question}
				takeaway={o?.takeaway ?? q.takeaway}
				source={q.responseRate
					? `${internalSource} ${fill(t.responseRate, { rate: q.responseRate })}`
					: internalSource}
				legend={localSegments.map((s) => ({ label: s.label, color: s.color }))}
				tableColumns={[t.likertTable.response, t.likertTable.share]}
				tableRows={localSegments.map((s) => [s.label, `${s.value}%`])}
			>
				<DivergingStackedBar segments={localSegments} ariaLabel={o?.question ?? q.question} />
			</ChartFrame>
		{/each}

		<ChartFrame
			eyebrow={t.eyebrows.crosstabs}
			title={t.softSupport.title}
			takeaway={t.softSupport.takeaway}
			source={internalSource}
			tableColumns={[t.softSupport.colGroup, t.softSupport.colShare, t.softSupport.colMeasure]}
			tableRows={softSupportByParty.map((r) => [
				t.byId[r.id]?.label ?? r.group,
				`${r.value}%`,
				t.byId[r.id]?.note ?? r.note ?? ''
			])}
		>
			<DotPlot rows={softSupportRows} max={80} ariaLabel={t.softSupport.ariaLabel} />
		</ChartFrame>

		<ChartFrame
			eyebrow={t.eyebrows.issues}
			title={t.issues.title}
			takeaway={t.issues.takeaway}
			source={internalSource}
			legend={[
				{ label: t.groups.all, color: GROUP_COLORS.all },
				{ label: t.groups.republican, color: GROUP_COLORS.republican },
				{ label: t.groups.unaffiliated, color: GROUP_COLORS.unaffiliated }
			]}
			tableColumns={[
				t.issues.colIssue,
				t.issues.colAll,
				t.issues.colRepublican,
				t.issues.colUnaffiliated
			]}
			tableRows={issuePriorities.map((it) => [
				t.byId[it.id]?.label ?? it.issue,
				`${it.all}%`,
				`${it.republican}%`,
				`${it.unaffiliated}%`
			])}
		>
			<DotPlot rows={issueRows} max={100} ariaLabel={t.issues.ariaLabel} />
		</ChartFrame>
	</section>

	<!-- ── Statewide context ────────────────────────────────────── -->
	<section id="statewide-context" class="analytics-section charts" aria-labelledby="statewide-title">
		<h2 class="section-title" id="statewide-title">{t.nav.statewideContext}</h2>

		<ChartFrame
			eyebrow={t.eyebrows.publicPoll}
			title={t.approval.title}
			takeaway={t.approval.takeaway}
			source={fill(t.approval.source, {
				pollster: HINCKLEY_POLL.pollster,
				period: t.pollMeta.hinckleyPeriod
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
					pollster: HINCKLEY_POLL.pollster,
					period: t.pollMeta.hinckleyPeriod
				})}
			</p>
		</div>
	</section>

	<!-- ── Ground game ──────────────────────────────────────────── -->
	<section id="ground-game" class="analytics-section ground" aria-labelledby="ground-title">
		<h2 class="section-title" id="ground-title">{t.nav.groundGame}</h2>
		<p class="ground-note">{t.ground.note}</p>
		<div class="ground-grid">
			{#each groundGame as item}
				<article class="ground-stat">
					<p class="ground-value">{item.value}{item.unit}</p>
					<p class="ground-label">{t.byId[item.id]?.label ?? item.label}</p>
					<p class="ground-sub">{t.byId[item.id]?.note ?? item.note}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- ── Methodology ──────────────────────────────────────────── -->
	<section id="methodology" class="analytics-section method" aria-labelledby="method-title">
		<h2 class="section-title" id="method-title">{t.nav.methodology}</h2>

		<div class="method-grid">
			<article class="method-card">
				<h3 class="method-card-title">{t.method.internalTitle}</h3>
				<dl class="method-list">
					<div><dt>{t.method.sponsor}</dt><dd>{t.pollMeta.internalPollster}</dd></div>
					<div>
						<dt>{t.method.sample}</dt>
						<dd>
							{fill(t.method.sampleValue, {
								n: INTERNAL_POLL.sampleSize,
								population: t.pollMeta.population
							})}
						</dd>
					</div>
					<div><dt>{t.method.geography}</dt><dd>{t.pollMeta.geography}</dd></div>
					<div><dt>{t.method.fieldDates}</dt><dd>{t.pollMeta.fieldLabel}</dd></div>
					<div>
						<dt>{t.method.marginOfError}</dt>
						<dd>{fill(t.method.moeValue, { moe: INTERNAL_POLL.marginOfError })}</dd>
					</div>
					<div><dt>{t.method.partisanship}</dt><dd>{t.method.internalPartisanship}</dd></div>
				</dl>
				<a class="method-link" href="/press/{INTERNAL_POLL.releaseId}">
					{t.method.readRelease}
				</a>
			</article>

			<article class="method-card">
				<h3 class="method-card-title">{t.method.publicTitle}</h3>
				<dl class="method-list">
					<div><dt>{t.method.pollster}</dt><dd>{HINCKLEY_POLL.pollster}</dd></div>
					<div><dt>{t.method.geography}</dt><dd>{t.pollMeta.hinckleyGeography}</dd></div>
					<div><dt>{t.method.fieldPeriod}</dt><dd>{t.pollMeta.hinckleyPeriod}</dd></div>
					<div><dt>{t.method.partisanship}</dt><dd>{t.method.publicPartisanship}</dd></div>
				</dl>
				<a class="method-link" href={HINCKLEY_POLL.url} target="_blank" rel="noopener noreferrer">
					{t.method.readPoll}
				</a>
			</article>
		</div>

		{#if SHOW_LIMITS}
		<div class="limits">
			<h3 class="limits-title">{t.limits.title}</h3>
			<p class="limits-intro">{t.limits.intro}</p>
			<ul class="limits-list">
				{#each t.limits.items as item}
					<li>
						<strong>{item.label}</strong>
						{fill(item.text, { n: INTERNAL_POLL.sampleSize })}
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
	}

	.jump::before,
	.jump::after {
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

	.jump::before {
		left: 0;
		background: linear-gradient(90deg, var(--blue), rgba(46, 95, 160, 0));
	}

	.jump::after {
		right: 0;
		background: linear-gradient(270deg, var(--blue), rgba(46, 95, 160, 0));
	}

	.jump.has-left-fade::before,
	.jump.has-right-fade::after {
		opacity: 1;
	}

	.jump-inner {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0.55rem 1.5rem;
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
		padding: 3rem 1.5rem 0;
	}

	.section-title {
		margin: 0 0 1.5rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(1.5rem, 3vw, 2rem);
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

	/* ── KPI row ──────────────────────────────────────────────── */
	.kpi-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

	.ground-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
