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

### Contact Form Setup (Netlify Forms)

The contact form uses Netlify Forms (no API key required).

1. Deploy the site to Netlify.
2. Submit the contact form once so Netlify detects the form.
3. In Netlify dashboard, open:
   - Forms -> contact
4. Add email notifications in:
   - Forms -> contact -> Settings and usage -> Form notifications

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
