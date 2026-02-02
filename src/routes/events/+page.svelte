<script>
	/**
	 * @param {{ year: number; monthIndex: number; day: string }} event
	 */
	function isPastEvent(event) {
		const d = new Date(event.year, event.monthIndex - 1, parseInt(event.day, 10));
		d.setHours(23, 59, 59, 999);
		return d < new Date();
	}

	const events = [
		{
			month: 'Feb',
			day: '2',
			year: 2026,
			monthIndex: 2,
			title: 'Town Hall - Davis County',
			time: '6:30 PM – 7:30 PM',
			location: 'Davis County Library - Clearfield Branch',
			locationUrl: 'https://www.google.com/maps/search/Davis+County+Library+Clearfield+Branch',
			description: 'We will be in Davis County for a town hall event. Please come with your questions, and we hope to see you there.',
			viewEventUrl: 'https://www.google.com/maps/search/Davis+County+Library+Clearfield+Branch'
		},
		{
			month: 'Feb',
			day: '3',
			year: 2026,
			monthIndex: 2,
			title: 'Town Hall - Weber County',
			time: '7:00 PM – 8:00 PM',
			location: 'Main Library - Weber County Library System',
			locationUrl: 'https://www.google.com/maps/search/Weber+County+Library+Main',
			description: 'We are having a town hall in Weber County. Please come join us with your questions.',
			viewEventUrl: 'https://www.google.com/maps/search/Weber+County+Library+Main'
		},
		{
			month: 'Feb',
			day: '4',
			year: 2026,
			monthIndex: 2,
			title: 'Town Hall - Cache County',
			time: '7:30 PM – 8:30 PM',
			location: 'Logan Library',
			locationUrl: 'https://www.google.com/maps/search/Logan+Library+Utah',
			description: 'We are having a town hall in Cache County. Please come join us!',
			viewEventUrl: 'https://www.google.com/maps/search/Logan+Library+Utah'
		},
		{
			month: 'Jan',
			day: '20',
			year: 2026,
			monthIndex: 1,
			title: 'Tik Tok Live - Affordable Housing with Farrah Pliley',
			time: '6:30 PM – 7:30 PM',
			location: null,
			locationUrl: null,
			description: 'We are having a live Tik Tok conversation with local realtor Farrah Pliley to talk about affordable housing. Please join us: tiktok.com/@petercrosbyforcongress.',
			viewEventUrl: 'https://tiktok.com/@petercrosbyforcongress'
		},
		{
			month: 'Jan',
			day: '15',
			year: 2026,
			monthIndex: 1,
			title: 'Tik Tok Live',
			time: '6:30 PM – 7:15 PM',
			location: 'tiktok.com/@petercrosbyforcongress',
			locationUrl: 'https://tiktok.com/@petercrosbyforcongress',
			description: 'Chris from Coffee N Politics (tiktok.com/@coffee_n_politics) and Peter are having a conversation about running for office in Northern Utah. Please come join us at tiktok.com/@petercrosbyforcongress!',
			viewEventUrl: 'https://tiktok.com/@petercrosbyforcongress'
		},
		{
			month: 'Jan',
			day: '14',
			year: 2026,
			monthIndex: 1,
			title: 'Town Hall - Box Elder',
			time: '6:30 PM – 7:30 PM',
			location: 'Brigham City Public Library (26 E Forest St, Brigham City, UT 84302)',
			locationUrl: 'https://www.google.com/maps/search/26+E+Forest+St+Brigham+City+UT',
			description: 'Come and meet the candidate. Peter Crosby will be available from 6:30 - 7:30 PM to answer your questions and talk about the challenges and opportunities facing Northern Utah.',
			viewEventUrl: 'https://www.google.com/maps/search/26+E+Forest+St+Brigham+City+UT'
		},
		{
			month: 'Jan',
			day: '13',
			year: 2026,
			monthIndex: 1,
			title: 'Town Hall - Cache Valley',
			time: '6:00 PM – 7:00 PM',
			location: 'Logan City Library, 285 N. Main, Logan, UT 84321',
			locationUrl: 'https://www.google.com/maps/search/285+N+Main+Logan+UT',
			description: 'Peter will be at the Logan City Library from 6:00 to 7:00 PM on Tuesday, the 13th of January. Please come join us for a town hall style conversation.',
			viewEventUrl: 'https://www.google.com/maps/search/285+N+Main+Logan+UT'
		},
		{
			month: 'Dec',
			day: '21',
			year: 2024,
			monthIndex: 12,
			title: 'Our Vote Counts - Round Table',
			time: '1:00 PM – 3:00 PM',
			location: null,
			locationUrl: null,
			description: 'Our Vote Counts hosts a virtual round table, and have asked me to join them this Sunday. Please pop in for a conversation with candidates from across the political spectrum. tiktok.com/@our.vote.counts',
			viewEventUrl: 'https://tiktok.com/@our.vote.counts'
		},
		{
			month: 'Dec',
			day: '16',
			year: 2024,
			monthIndex: 12,
			title: 'Meet the candidate - Live Tik Tok',
			time: '6:00 PM – 7:00 PM',
			location: null,
			locationUrl: null,
			description: 'Our Vote Counts is hosting a live Tik Tok to interview me. Please come join us!',
			viewEventUrl: 'https://tiktok.com/@our.vote.counts'
		},
		{
			month: 'Dec',
			day: '10',
			year: 2024,
			monthIndex: 12,
			title: 'Meet the candidate',
			time: '6:00 PM – 7:00 PM',
			location: 'Syracuse Community Center (1912 S 1900 W, Syracuse, UT 84075)',
			locationUrl: 'https://www.google.com/maps/search/1912+S+1900+W+Syracuse+UT',
			description: 'Come and meet the candidate. Peter Crosby will be available from 6:00 - 7:00 PM to answer your questions and talk about the challenges and opportunities facing Northern Utah.',
			viewEventUrl: 'https://www.google.com/maps/search/1912+S+1900+W+Syracuse+UT'
		},
		{
			month: 'Dec',
			day: '3',
			year: 2024,
			monthIndex: 12,
			title: 'Meet the candidate',
			time: '6:00 PM – 7:00 PM',
			location: 'Kaysville Library (215 N Fairfield Rd, Kaysville, UT 84037)',
			locationUrl: 'https://www.google.com/maps/search/215+N+Fairfield+Rd+Kaysville+UT',
			description: 'Come and meet the candidate. Peter Crosby will be available from 6:00 - 7:00 PM to answer your questions and talk about the challenges and opportunities facing Northern Utah.',
			viewEventUrl: 'https://www.google.com/maps/search/215+N+Fairfield+Rd+Kaysville+UT'
		},
		{
			month: 'Nov',
			day: '24',
			year: 2024,
			monthIndex: 11,
			title: 'Meet the candidate',
			time: '6:00 PM – 7:00 PM',
			location: 'Davis County Library - Clearfield Branch (1 N Main St, Clearfield, UT 84015)',
			locationUrl: 'https://www.google.com/maps/search/1+N+Main+St+Clearfield+UT',
			description: 'Come and meet the candidate. Peter Crosby will be available from 6:00 - 7:00 PM to answer your questions and talk about the challenges and opportunities facing Northern Utah.',
			viewEventUrl: 'https://www.google.com/maps/search/1+N+Main+St+Clearfield+UT'
		}
	];

	/**
	 * @param {{ year: number; monthIndex: number; day: string }} event
	 */
	function getEventTime(event) {
		return new Date(event.year, event.monthIndex - 1, parseInt(event.day, 10)).getTime();
	}

	// Newest first (most recent at top; events move down the list as they pass)
	$: sortedEvents = [...events].sort((a, b) => getEventTime(b) - getEventTime(a));

	// Soonest upcoming event = "next event" (updates automatically as time passes)
	$: nextEvent = [...events].filter((e) => !isPastEvent(e)).sort((a, b) => getEventTime(a) - getEventTime(b))[0] ?? null;

	/** Anchor id for first event on a given day (for calendar → card linking). @param {number} year @param {number} month @param {number} day */
	function getEventDayId(year, month, day) {
		return `event-${year}-${month}-${day}`;
	}

	// Assign anchor id to first event of each day in list order
	$: eventsWithAnchor = (() => {
		const seen = new Set();
		return sortedEvents.map((event) => {
			const key = `${event.year}-${event.monthIndex}-${event.day}`;
			const isFirst = !seen.has(key);
			if (isFirst) seen.add(key);
			return { event, anchorId: isFirst ? getEventDayId(event.year, event.monthIndex, parseInt(event.day, 10)) : null };
		});
	})();

	// Calendar: displayed month/year (1-12, full year)
	const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let displayYear = new Date().getFullYear();
	let displayMonth = new Date().getMonth() + 1; // 1-12

	/** @param {number} year @param {number} month @param {number} day */
	function hasEventOnDate(year, month, day) {
		return events.some(
			(e) => e.year === year && e.monthIndex === month && parseInt(e.day, 10) === day
		);
	}

	/** @param {number} year @param {number} month @param {number} day */
	function getEventsOnDate(year, month, day) {
		return events.filter(
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
	<title>Events — Peter Crosby for Congress</title>
	<meta name="description" content="Upcoming town halls, meet the candidate events, and live conversations with Peter Crosby in Northern Utah." />
</svelte:head>

<main class="events-page">
	<header class="events-header">
		<h1 class="events-title">Events</h1>
		<p class="events-intro">Town halls, meet the candidate events, and live conversations across Northern Utah.</p>
	</header>

	<div class="events-hero" class:events-hero-has-next={!!nextEvent}>
		<section class="calendar-section" aria-label="Calendar">
			<div class="calendar-header">
				<button type="button" class="calendar-nav" aria-label="Previous month" on:click={prevMonth}>←</button>
				<h2 class="calendar-title">{MONTH_NAMES[displayMonth - 1]} {displayYear}</h2>
				<button type="button" class="calendar-nav" aria-label="Next month" on:click={nextMonth}>→</button>
			</div>
			<div class="calendar-grid">
				{#each DAY_NAMES as dayName}
					<div class="calendar-day-name">{dayName}</div>
				{/each}
				{#each calendarWeeks as week}
					{#each week as day}
						{#if day === null}
							<div class="calendar-cell calendar-cell-empty"></div>
						{:else if hasEventOnDate(displayYear, displayMonth, day)}
							<a
								href="#{getEventDayId(displayYear, displayMonth, day)}"
								class="calendar-cell calendar-cell-link"
								class:has-event={true}
								class:today={isToday(displayYear, displayMonth, day)}
							>
								<span class="calendar-day-num">{day}</span>
								<span class="calendar-dot" title={getEventsOnDate(displayYear, displayMonth, day).map((e) => e.title).join(', ')}></span>
							</a>
						{:else}
							<div
								class="calendar-cell"
								class:today={isToday(displayYear, displayMonth, day)}
							>
								<span class="calendar-day-num">{day}</span>
							</div>
						{/if}
					{/each}
				{/each}
			</div>
			<p class="calendar-legend">
				<span class="calendar-legend-dot"></span> Day with event
			</p>
		</section>

		{#if nextEvent}
			<section class="next-event-section" aria-label="Next event">
				<h2 class="next-event-heading">Next event</h2>
				<article class="next-event-card">
					<div class="event-date">
						<span class="event-month">{nextEvent.month}</span>
						<span class="event-day">{nextEvent.day}</span>
					</div>
					<div class="event-body">
						<h2 class="event-title">{nextEvent.title}</h2>
						<p class="event-time">{nextEvent.time}</p>
						{#if nextEvent.location}
							<p class="event-location">
								{#if nextEvent.locationUrl}
									<a href={nextEvent.locationUrl} target="_blank" rel="noopener noreferrer">{nextEvent.location}</a>
								{:else}
									{nextEvent.location}
								{/if}
							</p>
						{/if}
						<p class="event-calendar-links">
							<span class="calendar-link">Google Calendar</span>
							<span class="calendar-sep"> </span>
							<span class="calendar-link">ICS</span>
						</p>
						<p class="event-description">{nextEvent.description}</p>
					</div>
				</article>
			</section>
		{/if}
	</div>

	<div class="all-events-section">
		<h2 class="all-events-heading">All events</h2>
		<div class="events-list">
			{#each eventsWithAnchor as { event, anchorId }}
				<article id={anchorId ?? undefined} class="event-card" class:past={isPastEvent(event)}>
					<div class="event-date">
						<span class="event-month">{event.month}</span>
						<span class="event-day">{event.day}</span>
					</div>
					<div class="event-body">
						{#if isPastEvent(event)}
							<p class="event-past-label">Past event</p>
						{/if}
						<h2 class="event-title">{event.title}</h2>
						<p class="event-time">{event.time}</p>
						{#if event.location}
							<p class="event-location">
								{#if event.locationUrl}
									<a href={event.locationUrl} target="_blank" rel="noopener noreferrer">{event.location}</a>
								{:else}
									{event.location}
								{/if}
							</p>
						{/if}
						<p class="event-calendar-links">
							<span class="calendar-link">Google Calendar</span>
							<span class="calendar-sep"> </span>
							<span class="calendar-link">ICS</span>
						</p>
						<p class="event-description">{event.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>

<style>
	.events-page {
		background: var(--color-white);
		min-height: 100vh;
		padding-bottom: 4rem;
	}

	.events-header {
		max-width: 800px;
		margin: 0 auto;
		padding: 3rem 1.5rem 2rem;
		border-bottom: 1px solid rgba(0, 35, 56, 0.08);
	}

	.events-title {
		font-family: var(--font-primary);
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 0.5rem 0;
		line-height: 1.2;
	}

	.events-intro {
		font-family: var(--font-primary);
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--color-primary);
		margin: 0;
		opacity: 0.9;
	}

	.events-hero {
		position: sticky;
		top: 6rem;
		z-index: 10;
		background: var(--color-white);
		border-bottom: 1px solid rgba(0, 35, 56, 0.08);
		box-shadow: 0 4px 20px rgba(0, 35, 56, 0.06);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
	}

	.calendar-section {
		flex: 1 1 auto;
		min-width: 0;
		padding: 0;
		border-bottom: none;
	}

	.events-hero.events-hero-has-next .calendar-section {
		flex: 0 0 auto;
		max-width: 300px;
		border-right: 1px solid rgba(0, 35, 56, 0.08);
		padding-right: 1.5rem;
	}

	.events-hero .next-event-section {
		flex: 1 1 0;
		min-width: 0;
		padding: 0;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.calendar-title {
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0;
		line-height: 1.2;
	}

	.calendar-nav {
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-primary);
		background: transparent;
		border: 1px solid rgba(0, 35, 56, 0.2);
		border-radius: 6px;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		transition: background 0.2s, border-color 0.2s;
	}

	.calendar-nav:hover {
		background: rgba(0, 35, 56, 0.06);
		border-color: var(--color-primary);
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
		background: rgba(0, 35, 56, 0.08);
		border: 1px solid rgba(0, 35, 56, 0.08);
		border-radius: 8px;
		overflow: hidden;
	}

	.calendar-day-name {
		font-family: var(--font-primary);
		font-size: 0.5625rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: var(--color-primary);
		opacity: 0.7;
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

	.calendar-cell-link {
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		transition: background 0.15s;
	}

	.calendar-cell-link:hover {
		background: rgba(35, 89, 38, 0.12);
	}

	.calendar-cell-empty {
		background: rgba(0, 35, 56, 0.03);
	}

	.calendar-day-num {
		font-family: var(--font-primary);
		font-size: 0.75rem;
		color: var(--color-primary);
	}

	.calendar-cell.today {
		background: rgba(0, 35, 56, 0.08);
	}

	.calendar-cell.today .calendar-day-num {
		font-weight: 700;
		font-size: 0.6875rem;
		color: var(--color-white);
		background: var(--color-primary);
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
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
		background: var(--color-secondary);
		margin-top: 1px;
		flex-shrink: 0;
	}

	.calendar-cell.has-event {
		background: rgba(35, 89, 38, 0.06);
	}

	.calendar-legend {
		font-family: var(--font-primary);
		font-size: 0.6875rem;
		color: var(--color-primary);
		opacity: 0.8;
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
		background: var(--color-secondary);
	}

	.next-event-section {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1.5rem 0;
	}

	.next-event-heading {
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-secondary);
		margin: 0 0 1rem 0;
		line-height: 1.2;
	}

	.events-hero .next-event-heading {
		font-size: 0.8125rem;
		margin-bottom: 0.5rem;
	}

	.next-event-card {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
		background: rgba(187, 206, 221, 0.2);
		border: 2px solid var(--color-accent);
		border-radius: 12px;
		padding: 1.5rem;
	}

	.events-hero .next-event-card {
		gap: 1rem;
		padding: 1rem;
		border-radius: 8px;
		border-width: 1px;
	}

	.events-hero .next-event-card .event-date {
		width: 3rem;
		padding: 0.35rem 0;
	}

	.events-hero .next-event-card .event-month {
		font-size: 0.625rem;
	}

	.events-hero .next-event-card .event-day {
		font-size: 1.125rem;
	}

	.events-hero .next-event-card .event-title {
		font-size: 1rem;
		margin-bottom: 0.15rem;
	}

	.events-hero .next-event-card .event-time,
	.events-hero .next-event-card .event-location {
		font-size: 0.8125rem;
		margin-bottom: 0.25rem;
	}

	.events-hero .next-event-card .event-calendar-links {
		font-size: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.events-hero .next-event-card .event-description {
		font-size: 0.875rem;
		line-height: 1.5;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.next-event-card .event-date {
		background: var(--color-secondary);
	}

	.all-events-section {
		max-width: 800px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 0;
		border-top: 1px solid rgba(0, 35, 56, 0.08);
	}

	.all-events-heading {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 1.5rem 0;
		line-height: 1.3;
	}

	.events-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.event-card {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
		padding-bottom: 2rem;
		border-bottom: 1px solid rgba(0, 35, 56, 0.08);
		scroll-margin-top: 20rem;
	}

	.event-card:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.event-card.past {
		opacity: 0.7;
	}

	.event-card.past .event-date {
		background: rgba(0, 35, 56, 0.5);
	}

	.event-card.past .event-title,
	.event-card.past .event-time,
	.event-card.past .event-description,
	.event-card.past .event-location,
	.event-card.past .event-calendar-links {
		color: var(--color-primary);
		opacity: 0.85;
	}

	.event-past-label {
		font-family: var(--font-primary);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary);
		opacity: 0.7;
		margin: 0 0 0.25rem 0;
	}

	.event-date {
		flex-shrink: 0;
		width: 4rem;
		text-align: center;
		background: var(--color-primary);
		color: var(--color-white);
		border-radius: 8px;
		padding: 0.5rem 0;
	}

	.event-month {
		display: block;
		font-family: var(--font-primary);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.event-day {
		display: block;
		font-family: var(--font-primary);
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.event-body {
		flex: 1;
		min-width: 0;
	}

	.event-title {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 0.25rem 0;
		line-height: 1.3;
	}

	.event-time {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		color: var(--color-primary);
		margin: 0 0 0.5rem 0;
		opacity: 0.9;
	}

	.event-location {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		margin: 0 0 0.75rem 0;
		line-height: 1.5;
	}

	.event-location a {
		color: var(--color-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.event-location a:hover {
		opacity: 0.85;
	}

	.event-calendar-links {
		font-family: var(--font-primary);
		font-size: 0.875rem;
		margin: 0 0 0.75rem 0;
	}

	.calendar-link {
		color: var(--color-primary);
		opacity: 0.85;
	}

	.event-description {
		font-family: var(--font-primary);
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-primary);
		margin: 0 0 1rem 0;
	}

	@media (max-width: 768px) {
		.events-hero {
			flex-direction: column;
			gap: 1.5rem;
		}

		.events-hero.events-hero-has-next .calendar-section {
			max-width: none;
			border-right: none;
			padding-right: 0;
			border-bottom: 1px solid rgba(0, 35, 56, 0.08);
			padding-bottom: 1.5rem;
		}
	}

	@media (max-width: 640px) {
		.events-header {
			padding: 2rem 1rem 1.5rem;
		}

		.events-title {
			font-size: 1.75rem;
		}

		.events-hero {
			padding: 1.5rem 1rem;
		}

		.events-hero.events-hero-has-next .calendar-section {
			padding-bottom: 1.5rem;
		}

		.calendar-title {
			font-size: 1.125rem;
		}

		.calendar-cell {
			min-height: 1.75rem;
		}

		.calendar-day-num {
			font-size: 0.8125rem;
		}

		.calendar-day-name {
			font-size: 0.625rem;
		}

		.next-event-section {
			padding: 2rem 1rem 0;
		}

		.next-event-card {
			flex-direction: column;
			gap: 1rem;
			padding: 1rem;
		}

		.all-events-section {
			padding: 2rem 1rem 0;
		}

		.events-list {
			gap: 1.5rem;
		}

		.event-card {
			flex-direction: column;
			gap: 1rem;
			padding-bottom: 1.5rem;
		}

		.event-date {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			padding: 0.35rem 0;
		}

		.event-month {
			display: inline;
			font-size: 0.875rem;
		}

		.event-day {
			display: inline;
			font-size: 1.25rem;
		}

		.event-title {
			font-size: 1.125rem;
		}
	}
</style>
