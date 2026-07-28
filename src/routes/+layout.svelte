<script>
	import { onMount } from 'svelte';
	import AnnouncementBar from '../lib/components/AnnouncementBar.svelte';
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import { initLocaleFromStorage } from '$lib/i18n/locale';

	onMount(() => {
		initLocaleFromStorage();
	});
</script>

<svelte:head>
	<title>Peter Crosby for Congress</title>
	<link rel="icon" href="/images/brand_strategy_logo_white.svg" type="image/svg+xml" />
	<!-- Nav logo: discover early on every route -->
	<link
		rel="preload"
		href="/images/brand_strategy_logo_white.svg"
		as="image"
		type="image/svg+xml"
	/>
</svelte:head>

<AnnouncementBar />
<Nav />
<div class="layout-main">
	<slot />
</div>
<Footer />

<style>
	:global(:root) {
		/* ── Brand palette (style guide) ───────────────────────── */
		--ink-deep: #091b36;
		--ink: #0f2545;
		--ink-2: #1a3358;
		--ink-3: #274680;
		--paper: #f7fafc;
		--paper-2: #eaf1f8;
		--paper-3: #d6e2ee;
		--green: #235926;
		--sky: #7fb7dc;
		--blue: #2e5fa0;
		--line-l: rgba(15, 37, 69, 0.16);
		--line-l-2: rgba(15, 37, 69, 0.08);
		--line-d: rgba(255, 255, 255, 0.14);

		/* ── Type ──────────────────────────────────────────────── */
		--display: 'Archivo', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		--sans: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		--serif: 'Source Serif 4', Georgia, 'Times New Roman', serif;
		--mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;

		/* ── Legacy aliases (migrated per component/page) ──────── */
		--color-primary: var(--ink);
		--color-secondary: var(--green);
		--color-white: var(--paper);
		--font-primary: var(--sans);

		--mobile-margin: 1.25rem;
	}

	:global(body) {
		margin: 0;
		font-family: var(--font-primary);
		background: var(--color-white);
		min-height: 100vh;
		color: var(--color-primary);
		display: flex;
		flex-direction: column;
	}

	.layout-main {
		flex: 1;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	@media (max-width: 768px) {
		.layout-main {
			padding-left: var(--mobile-margin);
			padding-right: var(--mobile-margin);
			display: flex;
			flex-direction: column;
			align-items: stretch;
			/* `clip` (not `hidden`) so it still prevents horizontal scroll without
			   becoming a scroll container — which would break `position: sticky`
			   descendants (e.g. the Policies "On this page" bar) on mobile. */
			overflow-x: clip;
		}

		.layout-main > :global(main),
		.layout-main > :global(div) {
			max-width: 100%;
			min-width: 0;
		}

		/* Short headings / taglines / labels stay centered */
		.layout-main :global(.tagline),
		.layout-main :global(.tagline-section p),
		.layout-main :global(.endorsement-name),
		.layout-main :global(.endorsement-role) {
			text-align: center;
		}

		/* Buttons: keep text centered */
		.layout-main :global(.btn) {
			text-align: center;
		}
	}
</style>
