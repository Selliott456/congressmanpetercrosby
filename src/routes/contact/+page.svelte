<script>
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'petercrosbyforcongress@gmail.com';
	const PHONE = '(801) 633-4297';
</script>

<svelte:head>
	<title>{$messages.contact.metaTitle}</title>
	<meta name="description" content={$messages.contact.metaDescription} />
</svelte:head>

<main class="contact-simple-page">
	<div class="contact-simple-inner">
		<h1 class="contact-simple-title">{$messages.contact.pageTitle}</h1>
		<p class="contact-simple-intro">{$messages.contact.intro}</p>
		<dl class="contact-simple-list">
			<div class="contact-simple-row">
				<dt class="contact-simple-term">{$messages.contact.emailLabel}</dt>
				<dd class="contact-simple-def">
					<a href={`mailto:${EMAIL}`} class="contact-simple-link">{EMAIL}</a>
				</dd>
			</div>
			<div class="contact-simple-row">
				<dt class="contact-simple-term">{$messages.contact.phoneLabel}</dt>
				<dd class="contact-simple-def">
					<a href="tel:+18016334297" class="contact-simple-link">{PHONE}</a>
				</dd>
			</div>
		</dl>
	</div>
</main>

<style>
	.contact-simple-page {
		position: relative;
		background: var(--color-white);
		min-height: 60vh;
		padding: 3rem 1.5rem 4rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.contact-simple-page::before {
		content: '';
		position: fixed;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background-image: url('/images/brand_strategy_square_cropped_transparent_bg_blue_002338.svg');
		background-size: 200px 200px;
		background-repeat: repeat;
		opacity: 0.1;
		pointer-events: none;
		z-index: 0;
		transform: rotate(45deg);
		transform-origin: center center;
	}

	.contact-simple-inner {
		position: relative;
		z-index: 1;
		width: fit-content;
		max-width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.contact-simple-title {
		font-family: var(--display);
		font-style: italic;
		font-size: clamp(1.875rem, 4vw, 2.75rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin: 0 0 1rem;
		line-height: 1.05;
		max-width: 100%;
	}

	.contact-simple-intro {
		font-family: var(--serif);
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--ink-2);
		margin: 0 0 2rem;
		max-width: 100%;
	}

	.contact-simple-list {
		margin: 0 auto;
		padding: 0;
		text-align: left;
		width: fit-content;
		max-width: 100%;
	}

	.contact-simple-row {
		display: grid;
		grid-template-columns: minmax(min-content, auto) 1fr;
		gap: 0.5rem 1.25rem;
		align-items: baseline;
		margin: 0 0 1.25rem;
	}

	.contact-simple-row:last-child {
		margin-bottom: 0;
	}

	.contact-simple-term {
		font-family: var(--mono);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-2);
		margin: 0;
	}

	.contact-simple-def {
		margin: 0;
		min-width: 0;
	}

	.contact-simple-link {
		font-family: var(--font-primary);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--blue);
		text-decoration: none;
		overflow-wrap: anywhere;
		word-break: break-word;
	}

	.contact-simple-link:hover {
		color: var(--ink);
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.contact-simple-row {
			grid-template-columns: 1fr;
			gap: 0.25rem;
			text-align: center;
			justify-items: center;
		}

		.contact-simple-list {
			text-align: center;
		}
	}
</style>
