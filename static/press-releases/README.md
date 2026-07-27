# Press release originals (source files)

Drop the original press-release files here — a **JPEG image** (how the campaign
currently sends them) or a **PDF**. Each is served at the root path, e.g.
`static/press-releases/town-hall-series.jpg` → `/press-releases/town-hall-series.jpg`.

**Optimize JPEGs before committing** (press graphics can be multi-MB). Repo recipe:

```bash
sips --resampleWidth 1600 -s format jpeg -s formatOptions 80 in.jpg --out town-hall-series.jpg
```

Then reference it from `src/lib/data/pressReleases.ts`:

```ts
{
  id: 'town-hall-series',
  // …
  attachment: '/press-releases/town-hall-series.jpg'
}
```

The `/press/<id>` detail page renders a "Download the release" link (labeled with the
format, e.g. "(JPG)") when `attachment` is set. For a **Spanish** original, set
`attachment` inside the Spanish `byId` override (`pages-es.ts` →
`pressReleases.byId[id].attachment`, e.g. `/press-releases/town-hall-series-es.jpg`);
it falls back to the English original when no Spanish one is provided.

**The image/PDF is the source, not the page.** The on-site page is transcribed from
it into `body` blocks (styled, bilingual, mobile-friendly, indexable). A JPEG has no
text layer, so the transcription IS the only machine-readable copy — never post the
image alone in place of the text.

Filename convention: use the release's `id` (slug), lowercase-kebab, `-es` suffix
for the Spanish version.
