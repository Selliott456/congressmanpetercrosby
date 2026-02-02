<script>
	/** @type {string | null} */
	export let href = null;
	export let type = 'button';
	export let disabled = false;

	let Tag = href ? 'a' : 'button';
</script>

{#if href}
	<a {href} class="btn btn-secondary" class:disabled {...$$restProps}>
		<span class="btn-inner"><slot /></span>
	</a>
{:else}
	<button {type} {disabled} class="btn btn-secondary" class:disabled {...$$restProps}>
		<span class="btn-inner"><slot /></span>
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

	.btn-inner {
		position: relative;
		z-index: 1;
	}

	.btn-secondary {
		position: relative;
		overflow: hidden;
		overflow: clip;
		background: var(--color-secondary);
		color: var(--color-white);
	}

	.btn-secondary::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 60%;
		height: 100%;
		background: linear-gradient(
			105deg,
			transparent 0%,
			transparent 40%,
			rgba(255, 255, 255, 0.25) 50%,
			transparent 60%,
			transparent 100%
		);
		animation: btn-secondary-shimmer 2.5s ease-in-out infinite;
		pointer-events: none;
		z-index: 0;
	}

	.btn-secondary:hover:not(.disabled) {
		background: #1d4a1f;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(35, 89, 38, 0.3);
	}

	.btn-secondary:hover:not(.disabled)::after {
		animation-duration: 1.5s;
	}

	@keyframes btn-secondary-shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(167%);
		}
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
