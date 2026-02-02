<script>
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Peter Crosby for Congress</title>
</svelte:head>

<Nav />
<div class="layout-main">
	<slot />
</div>
<Footer />

<style>
	:global(:root) {
		--color-primary: #002338;
		--color-secondary: #235926;
		--color-accent: #bbcedd;
		--color-white: #ffffff;
		--font-primary: 'Open Sauce One', sans-serif;
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
