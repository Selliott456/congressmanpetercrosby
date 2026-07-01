# Media card thumbnails

Thumbnail images for the media cards (home "Media" section + the `/media` page).
Each file here is referenced from `src/lib/data/media.ts` via the item's `image`
field, e.g. `image: '/images/media/crosby-winnable.jpg'`.

**Optional by design:** an item with no `image` falls back to the branded
placeholder — the outlet wordmark for articles, the play button for videos. Only
add an image when the campaign supplies one.

## Conventions

- **Aspect ratio:** 16:9 landscape (the thumbnail is cropped to `16 / 9`, so
  off-ratio images are center-cropped — frame accordingly).
- **Size:** ~1200px wide is plenty (cards render well under that). Optimize before
  committing — this repo has historically shipped multi-MB assets:
  ```sh
  sips --resampleWidth 1200 -s formatOptions 80 in.jpg --out media/out.jpg
  ```
  Aim for well under ~300 KB per file.
- **Format:** `.jpg` for photos, `.png` only if transparency is needed.
- **Filename:** lowercase, hyphenated, ideally matching the item `id`
  (e.g. `cache-valley-daily-winnable.jpg`).

## Adding an image to a card

1. Drop the optimized file in this folder.
2. In `src/lib/data/media.ts`, add `image: '/images/media/<file>'` to the item.
3. No i18n change needed — the image isn't language-specific.
