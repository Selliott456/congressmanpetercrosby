<script>
	import { locale, setLocale, messages } from '$lib/i18n/locale';
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
		<span class="sr-only">{$messages.language.english}</span>
		<!-- US flag -->
		<svg class="flag" viewBox="0 0 60 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<rect width="60" height="32" fill="#B22234" rx="2" />
			<path fill="#fff" d="M0 4h60v4H0zm0 8h60v4H0zm0 8h60v4H0zm0 8h60v4H0z" />
			<rect width="24" height="18" fill="#3C3B6E" rx="1" />
			<g fill="#fff">
				<circle cx="4" cy="3.5" r="0.9" />
				<circle cx="8" cy="3.5" r="0.9" />
				<circle cx="12" cy="3.5" r="0.9" />
				<circle cx="16" cy="3.5" r="0.9" />
				<circle cx="20" cy="3.5" r="0.9" />
				<circle cx="6" cy="6.5" r="0.9" />
				<circle cx="10" cy="6.5" r="0.9" />
				<circle cx="14" cy="6.5" r="0.9" />
				<circle cx="18" cy="6.5" r="0.9" />
				<circle cx="4" cy="9.5" r="0.9" />
				<circle cx="8" cy="9.5" r="0.9" />
				<circle cx="12" cy="9.5" r="0.9" />
				<circle cx="16" cy="9.5" r="0.9" />
				<circle cx="20" cy="9.5" r="0.9" />
				<circle cx="6" cy="12.5" r="0.9" />
				<circle cx="10" cy="12.5" r="0.9" />
				<circle cx="14" cy="12.5" r="0.9" />
				<circle cx="18" cy="12.5" r="0.9" />
				<circle cx="4" cy="15.5" r="0.9" />
				<circle cx="8" cy="15.5" r="0.9" />
				<circle cx="12" cy="15.5" r="0.9" />
				<circle cx="16" cy="15.5" r="0.9" />
				<circle cx="20" cy="15.5" r="0.9" />
			</g>
		</svg>
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
		<span class="sr-only">{$messages.language.spanish}</span>
		<!-- Spain (civil) — red / yellow / red for Español -->
		<svg class="flag" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<rect width="60" height="40" fill="#AA151B" rx="2" />
			<rect x="0" y="10" width="60" height="20" fill="#F1BF00" />
		</svg>
	</button>
</div>

<style>
	.lang-switch {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		flex-shrink: 0;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.lang-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
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
		width: 28px;
		height: auto;
		aspect-ratio: 60 / 32;
		vertical-align: middle;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
	}

	.lang-btn:last-child .flag {
		aspect-ratio: 60 / 40;
		width: 26px;
	}

	/* Normalize second flag visual height to match first */
	.lang-btn:last-child .flag {
		width: 28px;
		height: 18.67px;
	}
</style>
