<script>
	import Button from '$lib/components/Button.svelte';
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'petercrosbyforcongress@gmail.com';
	const OFFICE_PHONE = '(801) 633-4297';
	const defaultMessage = 'I would like to volunteer for the campaign.';

	export let form;

	/** Local ZIP value so typing is not overwritten by reactive updates; synced from server on validation error. */
	let zipInput = '';

	function emptyHelpChecked() {
		return {
			help_canvassing: false,
			help_phone_banking: false,
			help_text_banking: false,
			help_hosting_event: false,
			help_data_entry: false,
			help_wherever_needed: false
		};
	}

	/** Must use bind:checked so choices survive re-renders and are included in FormData. */
	/** @type {Record<string, boolean>} */
	let helpChecked = emptyHelpChecked();

	$: helpFields = [
		{ name: 'help_canvassing', label: $messages.volunteer.helpCanvassing },
		{ name: 'help_phone_banking', label: $messages.volunteer.helpPhoneBanking },
		{ name: 'help_text_banking', label: $messages.volunteer.helpTextBanking },
		{ name: 'help_hosting_event', label: $messages.volunteer.helpHosting },
		{ name: 'help_data_entry', label: $messages.volunteer.helpDataEntry },
		{ name: 'help_wherever_needed', label: $messages.volunteer.helpWherever }
	];

	$: if (form?.error && form?.values) {
		zipInput = String(form.values.zip ?? '');
		const v = /** @type {Record<string, unknown>} */ (form.values);
		helpChecked = {
			help_canvassing: !!v.help_canvassing,
			help_phone_banking: !!v.help_phone_banking,
			help_text_banking: !!v.help_text_banking,
			help_hosting_event: !!v.help_hosting_event,
			help_data_entry: !!v.help_data_entry,
			help_wherever_needed: !!v.help_wherever_needed
		};
	}
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
					<a href="tel:+18016334297" class="volunteer-link">{OFFICE_PHONE}</a>
				</div>
				<div class="volunteer-donate">
					<Button href="https://secure.actblue.com/donate/peter-crosby-1"
						>{$messages.volunteer.donate}</Button
					>
				</div>
			</div>

			<div class="volunteer-form-wrap">
				<form
					class="volunteer-form"
					name="contact"
					method="POST"
					action="/volunteer"
					data-netlify="true"
				>
					{#if form?.success}
						<p class="form-status form-status--success">Thanks! Your message has been sent.</p>
					{/if}
					{#if form?.error}
						<p class="form-status form-status--error">{form.error}</p>
					{/if}
					<input type="hidden" name="form-name" value="contact" />
					<input type="hidden" name="topic" value="volunteer" />
					<div class="form-honeypot" aria-hidden="true">
						<label class="form-honeypot-label">
							Don’t fill this out if you’re human:
							<input type="text" name="bot-field" tabindex="-1" autocomplete="off" />
						</label>
					</div>
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
						<label class="form-label" for="phone">{$messages.volunteer.phone}</label>
						<input
							id="phone"
							name="phone"
							class="form-input"
							type="tel"
							value={form?.values?.phone ?? ''}
							required
							autocomplete="tel"
							inputmode="tel"
							aria-describedby="phone-hint"
						/>
						<p class="form-hint" id="phone-hint">{$messages.volunteer.phoneHint}</p>
					</div>

					<div class="form-row">
						<label class="form-label" for="zip">
							{$messages.volunteer.zip}
							<span class="form-optional">({$messages.volunteer.zipOptional})</span>
						</label>
						<input
							id="zip"
							name="zip"
							class="form-input"
							type="text"
							bind:value={zipInput}
							autocomplete="postal-code"
							inputmode="text"
							aria-describedby="zip-hint"
						/>
						<p class="form-hint" id="zip-hint">{$messages.volunteer.zipHint}</p>
					</div>

					<fieldset class="form-fieldset form-fieldset--help">
						<legend class="form-legend">{$messages.volunteer.helpLegend}</legend>
						<ul class="form-help-list">
							{#each helpFields as field (field.name)}
								<li class="form-help-item">
									<label class="form-check-label">
										<input
											type="checkbox"
											id={'help-' + field.name}
											name={field.name}
											value="yes"
											bind:checked={helpChecked[field.name]}
										/>
										<span class="form-check-text">{field.label}</span>
									</label>
								</li>
							{/each}
						</ul>
					</fieldset>

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
		max-width: 480px;
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
		position: relative;
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

	.form-honeypot {
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

	.form-honeypot-label {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
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

	.form-fieldset--help {
		gap: 0.75rem;
	}

	.form-optional {
		font-weight: 500;
		opacity: 0.75;
	}

	.form-hint {
		font-family: var(--font-primary);
		font-size: 0.875rem;
		line-height: 1.4;
		color: var(--color-primary);
		margin: 0;
		opacity: 0.78;
	}

	.form-help-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.form-help-item {
		margin: 0;
	}

	.form-help-item .form-check-label {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
	}

	.form-help-item input {
		margin-top: 0.35rem;
		width: 1.1rem;
		height: 1.1rem;
		accent-color: var(--color-secondary);
		flex-shrink: 0;
	}

	.form-check-label {
		font-family: var(--font-primary);
		font-size: 1rem;
		line-height: 1.45;
		color: var(--color-primary);
		font-weight: 500;
		cursor: pointer;
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

		.form-help-list {
			text-align: left;
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
