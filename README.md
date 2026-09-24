# Congressman Peter Crosby

A modern SvelteKit frontend application.

## Getting Started

### Prerequisites

- Node.js **v18 or higher** (the toolchain — Vite 5 + SvelteKit 2 — does not run on older Node). Node 20 LTS is recommended.
- npm

> See [`HANDOFF.md`](./HANDOFF.md) for architecture notes, conventions, and known issues before making changes.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Forms (Formspree)

Every form submits client-side to [Formspree](https://formspree.io) — a `fetch` POST of
`FormData` with `Accept: application/json`, then in-page sending/success/error states. There
is no SvelteKit server action, no API key, and no build-time form detection, so forms work
the same locally and on Netlify. (Netlify Forms was used until Sep 2026; the old
`+page.server.ts` and `static/netlify-form-detection.html` were removed.)

Each form posts to its own endpoint, hardcoded in the component, and sets a hidden
`_subject` so submissions are sortable in one inbox:

| Form | Lives in | Endpoint |
| --- | --- | --- |
| Contact — general | `src/routes/contact/+page.svelte` | `f/meewbdjn` |
| Contact — media request | same file (topic toggle) | `f/mzdqlwpy` |
| Volunteer | `src/routes/volunteer/+page.svelte` | `f/mqeovjzd` |
| Event RSVP | `src/lib/components/RsvpModal.svelte` | `f/mvznevgz` |
| Yard sign request | `src/lib/components/YardSignModal.svelte` | `f/xnjeooql` |
| Newsletter signup | `src/lib/components/Footer.svelte` | `f/xjgqknqd` |

Notes:

- The **contact** topic toggle picks the endpoint. The media topic adds a required
  **Media Outlet / Publication** field; the general topic adds a required **ZIP Code** and
  puts it in the subject line (`General inquiry (website) — ZIP 84321`) so the campaign can
  separate CD2 constituents at a glance.
- The **yard sign** modal has no page of its own: `/yard-sign` is a shareable short link that
  redirects to `/?yardsign`, which opens the modal from `+layout.svelte`.
- **Spam handling:** every form carries a `_gotcha` honeypot (Formspree silently drops
  submissions that fill it), `maxlength` caps on each field, a double-submit guard, and
  native validation. The stronger layer — reCAPTCHA or Akismet — is a per-form toggle the
  campaign must enable in the Formspree dashboard.

To change where a form's email goes, open that form in the Formspree dashboard and edit its
notification settings; nothing in this repo needs to change.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run check` - Run type checking
- `npm run check:watch` - Run type checking in watch mode

## Project Structure

```
├── src/
│   ├── routes/              # File-based routes (home, about, policies, events, media,
│   │   │                    #   press, data-room, endorsements, contact, volunteer)
│   │   ├── +layout.svelte   # App shell: Nav + Footer + global CSS variables
│   │   └── +page.svelte     # Home page
│   ├── lib/
│   │   ├── components/       # Reusable UI (Button, Nav, Footer, SocialIcon, modals, …)
│   │   ├── data/            # Static data (events, media, endorsements, press releases,
│   │   │                    #   policies, analytics, socialLinks)
│   │   └── i18n/            # Locale store + EN/ES dictionaries
│   ├── app.html             # HTML template
│   └── app.d.ts             # SvelteKit type declarations
├── static/                  # Static assets (images, robots.txt, press releases)
├── package.json
├── svelte.config.js
└── vite.config.js
```

## Performance (images)

- **Preload** is used for the nav logo, homepage hero photo (`trees.jpg`), and hero logo so the browser starts them early.
- **Lazy loading** (`loading="lazy"`) defers below-the-fold images (priorities, meet graphic, footer logo, family photo).
- **`decoding="async"`** on non-critical images avoids blocking the main thread.
- **Netlify** sends cache headers for `/images/*` (see `netlify.toml`).
- **File size:** Large PNG/JPG files (e.g. `family_peter.png`, `trees.jpg`) have the biggest impact. Compress with [Squoosh](https://squoosh.app/) or similar, or export WebP/AVIF and use `<picture>` if you add multiple formats later.

## Exploratory analysis (not published)

Side work that informs thinking but **must not reach the site**. The Data Room's sourcing
rule (top of `src/lib/data/analytics.ts`) admits only real, attributable figures, so nothing
modeled belongs in `/data-room` or a press release.

- **[The R+10 Prior, Updated](https://claude.ai/artifact/YEV1pSgZz1T18crs4cCTdV)** (Sep 2026) —
  an interactive Beta-Binomial update of the pre-campaign "UT-02 is R+10" prior against the
  campaign's two September internal polls. Sliders for prior lean, prior confidence and an
  assumed house effect; outputs the posterior margin, a 95% credible interval, and
  P(Crosby ahead). Only the decided-voter counts in it are measured; everything else is
  inferred. The artifact is private — ask the owner for access.

  **To revisit with new numbers:** add a row to the `POLLS` array at the top of the artifact's
  script (`{ label, n, crosby, moore }`, using decided-voter counts — shares × n). An
  **independent, non-partisan** poll is worth far more than another internal one, because it
  enters without the house-effect adjustment that currently drives most of the result.

## Technologies

- [SvelteKit](https://kit.svelte.dev/) - The fastest way to build Svelte applications
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- TypeScript - Type safety and better developer experience
