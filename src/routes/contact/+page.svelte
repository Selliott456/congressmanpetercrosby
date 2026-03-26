<script>
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'petercrosbyforcongress@gmail.com';
	const PHONE = '(801) 633-4297';

	$: isVolunteerTopic = $page.url.searchParams.get('topic') === 'volunteer';
	$: defaultMessage = isVolunteerTopic ? 'I would like to volunteer for the campaign.' : '';
	$: formAction = dev ? '/api/test-contact' : '/netlify-form-detection.html';
</script>

<svelte:head>
	<title>{$messages.contact.metaTitle}</title>
	<meta name="description" content={$messages.contact.metaDescription} />
</svelte:head>

<main class="contact-page">
	<div class="contact-content">
		<div class="contact-main">
			<div class="contact-copy">
				<h1 class="contact-title">{$messages.contact.pageTitle}</h1>
				<p class="contact-intro">
					{$messages.contact.intro}
				</p>
				<div class="contact-info">
					<a href="mailto:{EMAIL}" class="contact-link">{EMAIL}</a>
					<a href="tel:+18016334297" class="contact-link">{PHONE}</a>
				</div>
				<div class="contact-donate">
					<ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1">{$messages.contact.donate}</ButtonSecondary>
				</div>
			</div>

			<div class="contact-form-wrap">
				<form
					class="contact-form"
					name="contact"
					method="POST"
					action={formAction}
					data-netlify="true"
					data-sveltekit-reload
				>
			<input type="hidden" name="form-name" value="contact" />
			<input type="hidden" name="redirect" value="/contact-success" />
			<input type="hidden" name="topic" value={isVolunteerTopic ? 'volunteer' : ''} />
			<fieldset class="form-fieldset">
				<legend class="form-legend">{$messages.contact.formLegendName}</legend>
				<div class="form-row">
					<label class="form-label" for="first-name">{$messages.contact.firstName}</label>
					<input
						id="first-name"
						name="firstName"
						class="form-input"
						type="text"
						required
						autocomplete="given-name"
					/>
				</div>
				<div class="form-row">
					<label class="form-label" for="last-name">{$messages.contact.lastName}</label>
					<input
						id="last-name"
						name="lastName"
						class="form-input"
						type="text"
						required
						autocomplete="family-name"
					/>
				</div>
			</fieldset>

			<div class="form-row">
				<label class="form-label" for="email">{$messages.contact.email}</label>
				<input
					id="email"
					name="email"
					class="form-input"
					type="email"
					required
					autocomplete="email"
				/>
			</div>

			<div class="form-row">
				<label class="form-label" for="message">{$messages.contact.message}</label>
				<textarea
					id="message"
					name="message"
					class="form-input form-textarea"
					rows="5"
					required
				>{defaultMessage}</textarea>
			</div>

			<button type="submit" class="form-submit">{$messages.contact.send}</button>
				</form>
			</div>
		</div>
	</div>
</main>

<style>
	.contact-page {
		position: relative;
		background: var(--color-white);
		min-height: 60vh;
		padding: 3rem 1.5rem 4rem;
		overflow: hidden;
	}

	.contact-page::before {
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

	.contact-content {
		position: relative;
		z-index: 1;
		max-width: 1000px;
		margin: 0 auto;
	}

	.contact-main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 2.5rem;
	}

	.contact-copy {
		flex: 1;
		min-width: 0;
	}

	.contact-form-wrap {
		flex: 0 0 auto;
		width: 100%;
		max-width: 420px;
		background: var(--color-accent);
		border-radius: 12px;
		padding: 1.75rem;
		box-shadow: 0 2px 12px rgba(0, 35, 56, 0.08);
	}

	.contact-title {
		font-family: var(--font-primary);
		font-size: 2.75rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 1rem 0;
		line-height: 1.2;
	}

	.contact-intro {
		font-family: var(--font-primary);
		font-size: 1.375rem;
		line-height: 1.7;
		color: var(--color-primary);
		margin: 0 0 1.5rem 0;
	}

	.contact-info {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		margin-bottom: 0;
	}

	.contact-donate {
		margin-top: 1.5rem;
	}

	.contact-link {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.contact-link:hover {
		color: #1d4a1f;
		text-decoration: underline;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-fieldset {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-legend {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-primary);
		margin: 0 0 0.25rem 0;
		padding: 0;
	}

	.form-row {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.form-label {
		font-family: var(--font-primary);
		font-size: 1.0625rem;
		font-weight: 600;
		color: var(--color-primary);
	}

	.form-input {
		font-family: var(--font-primary);
		font-size: 1.125rem;
		padding: 0.6rem 0.75rem;
		border: 1px solid rgba(0, 35, 56, 0.25);
		border-radius: 6px;
		background: var(--color-white);
		color: var(--color-primary);
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--color-secondary);
		box-shadow: 0 0 0 2px rgba(35, 89, 38, 0.2);
	}

	.form-input::placeholder {
		color: rgba(0, 35, 56, 0.45);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
	}

	.form-submit {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 600;
		padding: 0.75rem 2rem;
		border: none;
		border-radius: 8px;
		background: var(--color-secondary);
		color: var(--color-white);
		cursor: pointer;
		transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
		align-self: flex-start;
		margin-top: 0.25rem;
	}

	.form-submit:hover {
		background: #1d4a1f;
		box-shadow: 0 4px 12px rgba(35, 89, 38, 0.3);
		transform: translateY(-1px);
	}

	.form-submit:active {
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.contact-content {
			padding-left: 0;
			padding-right: 0;
		}

		.contact-copy {
			text-align: center;
		}

		.contact-info {
			justify-content: center;
		}

		.contact-donate {
			text-align: center;
		}

		.contact-main {
			flex-direction: column;
			gap: 2rem;
		}

		.contact-form-wrap {
			max-width: none;
		}
	}

	@media (max-width: 640px) {
		.contact-page {
			padding: 2rem 0 3rem;
		}

		.contact-title {
			font-size: 1.875rem;
		}

		.contact-intro {
			font-size: 1.25rem;
		}

		.contact-info {
			flex-direction: column;
			gap: 0.5rem;
		}

		.contact-form-wrap {
			padding: 1.25rem;
		}
	}
</style>
