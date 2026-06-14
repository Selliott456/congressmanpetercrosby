<script>
	import { tick } from 'svelte';
	import { eventsData } from '$lib/data/events';
	import { messages } from '$lib/i18n/locale';
	import EventCard from '$lib/components/EventCard.svelte';
	import RsvpModal from '$lib/components/RsvpModal.svelte';

	const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

	/** @param {number} year @param {number} month @param {number} day */
	function dayAnchorId(year, month, day) {
		return `event-${year}-${month}-${day}`;
	}

	/** @param {import('$lib/data/events').EventRow} e */
	function eventTime(e) {
		return new Date(e.year, e.monthIndex - 1, parseInt(e.day, 10)).getTime();
	}

	/** @param {import('$lib/data/events').EventRow} e */
	function endOfDay(e) {
		const d = new Date(e.year, e.monthIndex - 1, parseInt(e.day, 10));
		d.setHours(23, 59, 59, 999);
		return d;
	}

	/** @param {import('$lib/data/events').EventRow} e */
	function isPastEvent(e) {
		return endOfDay(e) < new Date();
	}

	/** Older than 7 days → hidden by default. @param {import('$lib/data/events').EventRow} e */
	function isOld(e) {
		return endOfDay(e).getTime() < Date.now() - SEVEN_DAYS;
	}

	$: events = eventsData.map((e) => ({
		...e,
		title: $messages.events.byId[e.id]?.title ?? e.title,
		description: $messages.events.byId[e.id]?.description ?? e.description
	}));

	// Shown by default: upcoming + within the last 7 days, soonest first.
	$: upcomingAndRecent = events.filter((e) => !isOld(e)).sort((a, b) => eventTime(a) - eventTime(b));
	// Hidden behind the toggle: older than 7 days, most recent first.
	$: pastEvents = events.filter((e) => isOld(e)).sort((a, b) => eventTime(b) - eventTime(a));
	// Soonest upcoming event = the highlighted "next event".
	$: nextEvent =
		events.filter((e) => !isPastEvent(e)).sort((a, b) => eventTime(a) - eventTime(b))[0] ?? null;

	let showPast = false;

	// The event whose RSVP modal is open (null = closed).
	/** @type {(import('$lib/data/events').EventRow & { title: string; description: string }) | null} */
	let rsvpEvent = null;

	// Anchor the first event of each day so the calendar can jump to it.
	$: anchorByEventId = (() => {
		/** @type {Record<string, string>} */
		const map = {};
		const seen = new Set();
		for (const e of events) {
			const key = `${e.year}-${e.monthIndex}-${parseInt(e.day, 10)}`;
			if (!seen.has(key)) {
				seen.add(key);
				map[e.id] = dayAnchorId(e.year, e.monthIndex, parseInt(e.day, 10));
			}
		}
		return map;
	})();

	/** Jump to the events on a given day; reveal past events first if that day is hidden.
	 * @param {number} year @param {number} month @param {number} day */
	async function jumpToDay(year, month, day) {
		const dayEvents = getEventsOnDate(year, month, day);
		if (dayEvents.some(isOld)) showPast = true;
		await tick();
		const el = document.getElementById(dayAnchorId(year, month, day));
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// --- Calendar (month overview) ---
	let displayYear = new Date().getFullYear();
	let displayMonth = new Date().getMonth() + 1; // 1-12

	/** @param {number} year @param {number} month @param {number} day */
	function hasEventOnDate(year, month, day) {
		return eventsData.some(
			(e) => e.year === year && e.monthIndex === month && parseInt(e.day, 10) === day
		);
	}

	/** @param {number} year @param {number} month @param {number} day */
	function getEventsOnDate(year, month, day) {
		return eventsData.filter(
			(e) => e.year === year && e.monthIndex === month && parseInt(e.day, 10) === day
		);
	}

	/** @param {number} year @param {number} month @param {number} day */
	function isToday(year, month, day) {
		const today = new Date();
		return today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;
	}

	$: calendarWeeks = (() => {
		const first = new Date(displayYear, displayMonth - 1, 1);
		const last = new Date(displayYear, displayMonth, 0);
		const startDow = first.getDay();
		const daysInMonth = last.getDate();
		const totalCells = startDow + daysInMonth;
		const numWeeks = Math.ceil(totalCells / 7);
		const weeks = [];
		let day = 1;
		for (let w = 0; w < numWeeks; w++) {
			const row = [];
			for (let d = 0; d < 7; d++) {
				const cellIndex = w * 7 + d;
				if (cellIndex < startDow || day > daysInMonth) {
					row.push(null);
				} else {
					row.push(day);
					day++;
				}
			}
			weeks.push(row);
		}
		return weeks;
	})();

	function prevMonth() {
		if (displayMonth === 1) {
			displayMonth = 12;
			displayYear--;
		} else {
			displayMonth--;
		}
	}

	function nextMonth() {
		if (displayMonth === 12) {
			displayMonth = 1;
			displayYear++;
		} else {
			displayMonth++;
		}
	}
</script>

<svelte:head>
	<title>{$messages.events.metaTitle}</title>
	<meta name="description" content={$messages.events.metaDescription} />
</svelte:head>

<main class="events-page">
	<header class="events-header">
		<p class="events-eyebrow">{$messages.events.ui.eyebrow}</p>
		<h1 class="events-title">{$messages.events.ui.pageTitle}</h1>
		<p class="events-intro">{$messages.events.ui.intro}</p>
	</header>

	<div class="events-hero">
		<section class="calendar-section" aria-label={$messages.events.ui.calendarAria}>
			<div class="calendar-header">
				<button type="button" class="calendar-nav" aria-label={$messages.events.ui.prevMonth} on:click={prevMonth}>←</button>
				<h2 class="calendar-title">{$messages.events.monthNames[displayMonth - 1]} {displayYear}</h2>
				<button type="button" class="calendar-nav" aria-label={$messages.events.ui.nextMonth} on:click={nextMonth}>→</button>
			</div>
			<div class="calendar-grid">
				{#each $messages.events.dayNames as dayName}
					<div class="calendar-day-name">{dayName}</div>
				{/each}
				{#each calendarWeeks as week}
					{#each week as day}
						{#if day === null}
							<div class="calendar-cell calendar-cell-empty"></div>
						{:else if hasEventOnDate(displayYear, displayMonth, day)}
							<button
								type="button"
								class="calendar-cell calendar-cell-link has-event"
								class:today={isToday(displayYear, displayMonth, day)}
								title={getEventsOnDate(displayYear, displayMonth, day)
									.map((e) => $messages.events.byId[e.id]?.title ?? e.title)
									.join(', ')}
								on:click={() => jumpToDay(displayYear, displayMonth, day)}
							>
								<span class="calendar-day-num">{day}</span>
								<span class="calendar-dot"></span>
							</button>
						{:else}
							<div class="calendar-cell" class:today={isToday(displayYear, displayMonth, day)}>
								<span class="calendar-day-num">{day}</span>
							</div>
						{/if}
					{/each}
				{/each}
			</div>
			<p class="calendar-legend">
				<span class="calendar-legend-dot"></span> {$messages.events.ui.dayWithEvent}
			</p>
		</section>

		<section class="next-event-section" aria-label={$messages.events.ui.nextEvent}>
			<h2 class="next-event-heading">{$messages.events.ui.nextEvent}</h2>
			{#if nextEvent}
				<EventCard event={nextEvent} featured on:rsvp={(e) => (rsvpEvent = e.detail)} />
			{:else}
				<p class="next-event-empty">{$messages.events.ui.noUpcomingEvents}</p>
			{/if}
		</section>
	</div>

	<div class="events-list-section">
		<h2 class="events-list-heading">{$messages.events.ui.upcomingHeading}</h2>
		{#if upcomingAndRecent.length}
			<div class="events-list">
				{#each upcomingAndRecent as event (event.id)}
					<EventCard
						{event}
						anchorId={anchorByEventId[event.id] ?? null}
						on:rsvp={(e) => (rsvpEvent = e.detail)}
					/>
				{/each}
			</div>
		{:else}
			<p class="events-empty">{$messages.events.ui.noUpcomingEvents}</p>
		{/if}

		{#if pastEvents.length}
			<div class="past-toggle-wrap">
				<button
					type="button"
					class="past-toggle"
					aria-expanded={showPast}
					on:click={() => (showPast = !showPast)}
				>
					{showPast
						? $messages.events.ui.hidePast
						: `${$messages.events.ui.viewAllPast} (${pastEvents.length})`}
				</button>
			</div>

			{#if showPast}
				<h2 class="events-list-heading events-list-heading--past">
					{$messages.events.ui.pastHeading}
				</h2>
				<div class="events-list">
					{#each pastEvents as event (event.id)}
						<EventCard
							{event}
							anchorId={anchorByEventId[event.id] ?? null}
							on:rsvp={(e) => (rsvpEvent = e.detail)}
						/>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</main>

{#if rsvpEvent}
	<RsvpModal event={rsvpEvent} on:close={() => (rsvpEvent = null)} />
{/if}

<style>
	.events-page {
		background: var(--paper);
		min-height: 100vh;
		padding-bottom: 4rem;
	}

	.events-header {
		max-width: 1120px;
		margin: 0 auto;
		padding: 3rem 1.5rem 2rem;
		border-bottom: 1px solid var(--line-l);
	}

	.events-eyebrow {
		margin: 0 0 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--blue);
	}

	.events-eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--blue);
	}

	.events-title {
		font-family: var(--display);
		font-style: italic;
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.035em;
		color: var(--ink);
		margin: 0 0 0.75rem 0;
		line-height: 1.02;
	}

	.events-intro {
		max-width: 60ch;
		font-family: var(--serif);
		font-size: 1.125rem;
		line-height: 1.5;
		color: var(--ink-2);
		margin: 0;
	}

	.events-hero {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 2rem;
		max-width: 1120px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		border-bottom: 1px solid var(--line-l);
	}

	.calendar-section {
		flex: 0 0 300px;
		max-width: 300px;
		min-width: 0;
	}

	.next-event-section {
		flex: 1 1 0;
		min-width: 0;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.calendar-title {
		font-family: var(--display);
		font-style: italic;
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--ink);
		margin: 0;
		line-height: 1.2;
	}

	.calendar-nav {
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: 600;
		color: var(--ink);
		background: transparent;
		border: 1px solid var(--line-l);
		border-radius: 0;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s;
	}

	.calendar-nav:hover {
		background: rgba(15, 37, 69, 0.06);
		border-color: var(--ink);
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
		background: var(--line-l-2);
		border: 1px solid var(--line-l-2);
		border-radius: 0;
		overflow: hidden;
	}

	.calendar-day-name {
		font-family: var(--mono);
		font-size: 0.5625rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--ink-2);
		padding: 0.25rem;
		text-align: center;
		background: var(--color-white);
	}

	.calendar-cell {
		position: relative;
		min-height: 1.75rem;
		padding: 0.2rem;
		background: var(--color-white);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.calendar-cell-empty {
		background: rgba(15, 37, 69, 0.03);
	}

	/* Event days are buttons that jump to the event card. */
	.calendar-cell-link {
		border: 0;
		width: 100%;
		font: inherit;
		color: inherit;
		cursor: pointer;
		appearance: none;
		transition: background 0.15s ease;
	}

	.calendar-cell-link:hover,
	.calendar-cell-link:focus-visible {
		background: rgba(127, 183, 220, 0.28);
		outline: none;
	}

	.calendar-day-num {
		font-family: var(--mono);
		font-size: 0.75rem;
		color: var(--ink);
	}

	.calendar-cell.today {
		background: rgba(15, 37, 69, 0.08);
	}

	.calendar-cell.today .calendar-day-num {
		font-weight: 600;
		font-size: 0.6875rem;
		color: var(--paper);
		background: var(--ink);
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.calendar-dot {
		display: block;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--sky);
		margin-top: 1px;
		flex-shrink: 0;
	}

	.calendar-cell.has-event {
		background: rgba(127, 183, 220, 0.12);
	}

	.calendar-legend {
		font-family: var(--mono);
		font-size: 0.6875rem;
		color: var(--ink-2);
		margin: 0.35rem 0 0 0;
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.calendar-legend-dot {
		display: inline-block;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--sky);
	}

	.next-event-heading,
	.events-list-heading {
		font-family: var(--display);
		font-style: italic;
		font-weight: 800;
		color: var(--ink);
		margin: 0 0 1rem 0;
		line-height: 1.2;
	}

	.next-event-heading {
		font-size: 0.8125rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--blue);
		margin-bottom: 0.75rem;
	}

	.next-event-empty {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--ink-2);
		margin: 0;
		padding: 1rem;
		background: var(--paper-2);
		border: 1px solid var(--line-l);
	}

	.events-list-section {
		max-width: 1120px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 0;
	}

	.events-list-heading {
		font-size: 1.25rem;
		letter-spacing: -0.01em;
		margin-bottom: 1.5rem;
	}

	.events-list-heading--past {
		margin-top: 2.5rem;
	}

	.events-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.events-empty {
		font-family: var(--font-primary);
		font-size: 1rem;
		line-height: 1.6;
		color: var(--ink-2);
		margin: 0;
		padding: 1.25rem 1.5rem;
		background: var(--paper-2);
		border: 1px solid var(--line-l);
	}

	.past-toggle-wrap {
		margin-top: 2rem;
		text-align: center;
	}

	.past-toggle {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink);
		background: transparent;
		border: 1px solid var(--line-l);
		border-radius: 0;
		padding: 0.7rem 1.6rem;
		cursor: pointer;
		transition:
			background 0.18s ease,
			border-color 0.18s ease;
	}

	.past-toggle:hover {
		background: rgba(15, 37, 69, 0.04);
		border-color: var(--ink);
	}

	@media (max-width: 768px) {
		.events-header {
			padding-left: 0;
			padding-right: 0;
			text-align: center;
		}

		.events-eyebrow {
			justify-content: center;
		}

		.events-intro {
			margin-left: auto;
			margin-right: auto;
		}

		.events-hero {
			flex-direction: column;
			gap: 1.5rem;
			padding-left: 0;
			padding-right: 0;
		}

		.calendar-section {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			max-width: none;
			flex: 1 1 auto;
			border-bottom: 1px solid var(--line-l);
			padding-bottom: 1.5rem;
		}

		.next-event-section {
			width: 100%;
		}

		.events-list-section {
			padding-left: 0;
			padding-right: 0;
		}

		.events-list-heading {
			text-align: center;
		}
	}

	@media (max-width: 640px) {
		.events-header {
			padding: 2rem 0 1.5rem;
		}

		.events-hero {
			padding: 1.5rem 0;
		}

		.calendar-title {
			font-size: 1.125rem;
		}

		.calendar-day-num {
			font-size: 0.8125rem;
		}

		.calendar-day-name {
			font-size: 0.625rem;
		}

		.events-list-section {
			padding-top: 2rem;
		}
	}
</style>
