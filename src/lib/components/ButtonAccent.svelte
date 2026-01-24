<script>
	export let href = null;
	export let type = 'button';
	export let disabled = false;

	let Tag = href ? 'a' : 'button';
</script>

{#if href}
	<a {href} class="btn btn-accent" class:disabled {...$$restProps}>
		<slot />
	</a>
{:else}
	<button {type} {disabled} class="btn btn-accent" class:disabled {...$$restProps}>
		<slot />
	</button>
{/if}

<style>
	.btn {
		padding: 0.75rem 2rem;
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: 500;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		display: inline-block;
		text-align: center;
		width: 180px;
	}

	.btn-accent {
		background: var(--color-accent);
		color: var(--color-primary);
	}

	.btn-accent:hover:not(.disabled) {
		background: #a8c0d0;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(187, 206, 221, 0.4);
	}

	.btn-accent:active:not(.disabled) {
		transform: translateY(0);
	}

	.btn.disabled,
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
