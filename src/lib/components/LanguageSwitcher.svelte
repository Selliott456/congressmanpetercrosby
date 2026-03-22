<script>
	import { locale, setLocale, messages } from '$lib/i18n/locale';

	/** Stripe height for 13-row US flag in viewBox height 32 */
	const h = 32 / 13;
	const cantonH = 7 * h;
</script>

<div class="lang-switch" role="group" aria-label={$messages.language.switch}>
	<button
		type="button"
		class="lang-btn"
		class:active={$locale === 'en'}
		aria-pressed={$locale === 'en'}
		aria-label={$messages.language.english}
		title={$messages.language.english}
		on:click={() => setLocale('en')}
	>
		<!-- US flag (simplified stripes + canton) -->
		<svg class="flag flag--us" viewBox="0 0 60 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<rect width="60" height="32" fill="#B22234" rx="2" />
			<!-- White stripes (6 bands) -->
			<rect x="0" y={h} width="60" height={h} fill="#fff" />
			<rect x="0" y={3 * h} width="60" height={h} fill="#fff" />
			<rect x="0" y={5 * h} width="60" height={h} fill="#fff" />
			<rect x="0" y={7 * h} width="60" height={h} fill="#fff" />
			<rect x="0" y={9 * h} width="60" height={h} fill="#fff" />
			<rect x="0" y={11 * h} width="60" height={h} fill="#fff" />
			<!-- Canton -->
			<rect width="24" height={cantonH} fill="#3C3B6E" />
			<!-- Tiny star grid (decorative) -->
			<g fill="#fff">
				{#each Array(3) as _, row}
					{#each Array(5) as _, col}
						<circle
							cx={4 + col * 4}
							cy={2.2 + row * 4.2}
							r="0.85"
						/>
					{/each}
				{/each}
			</g>
		</svg>
		<span class="lang-abbr">ENG</span>
	</button>
	<button
		type="button"
		class="lang-btn"
		class:active={$locale === 'es'}
		aria-pressed={$locale === 'es'}
		aria-label={$messages.language.spanish}
		title={$messages.language.spanish}
		on:click={() => setLocale('es')}
	>
		<!-- Spain civil flag — red / yellow / red (Español) -->
		<svg class="flag flag--es" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<rect width="60" height="40" fill="#AA151B" rx="2" />
			<rect x="0" y="10" width="60" height="20" fill="#F1BF00" />
		</svg>
		<span class="lang-abbr">ESP</span>
	</button>
</div>

<style>
	.lang-switch {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		flex-shrink: 0;
	}

	.lang-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.25rem 0.35rem 0.25rem 0.2rem;
		background: transparent;
		border: 2px solid transparent;
		border-radius: 6px;
		cursor: pointer;
		transition: border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
		opacity: 0.55;
	}

	.lang-btn:hover {
		opacity: 0.95;
		background: rgba(255, 255, 255, 0.1);
	}

	.lang-btn.active {
		opacity: 1;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 1px rgba(187, 206, 221, 0.5);
		background: rgba(255, 255, 255, 0.08);
	}

	.flag {
		display: block;
		height: 18px;
		width: auto;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
	}

	.flag--us {
		aspect-ratio: 60 / 32;
	}

	.flag--es {
		aspect-ratio: 60 / 40;
	}

	.lang-abbr {
		font-family: var(--font-primary);
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.65);
		white-space: nowrap;
		transition: color 0.2s ease;
	}

	.lang-btn:hover .lang-abbr {
		color: rgba(255, 255, 255, 0.95);
	}

	.lang-btn.active .lang-abbr {
		color: var(--color-accent);
	}
</style>
