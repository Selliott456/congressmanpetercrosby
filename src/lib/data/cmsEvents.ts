/**
 * Decap CMS supplemental events (JSON in src/content/events).
 * Curated rows in events.ts stay unchanged; merge at use site as:
 *   [...eventsData, ...cmsEventsData]
 *
 * Duplicate ids: if a CMS file reuses an id from events.ts, that CMS row is skipped
 * (static data wins). Duplicate ids among CMS files skip later files. Warnings use console.warn.
 */
import type { EventRow } from "./events";
import { eventsData } from "./events";

/** Raw shape stored by Decap (JSON). Optional fields may be missing or "". */
export type CmsEventRecord = {
	id: string;
	year: number;
	monthIndex: number;
	day: string;
	title: string;
	description: string;
	time?: string | null;
	location?: string | null;
	locationUrl?: string | null;
	viewEventUrl?: string | null;
};

const MONTH_ABBREV = [
	"",
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

function nonEmpty(s: string | null | undefined): string | null {
	if (s == null) return null;
	const t = String(s).trim();
	return t.length ? t : null;
}

function toEventRow(raw: CmsEventRecord): EventRow {
	const month = MONTH_ABBREV[raw.monthIndex] ?? "";
	return {
		id: String(raw.id).trim(),
		month,
		day: String(raw.day).trim(),
		year: raw.year,
		monthIndex: raw.monthIndex,
		title: String(raw.title).trim(),
		time: nonEmpty(raw.time ?? null),
		location: nonEmpty(raw.location ?? null),
		locationUrl: nonEmpty(raw.locationUrl ?? null),
		description: String(raw.description).trim(),
		viewEventUrl: nonEmpty(raw.viewEventUrl ?? null),
	};
}

function loadRawFromGlob(): { path: string; raw: CmsEventRecord }[] {
	const modules = import.meta.glob<CmsEventRecord>(
		"../../content/events/*.json",
		{ eager: true, import: "default" },
	);
	const out: { path: string; raw: CmsEventRecord }[] = [];
	for (const path of Object.keys(modules)) {
		const raw = modules[path];
		if (raw && typeof raw === "object" && "id" in raw) {
			out.push({ path, raw });
		}
	}
	return out;
}

function buildCmsEventsData(): EventRow[] {
	const staticIds = new Set(eventsData.map((e) => e.id));
	const seenCmsIds = new Set<string>();
	const rows: EventRow[] = [];

	for (const { path, raw } of loadRawFromGlob()) {
		const id = String(raw?.id ?? "").trim();
		if (!id) {
			console.warn(`[cmsEvents] Skipping file (missing id): ${path}`);
			continue;
		}
		if (staticIds.has(id)) {
			console.warn(
				`[cmsEvents] CMS event id "${id}" duplicates src/lib/data/events.ts; skipping file ${path}. Static entry is kept.`,
			);
			continue;
		}
		if (seenCmsIds.has(id)) {
			console.warn(
				`[cmsEvents] Duplicate CMS id "${id}"; skipping duplicate from ${path}.`,
			);
			continue;
		}
		seenCmsIds.add(id);
		try {
			rows.push(toEventRow(raw));
		} catch (e) {
			console.warn(`[cmsEvents] Invalid event in ${path}:`, e);
		}
	}

	return rows;
}

export const cmsEventsData: EventRow[] = buildCmsEventsData();
