<script>
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

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
	}
</style>
