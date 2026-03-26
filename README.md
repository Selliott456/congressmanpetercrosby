# Congressman Peter Crosby

A modern SvelteKit frontend application.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

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

### Contact Form Email Setup

The contact form now sends directly from the server (it does not open a mail app).

1. Create `.env` in the project root.

2. Set values in `.env`:
- `RESEND_API_KEY` (required)
- `CONTACT_TO_EMAIL` (optional, defaults to `petercrosbyforcongress@gmail.com`)
- `CONTACT_FROM_EMAIL` (optional, defaults to `Campaign Website <onboarding@resend.dev>`)

3. Restart the dev server after changing env vars.

### Netlify Environment Variables

In Netlify, set the same keys in:

- Site settings -> Build & deploy -> Environment -> Environment variables

Required:
- `RESEND_API_KEY`

Optional:
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run check` - Run type checking
- `npm run check:watch` - Run type checking in watch mode

## Project Structure

```
├── src/
│   ├── routes/          # Application routes
│   │   ├── +page.svelte # Main page
│   │   └── +layout.svelte # Layout wrapper
│   ├── app.html         # HTML template
│   └── app.d.ts         # TypeScript definitions
├── static/              # Static assets
├── package.json         # Dependencies and scripts
├── svelte.config.js     # SvelteKit configuration
└── vite.config.js       # Vite configuration
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
