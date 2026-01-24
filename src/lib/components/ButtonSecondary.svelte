<script>
	export let href = null;
	export let type = 'button';
	export let disabled = false;

	let Tag = href ? 'a' : 'button';
</script>

{#if href}
	<a {href} class="btn btn-secondary" class:disabled {...$$restProps}>
		<slot />
	</a>
{:else}
	<button {type} {disabled} class="btn btn-secondary" class:disabled {...$$restProps}>
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

	.btn-secondary {
		background: var(--color-secondary);
		color: var(--color-white);
	}

	.btn-secondary:hover:not(.disabled) {
		background: #1d4a1f;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(35, 89, 38, 0.3);
	}

	.btn-secondary:active:not(.disabled) {
		transform: translateY(0);
	}

	.btn.disabled,
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
