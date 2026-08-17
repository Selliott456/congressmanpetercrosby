<script>
	import { createEventDispatcher } from 'svelte';
	import { messages } from '$lib/i18n/locale';
	import { rsvpedEvents } from '$lib/stores/rsvp';
	import { eventOffersRsvp } from '$lib/data/events';
	import { googleCalendarUrl, icsHref, icsFilename } from '$lib/utils/calendar';
	import Rail from './Rail.svelte';

	/** @type {import('$lib/data/events').EventRow & { title: string; description: string }} */
	export let event;
	/** Prominent "next event" styling (Rail on top, sky accent). @type {boolean} */
	export let featured = false;
	/** Anchor id for calendar → card linking. @type {string | null} */
	export let anchorId = null;
	/** Display layout: 'list' (horizontal row) or 'grid' (stacked column). @type {'list' | 'grid'} */
	export let layout = 'list';

	const dispatch = createEventDispatcher();

	/** @param {import('$lib/data/events').EventRow} e */
	function endOfDay(e) {
		const d = new Date(e.year, e.monthIndex - 1, parseInt(e.day, 10));
		d.setHours(23, 59, 59, 999);
		return d;
	}

	$: past = endOfDay(event) < new Date();
	// RSVP is offered on every event (eventOffersRsvp) unless it explicitly opts
	// out, and only makes sense while the event is still upcoming.
	$: showRsvp = eventOffersRsvp(event) && !past;
	$: rsvped = $rsvpedEvents.has(event.id);
	// "Add to calendar" only makes sense for upcoming events.
	$: showCalendar = !past;
	$: gcalUrl = showCalendar ? googleCalendarUrl(event) : '';
	$: icsUrl = showCalendar ? icsHref(event) : '';
	$: icsName = showCalendar ? icsFilename(event) : 'event.ics';
</script>

<article
	id={anchorId ?? undefined}
	class="event-card"
	class:featured
	class:past
	class:event-card--grid={layout === 'grid'}
>
	{#if featured}
		<Rail />
	{/if}
	<div class="event-inner">
		<div class="event-date">
			<span class="event-month">{$messages.events.monthAbbrev[event.monthIndex - 1]}</span>
			<span class="event-day">{event.day}</span>
		</div>
		<div class="event-body">
			{#if past}
				<p class="event-past-label">{$messages.events.ui.pastEvent}</p>
			{/if}
			<h3 class="event-title">{event.title}</h3>
			{#if event.time}
				<p class="event-time">{event.time}</p>
			{/if}
			{#if event.location}
				<p class="event-location">
					{#if event.locationUrl}
						<a href={event.locationUrl} target="_blank" rel="noopener noreferrer">{event.location}</a>
					{:else}
						{event.location}
					{/if}
				</p>
			{/if}
			<p class="event-description">{event.description}</p>
			{#if showCalendar || event.viewEventUrl}
				<div class="event-links">
					{#if showCalendar}
						<span class="event-cal">
							<span class="event-cal-label">{$messages.events.ui.addToCalendar}:</span>
							<a href={gcalUrl} target="_blank" rel="noopener noreferrer" class="event-cal-link"
								>{$messages.events.ui.calendarGoogle}</a
							>
							<span class="event-cal-sep" aria-hidden="true">·</span>
							<a href={icsUrl} download={icsName} class="event-cal-link"
								>{$messages.events.ui.calendarApple}</a
							>
						</span>
					{/if}
					{#if event.viewEventUrl}
						<a
							href={event.viewEventUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="event-view-link">{$messages.common.viewEvent}</a
						>
					{/if}
				</div>
			{/if}
		</div>
		{#if showRsvp}
			<div class="event-rsvp-aside">
				{#if rsvped}
					<span class="event-rsvp event-rsvp--done">✓ {$messages.events.ui.rsvped}</span>
				{:else}
					<button type="button" class="event-rsvp" on:click={() => dispatch('rsvp', event)}>
						{$messages.events.ui.rsvp}
					</button>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	.event-card {
		background: var(--paper-2);
		border: 1px solid var(--line-l);
		/* Clear the sticky nav when jumped to from the calendar. */
		scroll-margin-top: 6rem;
	}

	.event-card.featured {
		border: 1px solid var(--sky);
		border-top: none;
		background: var(--paper-2);
	}

	.event-card.past {
		opacity: 0.75;
	}

	/* Grid view: stack the card vertically so it fits a narrow column,
	   and let cards stretch to equal height with the RSVP pinned to the bottom. */
	.event-card--grid {
		display: flex;
		flex-direction: column;
	}

	.event-card--grid .event-inner {
		flex: 1;
		flex-direction: column;
		gap: 1rem;
	}

	.event-card--grid .event-date {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.4rem 0;
	}

	.event-card--grid .event-month {
		display: inline;
		font-size: 0.875rem;
	}

	.event-card--grid .event-day {
		display: inline;
		font-size: 1.25rem;
	}

	.event-card--grid .event-body {
		flex: 1;
	}

	.event-card--grid .event-rsvp-aside {
		align-self: stretch;
	}

	.event-card--grid .event-rsvp {
		width: 100%;
	}

	.event-inner {
		display: flex;
		gap: 1.25rem;
		align-items: flex-start;
		padding: 1.25rem 1.5rem;
	}

	.event-date {
		flex-shrink: 0;
		width: 4rem;
		text-align: center;
		background: var(--ink);
		color: var(--paper);
		padding: 0.5rem 0;
	}

	.event-card.featured .event-date {
		background: var(--blue);
	}

	.event-card.past .event-date {
		background: rgba(15, 37, 69, 0.5);
	}

	.event-month {
		display: block;
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.event-day {
		display: block;
		font-family: var(--mono);
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.event-body {
		flex: 1;
		min-width: 0;
	}

	.event-past-label {
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--ink-2);
		margin: 0 0 0.35rem 0;
	}

	.event-title {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--ink);
		margin: 0 0 0.35rem 0;
		line-height: 1.25;
	}

	.event-time {
		font-family: var(--mono);
		font-size: 0.8125rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-2);
		margin: 0 0 0.4rem 0;
	}

	.event-location {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		margin: 0 0 0.6rem 0;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.event-location a {
		color: var(--blue);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.event-location a:hover {
		opacity: 0.85;
	}

	.event-description {
		font-family: var(--font-primary);
		font-size: 1rem;
		line-height: 1.7;
		color: var(--ink-2);
		margin: 0;
	}

	.event-links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1.5rem;
		margin-top: 0.85rem;
	}

	.event-cal {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		color: var(--ink-2);
	}

	.event-cal-label {
		text-transform: uppercase;
	}

	.event-cal-link {
		color: var(--blue);
		text-decoration: none;
	}

	.event-cal-link:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.event-cal-sep {
		color: var(--ink-2);
		opacity: 0.5;
	}

	.event-view-link {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--blue);
		text-decoration: none;
	}

	.event-view-link:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	/* RSVP sits on the right side of the card, vertically centered. */
	.event-rsvp-aside {
		flex-shrink: 0;
		align-self: center;
	}

	/* Ghost CTA — civic-blue outline so it reads as secondary to the solid date block. */
	.event-rsvp {
		box-sizing: border-box;
		font-family: var(--display);
		font-style: italic;
		font-size: 0.8125rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-align: center;
		padding: 0.6rem 1.6rem;
		border: 1px solid var(--blue);
		background: transparent;
		color: var(--blue);
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.18s ease,
			border-color 0.18s ease,
			color 0.18s ease;
	}

	.event-rsvp:not(.event-rsvp--done):hover {
		background: var(--blue);
		border-color: var(--blue);
		color: var(--paper);
	}

	/* Confirmed RSVP — green, non-interactive. */
	.event-rsvp--done {
		display: inline-block;
		background: var(--green);
		border-color: var(--green);
		color: var(--paper);
		cursor: default;
	}

	@media (max-width: 640px) {
		.event-inner {
			flex-direction: column;
			gap: 1rem;
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

		.event-rsvp-aside {
			align-self: stretch;
		}

		.event-rsvp {
			width: 100%;
		}
	}
</style>
