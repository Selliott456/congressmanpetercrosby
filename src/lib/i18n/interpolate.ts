/**
 * Fill `{name}` placeholders in a translated string.
 *
 * Some copy has to interpolate live values (sample size, field dates, percentages)
 * and the word order around them differs by language — so the whole sentence lives
 * in the dictionary with placeholders, rather than being concatenated in a component.
 *
 *   fill($messages.analytics.responseRate, { rate: 89 })
 *   → "This question had an 89% response rate."
 *
 * An unknown placeholder is left untouched, so a mismatched key is visible in the
 * UI during review instead of silently rendering as an empty string.
 */
export function fill(template: string, values: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (match, key) =>
		key in values ? String(values[key]) : match
	);
}

/** A slice of a filled template: `key` names the placeholder it came from, or is
    null for the literal text around it. */
export type FilledPart = { text: string; key: string | null };

/**
 * Like `fill`, but returns the sentence as ordered parts so a component can wrap
 * the substituted values in markup — e.g. styling a figure inside a paragraph.
 *
 * This keeps the whole sentence in the dictionary as one natural, translatable
 * string: translators are never asked to preserve HTML tags, and word order stays
 * free, while the component still decides how each value is presented.
 */
export function fillParts(
	template: string,
	values: Record<string, string | number>
): FilledPart[] {
	const parts: FilledPart[] = [];
	const pattern = /\{(\w+)\}/g;
	let cursor = 0;
	let match: RegExpExecArray | null;

	while ((match = pattern.exec(template)) !== null) {
		if (match.index > cursor) {
			parts.push({ text: template.slice(cursor, match.index), key: null });
		}
		const key = match[1];
		// An unknown key stays literal, matching `fill`'s behaviour.
		parts.push(
			key in values ? { text: String(values[key]), key } : { text: match[0], key: null }
		);
		cursor = pattern.lastIndex;
	}
	if (cursor < template.length) {
		parts.push({ text: template.slice(cursor), key: null });
	}
	return parts;
}
