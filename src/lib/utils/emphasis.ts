/**
 * Split copy into runs on `**emphasis**` markers — odd-indexed segments are
 * emphasized. Lets dictionary strings carry inline emphasis without HTML, which
 * keeps them translatable: a translator moves the markers along with the words.
 *
 *   emphasisRuns('I **get it.**')
 *   → [{ text: 'I ', em: false }, { text: 'get it.', em: true }, { text: '', em: false }]
 *
 * Each consumer picks the element: /about renders runs as <em>, /policies as
 * <strong> (there, bold marks the candidate's concrete commitments).
 *
 * Markers must be balanced. An odd count leaves the rest of the string emphasized.
 */
export type EmphasisRun = { text: string; em: boolean };

export function emphasisRuns(text: string): EmphasisRun[] {
	return text.split('**').map((t, i) => ({ text: t, em: i % 2 === 1 }));
}
