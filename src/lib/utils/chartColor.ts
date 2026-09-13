/**
 * Color helpers for the Data Room charts.
 */

function toRgb(hex: string): [number, number, number] {
	const n = parseInt(hex.slice(1), 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex(rgb: number[]): string {
	return '#' + rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');
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
 * label never depends on a hand-kept list of "light" colors.
 */
export function inkOn(fill: string, ink = '#0F2545', light = '#FFFFFF'): string {
	return contrast(fill, light) >= contrast(fill, ink) ? light : ink;
}

/**
 * The color at position `t` (0–1) along a sequential ramp, interpolated between its
 * evenly spaced stops — the same interpolation a CSS `linear-gradient` of those stops
 * uses, so a gradient key drawn from the ramp matches the cells.
 */
export function rampColor(ramp: string[], t: number): string {
	if (ramp.length === 1) return ramp[0];
	const pos = Math.min(1, Math.max(0, t)) * (ramp.length - 1);
	const i = Math.min(ramp.length - 2, Math.floor(pos));
	const f = pos - i;
	const a = toRgb(ramp[i]);
	const b = toRgb(ramp[i + 1]);
	return toHex(a.map((c, k) => c + (b[k] - c) * f));
}
