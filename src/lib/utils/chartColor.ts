/**
 * Color helpers for the Data Room charts.
 */

function toRgb(hex: string): [number, number, number] {
	const n = parseInt(hex.slice(1), 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** WCAG relative luminance of a `#rrggbb` color. */
export function luminance(hex: string): number {
	const [r, g, b] = toRgb(hex).map((c) => {
		const s = c / 255;
		return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two `#rrggbb` colors. */
export function contrast(a: string, b: string): number {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
}

/**
 * Text color for a label set *inside* a filled mark — the one place text sits on a
 * series color. Takes whichever of white or ink contrasts more with the fill, so a
 * label never depends on a hand-kept list of "light" colors. The dark option is the
 * deep navy (`--ink-deep`), the darkest brand ink, so mid-tone fills still clear
 * WCAG AA (4.5:1) for these small labels — `#0F2545` fell short on the heatmap's
 * mid-blue step (4.27:1 vs 4.79:1).
 */
export function inkOn(fill: string, ink = '#091B36', light = '#FFFFFF'): string {
	return contrast(fill, light) >= contrast(fill, ink) ? light : ink;
}
