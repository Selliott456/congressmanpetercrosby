# Developer Handoff

Notes for the next engineer taking over this SvelteKit site.

## Stack

- **SvelteKit 2** (Svelte 4) with `@sveltejs/adapter-auto` (auto-detects Netlify on deploy).
- **Vite 5** build/dev server.
- **TypeScript 5** for `.ts` files and JSDoc-typed `.svelte` scripts.
- **Netlify** hosting + **Netlify Forms** for the volunteer form.
- No UI framework / CSS library — styling is plain scoped CSS per component, with global
  design tokens (CSS custom properties) defined in `src/routes/+layout.svelte`.

## Requirements

- **Node 18+ (Node 20 LTS recommended).** Vite 5 / SvelteKit 2 / `svelte-check` will not
  run on Node 14–16. If `npm install`, `npm run check`, or `npm run build` throws
  `SyntaxError: Unexpected token '??='`, you are on an old Node — upgrade (e.g. `nvm use 20`).

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check (`svelte-kit sync` + `svelte-check`) |
| `npm run check:watch` | Type-check in watch mode |

There is no linter or formatter configured and no test suite. Consider adding Prettier +
`eslint-plugin-svelte` and a couple of smoke tests if the project grows.

## Architecture & conventions

- **Routing** is file-based under `src/routes`. Pages are mostly static content driven by
  the i18n dictionaries.
- **Internationalization** (`src/lib/i18n/`):
  - `locale.ts` exposes a `locale` writable store, a `messages` derived store, `setLocale()`,
    and `initLocaleFromStorage()` (called once in the root layout `onMount`). Locale persists
    to `localStorage` under `pcc-locale`.
  - `dictionaries.ts` composes the `en` / `es` dictionaries. Shared/page strings live in
    `pages-en.ts` / `pages-es.ts`. **`es` is typed as `Messages` (= shape of `en`)**, so a
    missing Spanish key is a type error — keep both languages in sync.
  - In components, read copy via `$messages.<section>.<key>`.
- **Components** (`src/lib/components/`):
  - `Button.svelte` — one button with a `variant` prop (`'primary' | 'secondary' | 'accent'`,
    default `secondary`). Renders an `<a>` when `href` is set, otherwise a `<button>`.
    Only the `secondary` variant is currently used in the app; the others are kept for the
    design system.
  - `SocialIcon.svelte` + `src/lib/data/socialLinks.ts` — shared social links/icons used by
    both `Footer.svelte` and the home page. Update links in one place (`socialLinks.ts`).
- **Events** (`src/lib/data/events.ts`): a single static `EventRow[]` array is the source of
  truth. The events page derives the calendar, "next event", sorting, and anchors from it.
  Per-event Spanish overrides are looked up by `id` (`$messages.events.byId[e.id]`), falling
  back to the English value on the row.

## Volunteer form (Netlify)

- Form UI: `src/routes/volunteer/+page.svelte`. Server action: `+page.server.ts`.
- The action validates, drops honeypot (`bot-field`) submissions, then POSTs a
  URL-encoded body to `static/netlify-form-detection.html`. That static file is what Netlify
  scans at build time to register the form (named **`contact`**). Field names must stay in
  sync between the live form, the server action, and the detection HTML.

## Known issues / things to watch (not changed during cleanup)

- **Non-functional "Google Calendar / ICS" labels.** On the events and `past-interviews`
  pages these render as plain `<span>`s with no link or handler (see
  `interview-calendar-links` / `calendar-link`). They look interactive but do nothing —
  either wire them up (generate Google Calendar URLs / `.ics` files) or remove them.
- **Large unoptimized image assets** in `static/images/` (e.g. `meet.svg` ~27 MB,
  `law.svg` ~11 MB, several ~7 MB SVGs). These hurt load performance. Compress/convert
  (Squoosh, SVGO) before shipping more. `static/images/shame.svg` (~9.6 MB, unused) was
  removed during cleanup.

## Cleanup performed in this pass

- Merged `ButtonAccent` / `ButtonPrimary` / `ButtonSecondary` into a single
  `Button.svelte` with a `variant` prop; removed the unused `Tag` variable and gave the
  `type`/`href`/`variant` props explicit types. Updated all 5 usage sites.
- Extracted duplicated social-link data and inline SVG markup (previously copy-pasted in
  `Footer.svelte` and the home page) into `socialLinks.ts` + `SocialIcon.svelte`.
- Removed the unused `static/images/shame.svg` asset and the empty leftover `src/content/`
  directory.
- Updated `README.md` and added this document.

No user-facing behavior or rendered markup was intentionally changed.
