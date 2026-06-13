<script>
	/**
	 * The ridge-line stripe — green / sky / civic, always in that order.
	 * The campaign's fingerprint: tops the nav, divides the footer, and
	 * underlines section heroes.
	 */
	/** Stripe thickness. @type {string} */
	export let height = '8px';
</script>

<div class="rail" style="--rail-h: {height}" aria-hidden="true">
	<i class="g"></i>
	<i class="s"></i>
	<i class="b"></i>
</div>

<style>
	.rail {
		display: flex;
		width: 100%;
		height: var(--rail-h);
		flex: 0 0 var(--rail-h);
	}

	.rail i {
		flex: 1;
	}

	.rail i.g {
		background: var(--green);
	}

	.rail i.s {
		background: var(--sky);
	}

	.rail i.b {
		background: var(--blue);
	}
</style>
