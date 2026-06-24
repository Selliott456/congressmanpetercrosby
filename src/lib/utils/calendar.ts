import type { EventRow } from '$lib/data/events';

/** All campaign events are in Mountain Time. */
const TZ = 'America/Denver';

type CalEvent = EventRow & { title: string; description: string };

/** Offset (ms) between `date`'s instant and the same wall-clock reading in `timeZone`. */
function tzOffsetMs(date: Date, timeZone: string): number {
	const dtf = new Intl.DateTimeFormat('en-US', {
		timeZone,
		hour12: false,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	/** @type {Record<string, string>} */
	const parts = Object.fromEntries(dtf.formatToParts(date).map((p) => [p.type, p.value]));
	// Intl can emit "24" for midnight in some engines — normalize to 0.
	const hour = parts.hour === '24' ? 0 : +parts.hour;
	const asLocal = Date.UTC(+parts.year, +parts.month - 1, +parts.day, hour, +parts.minute, +parts.second);
	return asLocal - date.getTime();
}

/** Convert a wall-clock time in `TZ` to the corresponding UTC instant. */
function zonedToUtc(y: number, mo: number, d: number, hh: number, mm: number): Date {
	const guess = Date.UTC(y, mo - 1, d, hh, mm);
	const offset = tzOffsetMs(new Date(guess), TZ);
	return new Date(guess - offset);
}

function pad(n: number): string {
	return String(n).padStart(2, '0');
}

/** "YYYYMMDDTHHMMSSZ" for a UTC instant. */
function utcStamp(d: Date): string {
	return (
		`${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
		`T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
	);
}

/** "YYYYMMDD" for an all-day date. */
function dateStamp(y: number, mo: number, d: number): string {
	return `${y}${pad(mo)}${pad(d)}`;
}

/** Parsed start/end; null when the event has no set time (all-day). */
function parseTimes(ev: CalEvent): { sh: number; sm: number; eh: number; em: number } | null {
	if (!ev.startTime) return null;
	const [sh, sm] = ev.startTime.split(':').map(Number);
	if (ev.endTime) {
		const [eh, em] = ev.endTime.split(':').map(Number);
		return { sh, sm, eh, em };
	}
	return { sh, sm, eh: sh + 1, em: sm }; // default to a one-hour duration
}

/** All-day [start, end] stamps; end is the exclusive next day. */
function allDayRange(ev: CalEvent): { start: string; end: string } {
	const d = parseInt(ev.day, 10);
	const next = new Date(Date.UTC(ev.year, ev.monthIndex - 1, d + 1));
	return {
		start: dateStamp(ev.year, ev.monthIndex, d),
		end: dateStamp(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate())
	};
}

/** "Add to Google Calendar" template URL. */
export function googleCalendarUrl(ev: CalEvent): string {
	const params = new URLSearchParams({ action: 'TEMPLATE', text: ev.title });
	const t = parseTimes(ev);
	if (t) {
		const start = zonedToUtc(ev.year, ev.monthIndex, parseInt(ev.day, 10), t.sh, t.sm);
		const end = zonedToUtc(ev.year, ev.monthIndex, parseInt(ev.day, 10), t.eh, t.em);
		params.set('dates', `${utcStamp(start)}/${utcStamp(end)}`);
	} else {
		const { start, end } = allDayRange(ev);
		params.set('dates', `${start}/${end}`);
	}
	if (ev.description) params.set('details', ev.description);
	if (ev.location) params.set('location', ev.location);
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsEscape(s: string): string {
	return s
		.replace(/\\/g, '\\\\')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,')
		.replace(/\r?\n/g, '\\n');
}

/** Fold a content line to the 75-octet ICS limit (RFC 5545). */
function fold(line: string): string {
	if (line.length <= 75) return line;
	let out = line.slice(0, 75);
	let rest = line.slice(75);
	while (rest.length > 74) {
		out += `\r\n ${rest.slice(0, 74)}`;
		rest = rest.slice(74);
	}
	return `${out}\r\n ${rest}`;
}

/** Raw ICS (VCALENDAR) text for the event. */
export function icsText(ev: CalEvent): string {
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Peter Crosby for Congress//Events//EN',
		'CALSCALE:GREGORIAN',
		'BEGIN:VEVENT',
		`UID:${ev.id}@petercrosbyforcongress.org`,
		`DTSTAMP:${utcStamp(new Date())}`
	];
	const t = parseTimes(ev);
	if (t) {
		const start = zonedToUtc(ev.year, ev.monthIndex, parseInt(ev.day, 10), t.sh, t.sm);
		const end = zonedToUtc(ev.year, ev.monthIndex, parseInt(ev.day, 10), t.eh, t.em);
		lines.push(`DTSTART:${utcStamp(start)}`, `DTEND:${utcStamp(end)}`);
	} else {
		const { start, end } = allDayRange(ev);
		lines.push(`DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`);
	}
	lines.push(`SUMMARY:${icsEscape(ev.title)}`);
	if (ev.location) lines.push(`LOCATION:${icsEscape(ev.location)}`);
	if (ev.description) lines.push(`DESCRIPTION:${icsEscape(ev.description)}`);
	lines.push('END:VEVENT', 'END:VCALENDAR');
	return lines.map(fold).join('\r\n');
}

/** Data-URI href for downloading the .ics (Apple Calendar / Outlook). */
export function icsHref(ev: CalEvent): string {
	return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsText(ev))}`;
}

/** Safe filename for the downloaded .ics. */
export function icsFilename(ev: CalEvent): string {
	const slug =
		ev.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')
			.slice(0, 50) || 'event';
	return `${slug}.ics`;
}
