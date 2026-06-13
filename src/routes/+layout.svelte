<script>
	import { onMount } from 'svelte';
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
		--color-accent: #bbcedd;
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
			overflow-x: hidden;
		}

		.layout-main > :global(main),
		.layout-main > :global(div) {
			max-width: 100%;
			min-width: 0;
		}

		/* Justified text: body/paragraph text fills the block (even left & right edges) */
		.layout-main :global(p),
		.layout-main :global(.section-body),
		.layout-main :global(.section-body p),
		.layout-main :global(.faq-answer),
		.layout-main :global(.faq-answer p),
		.layout-main :global(.event-description),
		.layout-main :global(.interview-description) {
			text-align: justify;
		}

		/* Short headings / taglines stay centered */
		.layout-main :global(.tagline),
		.layout-main :global(.tagline-section p) {
			text-align: center;
		}

		/* Buttons: keep text centered */
		.layout-main :global(.btn) {
			text-align: center;
		}
	}
</style>
