<script>
	import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'petercrosbyforcongress@gmail.com';
	const PHONE = '(801) 633-4297';
	const defaultMessage = 'I would like to volunteer for the campaign.';

	export let form;
</script>

<svelte:head>
	<title>{$messages.volunteer.metaTitle}</title>
	<meta name="description" content={$messages.volunteer.metaDescription} />
</svelte:head>

<main class="volunteer-page">
	<div class="volunteer-content">
		<div class="volunteer-main">
			<div class="volunteer-copy">
				<h1 class="volunteer-title">{$messages.volunteer.pageTitle}</h1>
				<p class="volunteer-intro">{$messages.volunteer.intro}</p>
				<div class="volunteer-info">
					<a href={`mailto:${EMAIL}`} class="volunteer-link">{EMAIL}</a>
					<a href="tel:+18016334297" class="volunteer-link">{PHONE}</a>
				</div>
				<div class="volunteer-donate">
					<ButtonSecondary href="https://secure.actblue.com/donate/peter-crosby-1"
						>{$messages.volunteer.donate}</ButtonSecondary
					>
				</div>
			</div>

			<div class="volunteer-form-wrap">
				<form class="volunteer-form" method="POST">
					{#if form?.success}
						<p class="form-status form-status--success">Thanks! Your message has been sent.</p>
					{/if}
					{#if form?.error}
						<p class="form-status form-status--error">{form.error}</p>
					{/if}
					<input type="hidden" name="topic" value="volunteer" />
					<fieldset class="form-fieldset">
						<legend class="form-legend">{$messages.volunteer.formLegendName}</legend>
						<div class="form-row">
							<label class="form-label" for="first-name">{$messages.volunteer.firstName}</label>
							<input
								id="first-name"
								name="firstName"
								class="form-input"
								type="text"
								value={form?.values?.firstName ?? ''}
								required
								autocomplete="given-name"
							/>
						</div>
						<div class="form-row">
							<label class="form-label" for="last-name">{$messages.volunteer.lastName}</label>
							<input
								id="last-name"
								name="lastName"
								class="form-input"
								type="text"
								value={form?.values?.lastName ?? ''}
								required
								autocomplete="family-name"
							/>
						</div>
					</fieldset>

					<div class="form-row">
						<label class="form-label" for="email">{$messages.volunteer.email}</label>
						<input
							id="email"
							name="email"
							class="form-input"
							type="email"
							value={form?.values?.email ?? ''}
							required
							autocomplete="email"
						/>
					</div>

					<div class="form-row">
						<label class="form-label" for="message">{$messages.volunteer.message}</label>
						<textarea
							id="message"
							name="message"
							class="form-input form-textarea"
							rows="5"
							required
						>{form?.values?.message ?? defaultMessage}</textarea>
					</div>

					<button type="submit" class="form-submit">{$messages.volunteer.send}</button>
				</form>
			</div>
		</div>
	</div>
</main>

<style>
	.volunteer-page {
		position: relative;
		background: var(--color-white);
		min-height: 60vh;
		padding: 3rem 1.5rem 4rem;
		overflow: hidden;
	}

	.volunteer-page::before {
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

	.volunteer-content {
		position: relative;
		z-index: 1;
		max-width: 1000px;
		margin: 0 auto;
	}

	.volunteer-main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 2.5rem;
	}

	.volunteer-copy {
		flex: 1;
		min-width: 0;
	}

	.volunteer-form-wrap {
		flex: 0 0 auto;
		width: 100%;
		max-width: 420px;
		min-width: 0;
		box-sizing: border-box;
		background: var(--color-accent);
		border-radius: 12px;
		padding: 1.75rem;
		box-shadow: 0 2px 12px rgba(0, 35, 56, 0.08);
	}

	.volunteer-title {
		font-family: var(--font-primary);
		font-size: 2.75rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 1rem 0;
		line-height: 1.2;
	}

	.volunteer-intro {
		font-family: var(--font-primary);
		font-size: 1.375rem;
		line-height: 1.7;
		color: var(--color-primary);
		margin: 0 0 1.5rem 0;
	}

	.volunteer-info {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		margin-bottom: 0;
	}

	.volunteer-donate {
		margin-top: 1.5rem;
	}

	.volunteer-link {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
		overflow-wrap: anywhere;
		word-break: break-word;
	}

	.volunteer-link:hover {
		color: #1d4a1f;
		text-decoration: underline;
	}

	.volunteer-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: 100%;
		min-width: 0;
	}

	.form-status {
		margin: 0;
		padding: 0.6rem 0.75rem;
		border-radius: 6px;
		font-family: var(--font-primary);
		font-size: 0.95rem;
	}

	.form-status--success {
		background: rgba(35, 89, 38, 0.12);
		color: #1d4a1f;
		border: 1px solid rgba(35, 89, 38, 0.3);
	}

	.form-status--error {
		background: rgba(150, 20, 20, 0.1);
		color: #6b1616;
		border: 1px solid rgba(150, 20, 20, 0.25);
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
		min-width: 0;
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
		width: 100%;
		box-sizing: border-box;
		padding: 0.75rem 0.875rem;
		border: 1px solid rgba(0, 35, 56, 0.25);
		border-radius: 6px;
		background: var(--color-white);
		color: var(--color-primary);
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
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
		transition:
			background 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
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
		.volunteer-content {
			padding-left: 0;
			padding-right: 0;
		}

		.volunteer-copy {
			text-align: center;
		}

		.volunteer-info {
			justify-content: center;
		}

		.volunteer-donate {
			text-align: center;
		}

		.volunteer-main {
			flex-direction: column;
			align-items: center;
			gap: 2rem;
		}

		.volunteer-form-wrap {
			width: min(100%, 520px) !important;
			flex: 0 1 auto;
			max-width: 520px;
			margin-left: auto;
			margin-right: auto;
		}

		.form-submit {
			align-self: center;
		}
	}

	@media (max-width: 640px) {
		.volunteer-page {
			padding: 2rem 0 3rem;
			overflow-x: hidden;
		}

		.volunteer-title {
			font-size: 1.875rem;
		}

		.volunteer-intro {
			font-size: 1.25rem;
		}

		.volunteer-info {
			flex-direction: column;
			gap: 0.5rem;
		}

		.volunteer-form-wrap {
			padding: 1.25rem;
		}
	}
</style>
