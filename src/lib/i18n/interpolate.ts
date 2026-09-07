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
