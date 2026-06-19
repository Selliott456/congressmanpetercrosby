<script>
	import Rail from '$lib/components/Rail.svelte';
	import Button from '$lib/components/Button.svelte';
	import { messages } from '$lib/i18n/locale';

	const EMAIL = 'information@petercrosbyforcongress.org';
	const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split('@');
	const PHONE = '(435) 535-1048';
	const DONATE_URL = 'https://secure.actblue.com/donate/peter-crosby-1';
	const ENDPOINT = 'https://formspree.io/f/mqeovjzd';

	/** @type {'idle' | 'submitting' | 'success' | 'error'} */
	let status = 'idle';

	/**
	 * Canvassing is pre-selected; the rest start unchecked.
	 * @type {Record<string, boolean>}
	 */
	let helpChecked = {
		help_canvassing: true,
		help_phone_banking: false,
		help_hosting_event: false,
		help_data_entry: false,
		help_wherever_needed: false
	};

	$: helpFields = [
		{ name: 'help_canvassing', label: $messages.volunteer.helpCanvassing },
		{ name: 'help_phone_banking', label: $messages.volunteer.helpPhoneBanking },
		{ name: 'help_hosting_event', label: $messages.volunteer.helpHosting },
		{ name: 'help_data_entry', label: $messages.volunteer.helpDataEntry },
		{ name: 'help_wherever_needed', label: $messages.volunteer.helpWherever }
	];

	/** Friendly prefilled message; stops syncing once the visitor edits it. */
	let message = '';
	let messageTouched = false;
	$: if (!messageTouched) message = $messages.volunteer.messageDefault;

	/** @param {SubmitEvent} event */
	async function handleSubmit(event) {
		event.preventDefault();
		const form = /** @type {HTMLFormElement} */ (event.currentTarget);
		status = 'submitting';
		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				body: new FormData(form),
				headers: { Accept: 'application/json' }
			});
			if (response.ok) {
				status = 'success';
				form.reset();
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}
	}

	function resetForm() {
		status = 'idle';
		messageTouched = false;
	}
</script>

<svelte:head>
	<title>{$messages.volunteer.metaTitle}</title>
	<meta name="description" content={$messages.volunteer.metaDescription} />
</svelte:head>

<main class="contact-page">
	<div class="contact-inner">
		<aside class="contact-aside">
			<h1 class="contact-title">{$messages.volunteer.pageTitle}</h1>
			<Rail height="5px" />
			<p class="contact-lede">{$messages.volunteer.intro}</p>
			<dl class="contact-list">
				<div class="contact-row">
					<dt class="contact-term">{$messages.volunteer.emailLabel}</dt>
					<dd class="contact-def">
						<a href={`mailto:${EMAIL}`} class="contact-link"
							>{EMAIL_USER}@<wbr />{EMAIL_DOMAIN}</a
						>
					</dd>
				</div>
				<div class="contact-row">
					<dt class="contact-term">{$messages.volunteer.phoneLabel}</dt>
					<dd class="contact-def">
						<a href="tel:+14355351048" class="contact-link">{PHONE}</a>
					</dd>
				</div>
			</dl>
			<div class="contact-cta">
				<p class="contact-cta-text">{$messages.volunteer.donatePrompt}</p>
				<Button href={DONATE_URL} variant="secondary">{$messages.volunteer.donate}</Button>
			</div>
		</aside>

		<div class="contact-form-wrap">
			{#if status === 'success'}
				<div class="form-success" role="status" aria-live="polite">
					<p class="form-success-title">{$messages.volunteer.successTitle}</p>
					<p class="form-success-body">{$messages.volunteer.successBody}</p>
					<button type="button" class="form-success-again" on:click={resetForm}>
						{$messages.volunteer.sendAnother}
					</button>
				</div>
			{:else}
				<form class="contact-form" on:submit={handleSubmit}>
					<input type="hidden" name="_subject" value="Volunteer signup (website)" />

					<div class="form-grid">
						<div class="form-row">
							<label class="form-label" for="first-name">{$messages.volunteer.firstName}</label>
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
							<label class="form-label" for="last-name">{$messages.volunteer.lastName}</label>
							<input
								id="last-name"
								name="lastName"
								class="form-input"
								type="text"
								required
								autocomplete="family-name"
							/>
						</div>
					</div>

					<div class="form-grid">
						<div class="form-row">
							<label class="form-label" for="phone">{$messages.volunteer.phone}</label>
							<input
								id="phone"
								name="phone"
								class="form-input"
								type="tel"
								required
								autocomplete="tel"
								inputmode="tel"
								aria-describedby="phone-hint"
							/>
							<p class="form-hint" id="phone-hint">{$messages.volunteer.phoneHint}</p>
						</div>
						<div class="form-row">
							<label class="form-label" for="email">{$messages.volunteer.email}</label>
							<input
								id="email"
								name="email"
								class="form-input"
								type="email"
								required
								autocomplete="email"
							/>
						</div>
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
							autocomplete="postal-code"
							inputmode="text"
							aria-describedby="zip-hint"
						/>
						<p class="form-hint" id="zip-hint">{$messages.volunteer.zipHint}</p>
					</div>

					<fieldset class="form-fieldset">
						<legend class="form-legend">{$messages.volunteer.helpLegend}</legend>
						<ul class="form-help-list">
							{#each helpFields as field (field.name)}
								<li class="form-help-item">
									<label class="form-check-label">
										<input
											type="checkbox"
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
							bind:value={message}
							on:input={() => (messageTouched = true)}
						></textarea>
					</div>

					{#if status === 'error'}
						<p class="form-error" role="alert">{$messages.volunteer.errorMessage}</p>
					{/if}

					<div class="form-foot">
						<p class="form-required">{$messages.volunteer.requiredNote}</p>
						<button type="submit" class="form-submit" disabled={status === 'submitting'}>
							{status === 'submitting' ? $messages.volunteer.sending : $messages.volunteer.send}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</main>

<style>
	.contact-page {
		background: var(--paper);
		min-height: 60vh;
		padding: 3.5rem 1.5rem 4.5rem;
	}

	.contact-inner {
		max-width: 1080px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: 3.5rem;
		align-items: start;
	}

	/* ---- Left aside ---- */
	.contact-aside {
		position: sticky;
		top: 2rem;
	}

	.contact-title {
		font-family: var(--display);
		font-style: italic;
		font-size: clamp(2.25rem, 4vw, 3rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin: 0 0 1rem;
		line-height: 1.02;
	}

	.contact-lede {
		font-family: var(--serif);
		font-size: 1.25rem;
		line-height: 1.55;
		color: var(--ink-2);
		margin: 1.5rem 0 2rem;
	}

	.contact-list {
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-row {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.contact-term {
		font-family: var(--mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-3);
		margin: 0;
	}

	.contact-def {
		margin: 0;
	}

	.contact-link {
		font-family: var(--font-primary);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--blue);
		text-decoration: none;
		overflow-wrap: anywhere;
	}

	.contact-link:hover {
		color: var(--ink);
		text-decoration: underline;
	}

	.contact-cta {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line-l);
	}

	.contact-cta-text {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
		margin: 0 0 0.85rem;
	}

	/* ---- Right form panel ---- */
	.contact-form-wrap {
		background: var(--paper-2);
		border: 1px solid var(--line-l);
		padding: 1.75rem;
		min-width: 0;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	.form-row {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
	}

	.form-label {
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink);
	}

	.form-optional {
		font-weight: 500;
		opacity: 0.7;
	}

	.form-input {
		font-family: var(--font-primary);
		font-size: 1rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.7rem 0.8rem;
		border: 1px solid var(--line-l);
		border-radius: 0;
		background: var(--paper);
		color: var(--ink);
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--blue);
		box-shadow: 0 0 0 2px rgba(46, 95, 160, 0.2);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
	}

	.form-hint {
		font-family: var(--font-primary);
		font-size: 0.8125rem;
		line-height: 1.4;
		color: var(--ink-3);
		margin: 0;
	}

	.form-fieldset {
		border: none;
		padding: 0;
		margin: 0;
		min-width: 0;
		border-top: 1px solid var(--line-l);
		padding-top: 1.25rem;
	}

	.form-legend {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.125rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--ink);
		padding: 0;
		margin: 0 0 0.75rem;
	}

	.form-help-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.65rem 1.25rem;
	}

	.form-help-item {
		margin: 0;
	}

	.form-check-label {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
		font-family: var(--font-primary);
		font-size: 0.9375rem;
		line-height: 1.4;
		color: var(--ink);
		font-weight: 500;
		cursor: pointer;
	}

	.form-check-label input {
		margin-top: 0.2rem;
		width: 1.05rem;
		height: 1.05rem;
		accent-color: var(--blue);
		flex-shrink: 0;
	}

	.form-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 0.25rem;
	}

	.form-required {
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-3);
		margin: 0;
	}

	.form-submit {
		font-family: var(--display);
		font-style: italic;
		font-size: 0.9375rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.85rem 2rem;
		border: 2px solid var(--ink);
		border-radius: 0;
		background: var(--ink);
		color: var(--paper);
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.form-submit:hover {
		background: var(--ink-2);
		border-color: var(--ink-2);
	}

	.form-submit:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	.form-error {
		font-family: var(--font-primary);
		font-size: 0.95rem;
		line-height: 1.4;
		color: #6b1616;
		background: rgba(150, 20, 20, 0.08);
		border: 1px solid rgba(150, 20, 20, 0.25);
		padding: 0.65rem 0.8rem;
		margin: 0;
	}

	.form-success {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		border-left: 3px solid var(--green);
		padding: 0.25rem 0 0.25rem 1.25rem;
	}

	.form-success-title {
		font-family: var(--display);
		font-style: italic;
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		color: var(--ink);
		margin: 0;
	}

	.form-success-body {
		font-family: var(--serif);
		font-size: 1.0625rem;
		line-height: 1.5;
		color: var(--ink-2);
		margin: 0;
	}

	.form-success-again {
		font-family: var(--mono);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--blue);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.form-success-again:hover {
		color: var(--ink);
		text-decoration: underline;
	}

	@media (max-width: 860px) {
		.contact-inner {
			grid-template-columns: 1fr;
			gap: 2.25rem;
		}

		.contact-aside {
			position: static;
		}
	}

	@media (max-width: 560px) {
		.contact-page {
			padding: 2.5rem 1.25rem 3.5rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.form-help-list {
			grid-template-columns: 1fr;
		}

		.contact-form-wrap {
			padding: 1.25rem;
		}
	}
</style>
