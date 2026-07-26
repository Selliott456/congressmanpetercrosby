# Press release PDFs (original source files)

Drop the original press-release PDFs here. Each is served at the root path, e.g.
`static/press-releases/town-hall-series.pdf` → `/press-releases/town-hall-series.pdf`.

Then reference it from `src/lib/data/pressReleases.ts`:

```ts
{
  id: 'town-hall-series',
  // …
  pdf: '/press-releases/town-hall-series.pdf'
}
```

The `/press/<id>` detail page renders a "Download the release (PDF)" link when
`pdf` is set. For a **Spanish** PDF, set `pdf` inside the Spanish `byId` override
(`pages-es.ts` → `pressReleases.byId[id].pdf`, e.g.
`/press-releases/town-hall-series-es.pdf`); it falls back to the English PDF when
no Spanish one is provided.

**The PDF is the source, not the page.** The on-site page is transcribed from the
PDF into `body` blocks (so it's styled, bilingual, mobile-friendly, and indexable);
the PDF here is just the optional downloadable original. Don't embed the PDF in an
iframe — transcribe it.

Filename convention: use the release's `id` (slug), lowercase-kebab, `-es` suffix
for the Spanish version.
