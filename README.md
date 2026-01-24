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

## Technologies

- [SvelteKit](https://kit.svelte.dev/) - The fastest way to build Svelte applications
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- TypeScript - Type safety and better developer experience
