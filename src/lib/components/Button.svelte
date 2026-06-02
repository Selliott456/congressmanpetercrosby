<script>
	/** Render as an `<a>` when set, otherwise a `<button>`. @type {string | null} */
	export let href = null;
	/** @type {'button' | 'submit' | 'reset'} */
	export let type = 'button';
	export let disabled = false;
	/** Visual style. Only `secondary` is currently used in the app. @type {'primary' | 'secondary' | 'accent'} */
	export let variant = 'secondary';
</script>

{#if href}
	<a {href} class="btn btn-{variant}" class:disabled {...$$restProps}>
		<span class="btn-inner"><slot /></span>
	</a>
{:else}
	<button {type} {disabled} class="btn btn-{variant}" class:disabled {...$$restProps}>
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

	.btn-primary {
		background: var(--color-primary);
		color: var(--color-white);
	}

	.btn-primary:hover:not(.disabled) {
		background: #003a5a;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 35, 56, 0.3);
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

	.btn:active:not(.disabled) {
		transform: translateY(0);
	}

	.btn.disabled,
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
