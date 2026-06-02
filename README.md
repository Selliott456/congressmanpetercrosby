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

### Volunteer Form Setup (Netlify Forms)

The volunteer form (at `/volunteer`) uses Netlify Forms (no API key required). The
SvelteKit action in `src/routes/volunteer/+page.server.ts` validates input and proxies
the submission to `static/netlify-form-detection.html`, which Netlify scans at build
time to register a form named **`contact`**.

1. Deploy the site to Netlify.
2. Submit the form once so Netlify detects it.
3. In Netlify dashboard, open: **Forms -> contact**.
4. Add email notifications in: **Forms -> contact -> Settings and usage -> Form notifications**.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run check` - Run type checking
- `npm run check:watch` - Run type checking in watch mode

## Project Structure

```
├── src/
│   ├── routes/              # File-based routes (home, about, faq, events,
│   │   │                    #   past-interviews, contact, volunteer)
│   │   ├── +layout.svelte   # App shell: Nav + Footer + global CSS variables
│   │   └── +page.svelte     # Home page
│   ├── lib/
│   │   ├── components/       # Reusable UI (Button, Nav, Footer, SocialIcon, …)
│   │   ├── data/            # Static data (events, socialLinks)
│   │   └── i18n/            # Locale store + EN/ES dictionaries
│   ├── app.html             # HTML template
│   └── app.d.ts             # SvelteKit type declarations
├── static/                  # Static assets (images, netlify-form-detection.html)
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

## Technologies

- [SvelteKit](https://kit.svelte.dev/) - The fastest way to build Svelte applications
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- TypeScript - Type safety and better developer experience
