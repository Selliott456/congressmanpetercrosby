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
		padding: 0.8rem 1.75rem;
		font-family: var(--display);
		font-style: italic;
		font-size: 0.8125rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		border: 2px solid transparent;
		border-radius: 0;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 180px;
	}

	.btn-inner {
		position: relative;
		z-index: 1;
	}

	.btn-primary {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
	}

	.btn-primary:hover:not(.disabled) {
		background: var(--ink-2);
		border-color: var(--ink-2);
	}

	/* Ghost / outline */
	.btn-accent {
		background: transparent;
		color: var(--ink);
		border-color: var(--ink);
	}

	.btn-accent:hover:not(.disabled) {
		background: var(--ink);
		color: var(--paper);
	}

	/* Primary CTA — sky fill with the brand shimmer */
	.btn-secondary {
		position: relative;
		overflow: hidden;
		overflow: clip;
		background: var(--sky);
		color: var(--ink);
		border-color: var(--sky);
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
		background: #6aa6cf;
		border-color: #6aa6cf;
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

	.btn.disabled,
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
